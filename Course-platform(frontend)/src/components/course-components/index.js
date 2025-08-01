import TextContent from './TextContent';
import VideoContent from './VideoContent';
import ImageContent from './ImageContent';
import AudioContent from './AudioContent';
import QuizContent from './QuizContent';
import InfoBox from './InfoBox';

export const componentTypes = {
  TEXT: 'text',
  VIDEO: 'video',
  IMAGE: 'image',
  AUDIO: 'audio',
  QUIZ: 'quiz',
  INFO_BOX: 'info_box'
};

export const componentLibrary = {
  [componentTypes.TEXT]: {
    name: 'Text Content',
    component: TextContent,
    icon: '📝',
    defaultData: {
      title: 'Text Section',
      content: 'Enter your text content here...'
    }
  },
  [componentTypes.VIDEO]: {
    name: 'Video',
    component: VideoContent,
    icon: '🎥',
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
    icon: '🖼️',
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
    icon: '🎵',
    defaultData: {
      title: 'Audio Section',
      audioUrl: '',
      description: ''
    }
  },
  [componentTypes.QUIZ]: {
    name: 'Quiz',
    component: QuizContent,
    icon: '❓',
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
    icon: '💡',
    defaultData: {
      title: 'Info Box',
      content: 'Enter important information here...',
      type: 'info'
    }
  }
};

export default componentLibrary;
