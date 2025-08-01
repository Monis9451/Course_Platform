import React from 'react';

const InfoBox = ({ data }) => {
  const getBoxStyle = (type) => {
    const styles = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      tip: 'bg-purple-50 border-purple-200 text-purple-800'
    };
    return styles[type] || styles.info;
  };

  const getIcon = (type) => {
    const icons = {
      info: 'ℹ️',
      warning: '⚠️',
      success: '✅',
      error: '❌',
      tip: '💡'
    };
    return icons[type] || icons.info;
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{data.title}</h3>
      <div className={`p-4 rounded-lg border-2 ${getBoxStyle(data.type || 'info')}`}>
        <div className="flex items-start space-x-3">
          <span className="text-xl">{getIcon(data.type || 'info')}</span>
          <div>
            <div className="whitespace-pre-wrap">{data.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
