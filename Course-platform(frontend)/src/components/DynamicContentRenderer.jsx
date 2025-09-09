import React from 'react';
import componentLibrary from './course-components';
import { parseContentString, resolveComponentType } from './componentMapping';
import { componentTypes } from './course-components';

const DynamicContentRenderer = ({ content, lessonId = null }) => {
  // Parse the content string into an array of components
  const parsedContent = parseContentString(content);
  
  // Helper function to get props for interactive components
  const getInteractiveProps = (componentType, item) => {
    const interactiveComponents = [
      componentTypes.EXERCISE_BOX,
      componentTypes.QUESTION_CARD_BOX,
      componentTypes.CHECKBOX_LIST,
      componentTypes.MARK_COMPLETE_BOX,
      componentTypes.ORDERED_LIST_BOX,
      componentTypes.UNORDERED_LIST_BOX,
      componentTypes.NUMBERED_STEPS_BOX
    ];
    
    if (interactiveComponents.includes(componentType)) {
      return {
        lessonId,
        componentId: item.id || `component_${Date.now()}_${Math.random()}`,
        isEditMode: false
      };
    }
    
    return {};
  };
  
  if (!parsedContent || !Array.isArray(parsedContent)) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No content available for this lesson.</p>
      </div>
    );
  }

  if (parsedContent.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>This lesson content is empty.</p>
      </div>
    );
  }

  // Process components with special handling for LeftBorderBox
  const processedComponents = [];
  let i = 0;
  
  while (i < parsedContent.length) {
    const item = parsedContent[i];
    const componentType = resolveComponentType(item, componentLibrary);
    const componentConfig = componentLibrary[componentType];
    
    if (!componentConfig) {
      console.warn(`Unknown component type: ${componentType}`, item);
      processedComponents.push(
        <div key={i} className="p-4 border border-red-300 bg-red-50 rounded-lg">
          <p className="text-red-600 text-sm">
            Unknown component type: <code>{componentType}</code>
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Item ID: <code>{item.id || 'N/A'}</code>
          </p>
          <pre className="mt-2 text-xs text-gray-600 overflow-x-auto">
            {JSON.stringify(item, null, 2)}
          </pre>
        </div>
      );
      i++;
      continue;
    }

    const Component = componentConfig.component;
    
    try {
      // Ensure we have valid data
      const componentData = item.data || item.content || item;
      
      // Special handling for half-width components - moved before debug logging
      const isHalfWidthComponent = componentType === componentTypes.LEFT_BORDER_BOX || 
                                 componentType === componentTypes.INFO_CARD_PAIR || 
                                 componentType === componentTypes.QUESTION_CARD_BOX || 
                                 componentType === componentTypes.NUMBERED_STEPS_BOX || 
                                 componentType === componentTypes.CHECKBOX_LIST || 
                                 componentType === componentTypes.DESCRIPTION_WITH_IMAGE_BOX ||
                                 componentType === componentTypes.QUOTE ||
                                 componentType === 'quote' || // Direct type check
                                 componentType === 'checkbox_list' || // Direct type check
                                 (item.type && item.type === 'checkbox_list') || // Item type check
                                 (item.type && item.type === 'quote') || // Item type check for quote
                                 (item.id && typeof item.id === 'string' && item.id.includes('checkbox')); // ID-based check
      
      // Debug logging
      console.log('Processing component:', {
        componentType,
        itemId: item.id,
        itemType: item.type,
        data: componentData,
        isHalfWidthComponent: isHalfWidthComponent
      });
      
      if (isHalfWidthComponent) {
        // Look for next component to pair with
        const nextItem = parsedContent[i + 1];
        const nextComponentType = nextItem ? resolveComponentType(nextItem, componentLibrary) : null;
        const NextComponent = nextComponentType && componentLibrary[nextComponentType] ? componentLibrary[nextComponentType].component : null;
        
        const isNextHalfWidth = nextComponentType === componentTypes.LEFT_BORDER_BOX || 
                               nextComponentType === componentTypes.INFO_CARD_PAIR || 
                               nextComponentType === componentTypes.QUESTION_CARD_BOX || 
                               nextComponentType === componentTypes.NUMBERED_STEPS_BOX || 
                               nextComponentType === componentTypes.CHECKBOX_LIST || 
                               nextComponentType === componentTypes.DESCRIPTION_WITH_IMAGE_BOX ||
                               nextComponentType === componentTypes.QUOTE ||
                               nextComponentType === 'quote' ||
                               nextComponentType === 'checkbox_list' ||
                               (nextItem && nextItem.type === 'checkbox_list') ||
                               (nextItem && nextItem.type === 'quote') ||
                               (nextItem && nextItem.id && typeof nextItem.id === 'string' && nextItem.id.includes('checkbox'));
        
        if (NextComponent && isNextHalfWidth) {
          // Render two half-width components in a row using grid layout
          const nextComponentData = nextItem.data || nextItem.content || nextItem;
          processedComponents.push(
            <div key={`pair-${item.id || i}-${nextItem.id || (i + 1)}`} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Component 
                  data={componentData} 
                  isHalfWidth={true}
                  {...componentData}
                  {...getInteractiveProps(componentType, item)}
                  originalItem={item}
                />
              </div>
              <div>
                <NextComponent 
                  data={nextComponentData} 
                  isHalfWidth={true}
                  {...nextComponentData}
                  {...getInteractiveProps(nextComponentType, nextItem)}
                  originalItem={nextItem}
                />
              </div>
            </div>
          );
          i += 2; // Skip next component as it's already rendered
        } else {
          // Render single half-width component taking half space, other half remains empty
          processedComponents.push(
            <div key={item.id || i} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Component 
                  data={componentData} 
                  isHalfWidth={true}
                  {...componentData}
                  {...getInteractiveProps(componentType, item)}
                  originalItem={item}
                />
              </div>
              <div></div>
            </div>
          );
          i++;
        }
      } else {
        // Render full-width component normally
        processedComponents.push(
          <div key={item.id || i} className="content-component">
            <Component 
              data={componentData} 
              {...componentData}
              {...getInteractiveProps(componentType, item)}
              originalItem={item}
            />
          </div>
        );
        i++;
      }
    } catch (error) {
      console.error(`Error rendering component ${componentType}:`, error);
      processedComponents.push(
        <div key={i} className="p-4 border border-red-300 bg-red-50 rounded-lg">
          <p className="text-red-600 text-sm">
            Error rendering component: <code>{componentType}</code>
          </p>
          <p className="text-red-500 text-xs mt-1">{error.message}</p>
          <pre className="mt-2 text-xs text-gray-600 overflow-x-auto">
            {JSON.stringify(item, null, 2)}
          </pre>
        </div>
      );
      i++;
    }
  }

  return (
    <div className="space-y-6">
      {processedComponents}
    </div>
  );
};

export default DynamicContentRenderer;
