import TextContent from './TextContent';
import VideoContent from './VideoContent';
import ImageContent from './ImageContent';
import AudioContent from './AudioContent';
import QuizContent from './QuizContent';
import InfoBox from './InfoBox';
import CustomComponent from './CustomComponent';
import HeadingContent from './HeadingContent';
import PeachBox from './PeachBox';
import ExerciseBox from './ExerciseBox';
import GrayBox from './GrayBox';
import LeftBorderBox from './LeftBorderBox';
import OrderedListBox from './OrderedListBox';
import QuestionCardBox from './QuestionCardBox';
import CheckboxList from './CheckboxList';
import MarkCompleteBox from './MarkCompleteBox';
import UnorderedListBox from './UnorderedListBox';
import TimelineComponent from './TimelineComponent';
import DescriptionWithImageBox from './DescriptionWithImageBox';
import InfoCardPair from './InfoCardPair';

export const componentTypes = {
  HEADING: 'heading',
  VIDEO: 'video',
  IMAGE: 'image',
  AUDIO: 'audio',
  TEXT: 'text',
  QUIZ: 'quiz',
  INFO_BOX: 'info_box',
  PEACH_BOX: 'peach_box',
  EXERCISE_BOX: 'exercise_box',
  GRAY_BOX: 'gray_box',
  LEFT_BORDER_BOX: 'left_border_box',
  ORDERED_LIST_BOX: 'ordered_list_box',
  QUESTION_CARD_BOX: 'question_card_box',
  CHECKBOX_LIST: 'checkbox_list',
  MARK_COMPLETE_BOX: 'mark_complete_box',
  UNORDERED_LIST_BOX: 'unordered_list_box',
  CUSTOM: 'custom',
  PARAGRAPH: 'paragraph',
  BULLET_LIST: 'bullet_list',
  NUMBERED_LIST: 'numbered_list',
  QUOTE: 'quote',
  CODE_BLOCK: 'code_block',
  TABLE: 'table',
  DIVIDER: 'divider',
  BUTTON: 'button',
  LINK: 'link',
  EMBED: 'embed',
  GALLERY: 'gallery',
  ACCORDION: 'accordion',
  TABS: 'tabs',
  PROGRESS_BAR: 'progress_bar',
  TIMER: 'timer',
  CHECKLIST: 'checklist',
  FORM: 'form',
  DOWNLOAD: 'download',
  TIMELINE: 'timeline',
  DESCRIPTION_WITH_IMAGE_BOX: 'description_with_image_box',
  INFO_CARD_PAIR: 'info_card_pair'
};

