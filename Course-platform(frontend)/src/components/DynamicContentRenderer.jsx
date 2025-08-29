import React from 'react';
import componentLibrary from './course-components';

const DynamicContentRenderer = ({ content }) => {
  if (!content || !Array.isArray(content)) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No content available for this lesson.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {content.map((item, index) => {
        const componentConfig = componentLibrary[item.type];
        
        if (!componentConfig) {
          console.warn(`Unknown component type: ${item.type}`);
          return (
            <div key={index} className="p-4 border border-red-300 bg-red-50 rounded-lg">
              <p className="text-red-600 text-sm">
                Unknown component type: <code>{item.type}</code>
              </p>
              <pre className="mt-2 text-xs text-gray-600 overflow-x-auto">
                {JSON.stringify(item.data, null, 2)}
              </pre>
            </div>
          );
        }

        const Component = componentConfig.component;
        
        try {
          return (
            <div key={index} className="content-component">
              <Component data={item.data} {...item.data} />
            </div>
          );
        } catch (error) {
          console.error(`Error rendering component ${item.type}:`, error);
          return (
            <div key={index} className="p-4 border border-red-300 bg-red-50 rounded-lg">
              <p className="text-red-600 text-sm">
                Error rendering component: <code>{item.type}</code>
              </p>
              <p className="text-red-500 text-xs mt-1">{error.message}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default DynamicContentRenderer;
