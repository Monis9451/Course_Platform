import React from 'react';

const DescriptionWithImageBox = ({ data, isHalfWidth = false }) => {
  const {
    title = '',
    boxTitle = 'Your Body Map',
    description = 'Description',
    imageUrl = '/img.jpg',
    alt = 'Image',
    termLabel = 'Term:',
    termPlaceholder = 'Describe answer...',
    termLabel2 = 'Second Term:',
    termPlaceholder2 = 'Describe second answer...'
  } = data;

  return (
    <div className={`mb-8 ${isHalfWidth ? 'w-full' : ''}`}>
      {title && (
        <div className="mb-6">
          <h2 className={`font-semibold text-gray-800 ${isHalfWidth ? 'text-lg' : 'text-xl'}`}>{title}</h2>
        </div>
      )}
      
      <div className="p-1 border-4 border-[#f7f1e9] rounded-lg">
        <div className="p-6 border border-dashed border-[#bd6334] rounded-lg bg-white">
          <h3 className={`font-semibold mb-6 text-center ${isHalfWidth ? 'text-base' : 'text-lg'}`}>{boxTitle}</h3>
          
          <div className="flex justify-center my-8">
            <div className="flex flex-col items-center">
              <img 
                src={imageUrl} 
                alt={alt} 
                className="max-w-full h-auto rounded-lg shadow-sm"
              />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 italic">{description}</p>
              </div>
            </div>
          </div>
          
          <div className={`gap-4 mt-4 ${isHalfWidth ? 'grid grid-cols-1' : 'grid grid-cols-2'}`}>
            <div>
              <p className="font-medium mb-2">{termLabel}</p>
              <textarea 
                rows={3} 
                className="w-full p-2 border border-gray-300 rounded-md" 
                placeholder={termPlaceholder}
                readOnly
              />
            </div>
            <div>
              <p className="font-medium mb-2">{termLabel2}</p>
              <textarea 
                rows={3} 
                className="w-full p-2 border border-gray-300 rounded-md" 
                placeholder={termPlaceholder2}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionWithImageBox;
