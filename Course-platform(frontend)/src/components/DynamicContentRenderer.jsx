import React from 'react';
import componentLibrary from './course-components';
import { parseContentString, resolveComponentType } from './componentMapping';

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

  return (
    <div className="space-y-6">
      {parsedContent.map((item, index) => {
        // Resolve the component type from ID or direct type
        const componentType = resolveComponentType(item, componentLibrary);
        const componentConfig = componentLibrary[componentType];
        
        if (!componentConfig) {
          console.warn(`Unknown component type: ${componentType}`, item);
          return (
            <div key={index} className="p-4 border border-red-300 bg-red-50 rounded-lg">
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
        }

        const Component = componentConfig.component;
        
        try {
          // Ensure we have valid data
          const componentData = item.data || item.content || item;
          
          return (
            <div key={item.id || index} className="content-component">
              <Component 
                data={componentData} 
                {...componentData}
                originalItem={item}
              />
            </div>
          );
        } catch (error) {
          console.error(`Error rendering component ${componentType}:`, error);
          return (
            <div key={index} className="p-4 border border-red-300 bg-red-50 rounded-lg">
              <p className="text-red-600 text-sm">
                Error rendering component: <code>{componentType}</code>
              </p>
              <p className="text-red-500 text-xs mt-1">{error.message}</p>
              <pre className="mt-2 text-xs text-gray-600 overflow-x-auto">
                {JSON.stringify(item, null, 2)}
              </pre>
            </div>
          );
        }
      })}
    </div>
  );
};

export default DynamicContentRenderer;
