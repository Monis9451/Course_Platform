import React from 'react';

const InfoCardPair = ({ data, isHalfWidth = false }) => {
  const {
    title = '',
    card1Title = 'Card Title',
    card1Content = 'Content for the card goes here. This can be multiple paragraphs of information.',
    card1Icon = 'heart',
    italicLines = ''
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
        <path d="M10 2C7.79 2 6 3.79 6 6c0 1.5.83 2.77 2 3.46V12c0 .55.45 1 1 1h2c.55 0 1-.45 1-1V9.46C13.17 8.77 14 7.5 14 6c0-2.21-1.79-4-4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5S11.38 8.5 10 8.5 7.5 7.38 7.5 6 8.62 3.5 10 3.5zM8.5 14.5h3c.28 0 .5.22.5.5s-.22.5-.5.5h-3c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/>
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
    ),
    brain: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#bd6334] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    shield: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#bd6334] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    target: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#bd6334] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
      </svg>
    ),
    exclamation: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#bd6334] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    none: null
  };

  const selectedIcon = icons[card1Icon] || icons.heart;

  return (
    <div className="mb-8">
      {title && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
      )}
      
      <div className="bg-white border border-gray-200 p-5 rounded-lg">
        <h4 className="font-medium mb-3 flex items-center">
          {selectedIcon && card1Icon !== 'none' && selectedIcon}
          {card1Title}
        </h4>
        <div className="text-gray-700">
          {card1Content.split('\n').map((paragraph, index) => (
            <p key={index} className={index > 0 ? "mt-3" : ""}>{paragraph}</p>
          ))}
        </div>
        
        {/* Render italic lines section if there's content */}
        {italicLines && (
          <div className="mt-4">
            <p className="italic text-[#bd6334]">{italicLines}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCardPair;
