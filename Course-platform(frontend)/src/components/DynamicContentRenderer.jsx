import React from 'react';
import componentLibrary from './course-components';
import { parseContentString, resolveComponentType } from './componentMapping';
import { componentTypes } from './course-components';

const DynamicContentRenderer = ({ content }) => {
  // Parse the content string into an array of components
  const parsedContent = parseContentString(content);
  
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
      
      // Special handling for LEFT_BORDER_BOX to render at half width
      if (componentType === componentTypes.LEFT_BORDER_BOX) {
        // Look for next component to pair with
        const nextItem = parsedContent[i + 1];
        const nextComponentType = nextItem ? resolveComponentType(nextItem, componentLibrary) : null;
        const NextComponent = nextComponentType && componentLibrary[nextComponentType] ? componentLibrary[nextComponentType].component : null;
        
        if (NextComponent && nextComponentType === componentTypes.LEFT_BORDER_BOX) {
          // Render two LEFT_BORDER_BOX components in a row
          const nextComponentData = nextItem.data || nextItem.content || nextItem;
          processedComponents.push(
            <div key={`pair-${item.id || i}-${nextItem.id || (i + 1)}`} className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <Component 
                  data={componentData} 
                  isHalfWidth={true}
                  {...componentData}
                  originalItem={item}
                />
              </div>
              <div className="flex-1">
                <NextComponent 
                  data={nextComponentData} 
                  isHalfWidth={true}
                  {...nextComponentData}
                  originalItem={nextItem}
                />
              </div>
            </div>
          );
          i += 2; // Skip next component as it's already rendered
        } else {
          // Render single LEFT_BORDER_BOX taking half space, other half remains empty
          processedComponents.push(
            <div key={item.id || i} className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <Component 
                  data={componentData} 
                  isHalfWidth={true}
                  {...componentData}
                  originalItem={item}
                />
              </div>
              <div className="flex-1"></div>
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
