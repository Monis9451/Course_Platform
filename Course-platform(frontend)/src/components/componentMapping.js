 // Component ID to Type mapping - this maps permanent IDs to component types
export const COMPONENT_ID_MAPPING = {
  // Basic Content Components
  'heading-1': 'heading',
  'text-1': 'text',
  'paragraph-1': 'paragraph',
  'video-1': 'video',
  'audio-1': 'audio',
  'image-1': 'image',
  
  // Specialized Boxes
  'info-box-1': 'info_box',
  'peach-box-1': 'peach_box',
  'gray-box-1': 'gray_box',
  'left-border-box-1': 'left_border_box',
  'exercise-box-1': 'exercise_box',
  'mark-complete-box-1': 'mark_complete_box',
  
  // Lists and Interactive Components
  'ordered-list-box-1': 'ordered_list_box',
  'unordered-list-box-1': 'unordered_list_box',
  'simple-unorder-list-1': 'simple_unorder_list',
  'checkbox-list-1': 'checkbox_list',
  'question-card-box-1': 'question_card_box',
  'bullet-list-1': 'bullet_list',
  'numbered-list-1': 'numbered_list',
  
  // Interactive Components
  'quiz-1': 'quiz',
  'checklist-1': 'checklist',
  'form-1': 'form',
  
  // Media and Display Components
  'gallery-1': 'gallery',
  'embed-1': 'embed',
  'quote-1': 'quote',
  'code-block-1': 'code_block',
  'table-1': 'table',
  
  // UI Components
  'divider-1': 'divider',
  'button-1': 'button',
  'link-1': 'link',
  'download-1': 'download',
  'accordion-1': 'accordion',
  'tabs-1': 'tabs',
  'progress-bar-1': 'progress_bar',
  'timer-1': 'timer',
  'timeline-1': 'timeline',
  
  // Custom Components
  'custom-1': 'custom',
  'dropdown-1': 'dropdown'
};

// Helper function to parse content string to JSON
export const parseContentString = (content) => {
  if (!content) return null;
  
  // If it's already an array, return as is
  if (Array.isArray(content)) return content;
  
  // If it's a string, try to parse as JSON
  if (typeof content === 'string') {
    // Handle empty strings
    if (content.trim() === '') {
      return [{
        id: 'text-fallback',
        type: 'text',
        data: {
          title: 'Empty Content',
          content: 'This lesson has no content yet.'
        }
      }];
    }
    
    try {
      // First try direct JSON parse
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) return parsed;
      
      // If parsed is an object, wrap it in an array
      if (typeof parsed === 'object' && parsed !== null) return [parsed];
      
      // If it's still a string after parsing, treat as text content
      if (typeof parsed === 'string') {
        return [{
          id: 'text-fallback',
          type: 'text',
          data: {
            title: 'Content',
            content: parsed
          }
        }];
      }
      
      return parsed;
    } catch (error) {
      console.warn('Failed to parse content as JSON, treating as plain text:', error);
      // If JSON parsing fails, treat as plain text content
      return [{
        id: 'text-fallback',
        type: 'text',
        data: {
          title: 'Raw Content',
          content: content
        }
      }];
    }
  }
  
  // Handle objects that aren't arrays
  if (typeof content === 'object' && content !== null) {
    return [content];
  }
  
  return null;
};

// Helper function to resolve component type from ID
export const resolveComponentType = (item, componentLibrary) => {
  // If item has an id, use the mapping
  if (item.id && COMPONENT_ID_MAPPING[item.id]) {
    return COMPONENT_ID_MAPPING[item.id];
  }
  
  // If item already has a type, use it
  if (item.type && componentLibrary[item.type]) {
    return item.type;
  }
  
  // If no valid type found, default to text
  console.warn(`No valid component type found for item:`, item);
  return 'text';
};
