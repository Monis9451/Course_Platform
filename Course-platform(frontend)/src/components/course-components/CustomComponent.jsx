import React from 'react';

const CustomComponent = ({ data }) => {
  const { 
    title = 'Custom Component', 
    content = '', 
    backgroundColor = '#f3f4f6', 
    textColor = '#1f2937',
    borderRadius = '8px',
    padding = '16px',
    customStyle = 'default'
  } = data;

  const getCustomStyles = () => {
    const baseStyles = {
      backgroundColor,
      color: textColor,
      borderRadius,
      padding,
    };

    switch (customStyle) {
      case 'gradient':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        };
      case 'shadow':
        return {
          ...baseStyles,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
        };
      case 'bordered':
        return {
          ...baseStyles,
          border: '2px solid #3b82f6',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div style={getCustomStyles()} className="transition-all duration-300">
      {title && (
        <h3 className="text-lg font-semibold mb-3" style={{ color: textColor }}>
          {title}
        </h3>
      )}
      {content && (
        <div className="prose max-w-none">
          <p style={{ color: textColor }}>{content}</p>
        </div>
      )}
    </div>
  );
};

export default CustomComponent;
