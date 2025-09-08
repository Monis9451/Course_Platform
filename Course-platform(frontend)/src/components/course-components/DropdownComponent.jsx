import React, { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const DropdownComponent = ({ data, onChange, isEditable = false, isHalfWidth = false }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleMainDataChange = (field, value) => {
    if (onChange) {
      onChange({ ...data, [field]: value });
    }
  };

  const handleSectionChange = (sectionIndex, field, value) => {
    const updatedSections = [...(data.sections || [])];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      [field]: value
    };
    if (onChange) {
      onChange({ ...data, sections: updatedSections });
    }
  };

  const handleContentItemChange = (sectionIndex, itemIndex, field, value) => {
    const updatedSections = [...(data.sections || [])];
    const updatedContent = [...(updatedSections[sectionIndex].content || [])];
    updatedContent[itemIndex] = {
      ...updatedContent[itemIndex],
      [field]: value
    };
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      content: updatedContent
    };
    if (onChange) {
      onChange({ ...data, sections: updatedSections });
    }
  };

  const handleListItemChange = (sectionIndex, itemIndex, listIndex, value) => {
    const updatedSections = [...(data.sections || [])];
    const updatedContent = [...(updatedSections[sectionIndex].content || [])];
    const updatedListItems = [...(updatedContent[itemIndex].listItems || [])];
    updatedListItems[listIndex] = value;
    updatedContent[itemIndex] = {
      ...updatedContent[itemIndex],
      listItems: updatedListItems
    };
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      content: updatedContent
    };
    if (onChange) {
      onChange({ ...data, sections: updatedSections });
    }
  };

  const addSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: 'New Section',
      icon: '📋',
      content: [{
        heading: 'Content Heading',
        description: 'Content description goes here.',
        listTitle: 'List Title',
        listItems: ['List item 1']
      }]
    };
    const updatedSections = [...(data.sections || []), newSection];
    if (onChange) {
      onChange({ ...data, sections: updatedSections });
    }
  };

  const removeSection = (sectionIndex) => {
    const updatedSections = (data.sections || []).filter((_, index) => index !== sectionIndex);
    if (onChange) {
      onChange({ ...data, sections: updatedSections });
    }
  };

  const addContentItem = (sectionIndex) => {
    const updatedSections = [...(data.sections || [])];
    const newContentItem = {
      heading: 'New Content Heading',
      description: 'New content description.',
      listTitle: 'New List Title',
      listItems: ['New list item']
    };
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      content: [...(updatedSections[sectionIndex].content || []), newContentItem]
    };
    if (onChange) {
      onChange({ ...data, sections: updatedSections });
    }
  };

  const removeContentItem = (sectionIndex, itemIndex) => {
    const updatedSections = [...(data.sections || [])];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      content: updatedSections[sectionIndex].content.filter((_, index) => index !== itemIndex)
    };
    if (onChange) {
      onChange({ ...data, sections: updatedSections });
    }
  };

  const addListItem = (sectionIndex, itemIndex) => {
    const updatedSections = [...(data.sections || [])];
    const updatedContent = [...(updatedSections[sectionIndex].content || [])];
    updatedContent[itemIndex] = {
      ...updatedContent[itemIndex],
      listItems: [...(updatedContent[itemIndex].listItems || []), 'New list item']
    };
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      content: updatedContent
    };
    if (onChange) {
      onChange({ ...data, sections: updatedSections });
    }
  };

  const removeListItem = (sectionIndex, itemIndex, listIndex) => {
    const updatedSections = [...(data.sections || [])];
    const updatedContent = [...(updatedSections[sectionIndex].content || [])];
    updatedContent[itemIndex] = {
      ...updatedContent[itemIndex],
      listItems: updatedContent[itemIndex].listItems.filter((_, index) => index !== listIndex)
    };
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      content: updatedContent
    };
    if (onChange) {
      onChange({ ...data, sections: updatedSections });
    }
  };

  if (isEditable) {
    return (
      <div className={`${isHalfWidth ? 'w-full' : 'mb-6 w-full'}`}>
        <div className="bg-white border border-gray-200 p-5 rounded-lg">
          {/* Main Title Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Title
            </label>
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => handleMainDataChange('title', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter main title..."
            />
          </div>

          {/* Main Icon Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Icon (Emoji)
            </label>
            <input
              type="text"
              value={data.icon || ''}
              onChange={(e) => handleMainDataChange('icon', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter emoji (e.g., 🔍)..."
            />
          </div>

          {/* Sections */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Dropdown Sections
              </label>
              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                <FiPlus size={14} />
                Add Section
              </button>
            </div>

            {(data.sections || []).map((section, sectionIndex) => (
              <div key={section.id || sectionIndex} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-800">Section {sectionIndex + 1}</h4>
                  {(data.sections || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(sectionIndex)}
                      className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>

                {/* Section Title */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Section Title</label>
                  <input
                    type="text"
                    value={section.title || ''}
                    onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Section title..."
                  />
                </div>

                {/* Section Icon */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Section Icon</label>
                  <input
                    type="text"
                    value={section.icon || ''}
                    onChange={(e) => handleSectionChange(sectionIndex, 'icon', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Emoji..."
                  />
                </div>

                {/* Content Items */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-gray-700">Content Items</label>
                    <button
                      type="button"
                      onClick={() => addContentItem(sectionIndex)}
                      className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-xs"
                    >
                      <FiPlus size={12} />
                      Add Content
                    </button>
                  </div>

                  {(section.content || []).map((item, itemIndex) => (
                    <div key={itemIndex} className="border border-gray-200 rounded-md p-3 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-600">Content {itemIndex + 1}</span>
                        {(section.content || []).length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeContentItem(sectionIndex, itemIndex)}
                            className="p-1 text-red-500 hover:text-red-700 rounded-md text-xs"
                          >
                            <FiTrash2 size={12} />
                          </button>
                        )}
                      </div>

                      {/* Content Heading */}
                      <div className="mb-2">
                        <label className="block text-xs text-gray-600 mb-1">Heading</label>
                        <input
                          type="text"
                          value={item.heading || ''}
                          onChange={(e) => handleContentItemChange(sectionIndex, itemIndex, 'heading', e.target.value)}
                          className="w-full p-1 border border-gray-300 rounded text-xs"
                          placeholder="Content heading..."
                        />
                      </div>

                      {/* Content Description */}
                      <div className="mb-2">
                        <label className="block text-xs text-gray-600 mb-1">Description</label>
                        <textarea
                          value={item.description || ''}
                          onChange={(e) => handleContentItemChange(sectionIndex, itemIndex, 'description', e.target.value)}
                          className="w-full p-1 border border-gray-300 rounded text-xs resize-none"
                          rows={2}
                          placeholder="Content description..."
                        />
                      </div>

                      {/* List Title */}
                      <div className="mb-2">
                        <label className="block text-xs text-gray-600 mb-1">List Title</label>
                        <input
                          type="text"
                          value={item.listTitle || ''}
                          onChange={(e) => handleContentItemChange(sectionIndex, itemIndex, 'listTitle', e.target.value)}
                          className="w-full p-1 border border-gray-300 rounded text-xs"
                          placeholder="List title..."
                        />
                      </div>

                      {/* List Items */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs text-gray-600">List Items</label>
                          <button
                            type="button"
                            onClick={() => addListItem(sectionIndex, itemIndex)}
                            className="text-xs text-blue-500 hover:text-blue-700"
                          >
                            + Add Item
                          </button>
                        </div>
                        {(item.listItems || []).map((listItem, listIndex) => (
                          <div key={listIndex} className="flex gap-1 mb-1">
                            <input
                              type="text"
                              value={listItem}
                              onChange={(e) => handleListItemChange(sectionIndex, itemIndex, listIndex, e.target.value)}
                              className="flex-1 p-1 border border-gray-300 rounded text-xs"
                              placeholder="List item..."
                            />
                            {(item.listItems || []).length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeListItem(sectionIndex, itemIndex, listIndex)}
                                className="px-1 text-red-500 hover:text-red-700 text-xs"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Display mode
  return (
    <div className={`${isHalfWidth ? 'w-full' : 'mb-6 w-full'}`}>
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-semibold text-[#8B4513] mb-6 flex items-center">
          <span className="w-10 h-10 bg-gradient-to-r from-[#D2691E] to-[#CD853F] text-white rounded-full flex items-center justify-center text-lg mr-4">
            {data.icon || '🔍'}
          </span>
          {data.title || 'Dropdown Title'}
        </h3>
        
        <div className="space-y-4">
          {(data.sections || []).map((section, sectionIndex) => (
            <div key={section.id || sectionIndex} className="border border-[#DEB887]/30 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.id || sectionIndex)}
                className="w-full p-4 bg-gradient-to-r from-[#F5E6D3] to-[#F0E68C]/30 flex items-center justify-between hover:from-[#F0E68C]/40 hover:to-[#F5E6D3] transition-colors duration-300"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{section.icon || '📋'}</span>
                  <span className="text-lg font-semibold text-[#8B4513]">{section.title || 'Section Title'}</span>
                </div>
                <span className={`text-[#8B4513] transform transition-transform duration-300 ${
                  expandedSections[section.id || sectionIndex] ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>
              
              {expandedSections[section.id || sectionIndex] && (
                <div className="p-4 bg-white/50 space-y-4">
                  {(section.content || []).map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white p-4 rounded-lg border border-[#DEB887]/20">
                      <h5 className="font-semibold text-[#8B4513] mb-2">{item.heading || 'Content Heading'}</h5>
                      <p className="text-[#5D4037] mb-3">{item.description || 'Content description goes here.'}</p>
                      <div className="bg-[#F8F4F0] p-3 rounded-md">
                        <p className="text-sm font-medium text-[#8B4513] mb-2">{item.listTitle || 'List Title'}:</p>
                        <ul className="text-sm text-[#5D4037] space-y-1">
                          {(item.listItems || []).map((listItem, listIdx) => (
                            <li key={listIdx} className="flex items-start">
                              <span className="text-[#D2691E] mr-2">•</span>
                              {listItem}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownComponent;