export const componentLibrary = {
  [componentTypes.HEADING]: {
    name: 'Heading',
    component: HeadingContent,
    defaultData: {
      title: 'Main Heading',
      content: 'Main Heading'
    }
  },
  [componentTypes.VIDEO]: {
    name: 'Video',
    component: VideoContent,
    defaultData: {
      title: 'Video Section',
      videoUrl: '',
      thumbnailUrl: '',
      description: ''
    }
  },
  [componentTypes.IMAGE]: {
    name: 'Image',
    component: ImageContent,
    defaultData: {
      title: 'Image Section',
      imageUrl: '',
      alt: '',
      caption: ''
    }
  },
  [componentTypes.AUDIO]: {
    name: 'Audio',
    component: AudioContent,
    defaultData: {
      title: 'Audio Section',
      audioUrl: '',
      description: ''
    }
  },
  [componentTypes.QUIZ]: {
    name: 'Quiz',
    component: QuizContent,
    defaultData: {
      title: 'Quiz Section',
      question: 'Enter your question here...',
      options: [
        { text: 'Option A', isCorrect: false },
        { text: 'Option B', isCorrect: true },
        { text: 'Option C', isCorrect: false },
        { text: 'Option D', isCorrect: false }
      ],
      explanation: 'Enter explanation here...'
    }
  },
  [componentTypes.INFO_BOX]: {
    name: 'Info Box',
    component: InfoBox,
    defaultData: {
      title: 'Info Box',
      content: 'Enter important information here...',
      type: 'info'
    }
  },
  [componentTypes.PEACH_BOX]: {
    name: 'Peach Box',
    component: PeachBox,
    defaultData: {
      title: 'Peach Box Section',
      boxTitle: 'Example: Title',
      paragraph: 'Example: paragraph',
      listItems: [],
      italicLines: 'Example: Some ending lines in italic',
      svgType: 'lightbulb'
    }
  },
  [componentTypes.EXERCISE_BOX]: {
    name: 'Exercise Box',
    component: ExerciseBox,
    defaultData: {
      title: 'Exercise Section',
      situation: 'Example: Some situation to ask question',
      questions: [
        {
          question: 'Example: Question 1',
          placeholder: 'Describe answer 1'
        }
      ]
    }
  },
  [componentTypes.GRAY_BOX]: {
    name: 'Gray Box',
    component: GrayBox,
    defaultData: {
      title: 'Gray Box Section',
      boxTitle: 'Example: Title',
      paragraph: 'Example: Paragraph',
      italicLines: 'Example: Some ending lines in italic'
    }
  },
  [componentTypes.LEFT_BORDER_BOX]: {
    name: 'Left Border Box',
    component: LeftBorderBox,
    defaultData: {
      title: 'Left Border Box Section',
      boxTitle: 'Example: Title',
      paragraph: 'Example: Paragraph',
      quote: 'Example: Some quote',
      footerText: 'Example: Text'
    }
  },
  [componentTypes.ORDERED_LIST_BOX]: {
    name: 'Ordered List Box',
    component: OrderedListBox,
    defaultData: {
      title: 'Ordered List Section',
      boxTitle: 'Example: Title',
      description: 'Example: Text',
      points: [
        { text: 'Example: point 1' }
      ],
      footerText: 'Example: some italic lines in last'
    }
  },
  [componentTypes.QUESTION_CARD_BOX]: {
    name: 'Question Cards',
    component: QuestionCardBox,
    defaultData: {
      title: 'Question Cards Section',
      questions: [
        {
          questionTitle: 'Example: title',
          questionText: 'Example: some question',
          placeholder: 'Example: Write your response here...',
          consideration: 'Example: some consideration and suggestion'
        }
      ]
    }
  },
  [componentTypes.CHECKBOX_LIST]: {
    name: 'Checkbox List',
    component: CheckboxList,
    defaultData: {
      title: 'Checkbox List Section',
      checkboxes: [
        { text: 'Example: check 1', checked: false }
      ]
    }
  },
  [componentTypes.MARK_COMPLETE_BOX]: {
    name: 'Mark Complete Box',
    component: MarkCompleteBox,
    defaultData: {
      title: 'Mark Complete Section',
      boxTitle: 'Example: Title',
      description: 'Example: Description text',
      question: 'Example: Some question',
      checkboxes: [
        { text: 'Example: Checkbox 1', checked: false }
      ]
    }
  },
  [componentTypes.UNORDERED_LIST_BOX]: {
    name: 'Unordered List Box',
    component: UnorderedListBox,
    defaultData: {
      title: 'Unordered List Section',
      sectionTitle: 'Example: Title',
      description: 'Example: Description text',
      listBoxes: [
        {
          title: 'Example: Safety First',
          items: ['Example: list item 1']
        }
      ]
    }
  },
  [componentTypes.CUSTOM]: {
    name: 'Custom Block',
    component: CustomComponent,
    defaultData: {
      title: 'Custom Component',
      content: 'This is a customizable component with various styling options.',
      backgroundColor: '#f3f4f6',
      textColor: '#1f2937',
      borderRadius: '8px',
      padding: '16px',
      customStyle: 'default'
    }
  },
  [componentTypes.TEXT]: {
    name: 'Text Content',
    component: TextContent,
    defaultData: {
      title: 'Text Section',
      content: 'Enter your text content here...'
    }
  },
  [componentTypes.PARAGRAPH]: {
    name: 'Paragraph',
    component: TextContent,
    defaultData: {
      title: 'Paragraph',
      content: 'This is a paragraph of text content.',
      type: 'paragraph'
    }
  },
  [componentTypes.BULLET_LIST]: {
    name: 'Bullet List',
    component: TextContent,
    defaultData: {
      title: 'Bullet List',
      content: '• First item\n• Second item\n• Third item',
      type: 'list'
    }
  },
  [componentTypes.NUMBERED_LIST]: {
    name: 'Numbered List',
    component: TextContent,
    defaultData: {
      title: 'Numbered List',
      content: '1. First item\n2. Second item\n3. Third item',
      type: 'numbered_list'
    }
  },
  [componentTypes.QUOTE]: {
    name: 'Quote Block',
    component: InfoBox,
    defaultData: {
      title: 'Quote',
      content: 'This is an inspirational quote or important statement.',
      type: 'quote'
    }
  },
  [componentTypes.CODE_BLOCK]: {
    name: 'Code Block',
    component: TextContent,
    defaultData: {
      title: 'Code Block',
      content: 'console.log("Hello, World!");',
      type: 'code'
    }
  },
  [componentTypes.TABLE]: {
    name: 'Table',
    component: CustomComponent,
    defaultData: {
      title: 'Table',
      content: 'Data table with rows and columns',
      type: 'table'
    }
  },
  [componentTypes.DIVIDER]: {
    name: 'Divider',
    component: CustomComponent,
    defaultData: {
      title: 'Section Divider',
      content: 'Visual separator between sections',
      type: 'divider'
    }
  },
  [componentTypes.BUTTON]: {
    name: 'Button',
    component: CustomComponent,
    defaultData: {
      title: 'Action Button',
      content: 'Click Me',
      type: 'button',
      action: 'link'
    }
  },
  [componentTypes.LINK]: {
    name: 'Link',
    component: CustomComponent,
    defaultData: {
      title: 'External Link',
      content: 'Visit this resource',
      url: '',
      type: 'link'
    }
  },
  [componentTypes.EMBED]: {
    name: 'Embed',
    component: CustomComponent,
    defaultData: {
      title: 'Embedded Content',
      content: 'External content embed',
      embedUrl: '',
      type: 'embed'
    }
  },
  [componentTypes.GALLERY]: {
    name: 'Image Gallery',
    component: ImageContent,
    defaultData: {
      title: 'Image Gallery',
      images: [],
      type: 'gallery'
    }
  },
  [componentTypes.ACCORDION]: {
    name: 'Accordion',
    component: CustomComponent,
    defaultData: {
      title: 'Accordion Section',
      content: 'Collapsible content section',
      type: 'accordion'
    }
  },
  [componentTypes.TABS]: {
    name: 'Tabs',
    component: CustomComponent,
    defaultData: {
      title: 'Tabbed Content',
      tabs: [
        { title: 'Tab 1', content: 'Content 1' },
        { title: 'Tab 2', content: 'Content 2' }
      ],
      type: 'tabs'
    }
  },
  [componentTypes.PROGRESS_BAR]: {
    name: 'Progress Bar',
    component: CustomComponent,
    defaultData: {
      title: 'Progress Indicator',
      progress: 50,
      type: 'progress'
    }
  },
  [componentTypes.TIMER]: {
    name: 'Timer',
    component: CustomComponent,
    defaultData: {
      title: 'Timer Component',
      duration: 300,
      type: 'timer'
    }
  },
  [componentTypes.CHECKLIST]: {
    name: 'Checklist',
    component: CustomComponent,
    defaultData: {
      title: 'Task Checklist',
      items: [
        { text: 'Task 1', completed: false },
        { text: 'Task 2', completed: false }
      ],
      type: 'checklist'
    }
  },
  [componentTypes.FORM]: {
    name: 'Form',
    component: CustomComponent,
    defaultData: {
      title: 'Input Form',
      fields: [
        { type: 'text', label: 'Name', required: true },
        { type: 'email', label: 'Email', required: true }
      ],
      type: 'form'
    }
  },
  [componentTypes.DOWNLOAD]: {
    name: 'Download',
    component: CustomComponent,
    defaultData: {
      title: 'File Download',
      fileName: 'document.pdf',
      fileUrl: '',
      type: 'download'
    }
  },
  [componentTypes.TIMELINE]: {
    name: 'Timeline',
    component: TimelineComponent,
    defaultData: {
      title: 'Timeline Section',
      timelineTitle: 'Your Personal Timeline',
      stages: [
        'Early Childhood',
        'Adolescence', 
        'Early Adulthood',
        'Mid Adulthood',
        'Present'
      ],
      events: [
        { event: '', impact: '', userCanEdit: true },
        { event: '', impact: '', userCanEdit: true },
        { event: '', impact: '', userCanEdit: true }
      ]
    }
  },
  [componentTypes.DESCRIPTION_WITH_IMAGE_BOX]: {
    name: 'Description with Image Box',
    component: DescriptionWithImageBox,
    defaultData: {
      title: 'Description with Image Section',
      boxTitle: 'Your Body Map',
      description: 'Description',
      imageUrl: '/img.jpg',
      alt: 'Image',
      termLabel: 'Term:',
      termPlaceholder: 'Describe answer...'
    }
  },
  [componentTypes.INFO_CARD_PAIR]: {
    name: 'Info Card',
    component: InfoCardPair,
    defaultData: {
      title: 'Info Card Section',
      card1Title: 'Card Title',
      card1Content: 'Content for the card goes here. This can be multiple paragraphs of information.',
      card1Icon: 'heart'
    }
  }
};

export default componentLibrary;
