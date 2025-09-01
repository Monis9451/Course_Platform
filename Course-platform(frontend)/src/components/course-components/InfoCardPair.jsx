import React from 'react';

const InfoCardPair = ({ data }) => {
  const {
    title = '',
    card1Title = 'First Card Title',
    card1Content = 'Content for the first card goes here. This can be multiple paragraphs of information.',
    card1Icon = 'heart',
    card2Title = 'Second Card Title', 
    card2Content = 'Content for the second card goes here. This can also be multiple paragraphs of information.',
    card2Icon = 'heart'
  } = data;

  // SVG icons
  const icons = {
    heart: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#bd6334] mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    ),
    lightbulb: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#bd6334] mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 6.343a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM6 10a1 1 0 01-1 1H4a1 1 0 110-2h1a1 1 0 011 1zM.343 15.657a1 1 0 001.414 0l.707-.707a1 1 0 00-1.414-1.414l-.707.707a1 1 0 000 1.414zM3 17a1 1 0 011-1h.01a1 1 0 110 2H4a1 1 0 01-1-1zM16 15.657l-.707-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM17 17a1 1 0 01-1 1h-.01a1 1 0 110-2H16a1 1 0 011 1z" />
        <path d="M9 13h2a1 1 0 110 2H9a1 1 0 110-2zM9 15h2a1 1 0 110 2H9a1 1 0 110-2z" />
      </svg>
    ),
    star: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#bd6334] mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#bd6334] mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    check: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#bd6334] mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    )
  };

  return (
    <div className="mb-8">
      {title && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 p-5 rounded-lg">
          <h4 className="font-medium mb-3 flex items-center">
            {icons[card1Icon] || icons.heart}
            {card1Title}
          </h4>
          <div className="text-gray-700">
            {card1Content.split('\n').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-3" : ""}>{paragraph}</p>
            ))}
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 p-5 rounded-lg">
          <h4 className="font-medium mb-3 flex items-center">
            {icons[card2Icon] || icons.heart}
            {card2Title}
          </h4>
          <div className="text-gray-700">
            {card2Content.split('\n').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-3" : ""}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCardPair;
