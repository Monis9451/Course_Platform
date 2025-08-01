import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Header from './Header';
import Footer from './Footer';
import toast from 'react-hot-toast';
import { 
  FiPlus, 
  FiTrash2, 
  FiEdit3, 
  FiSave, 
  FiArrowLeft, 
  FiArrowRight, 
  FiUpload,
  FiImage,
  FiVideo,
  FiMusic,
  FiEye,
  FiCheck,
  FiX
} from 'react-icons/fi';
import { componentLibrary, componentTypes } from '../components/course-components';

const AddCourse = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();

  // Wizard states
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    imageURL: '',
    moduleNumbers: 0
  });
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [courseId, setCourseId] = useState(null);

  // Editor states
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentLessonContent, setCurrentLessonContent] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [componentData, setComponentData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  const steps = [
    { id: 1, title: 'Course Details', description: 'Basic course information' },
    { id: 2, title: 'Course Modules', description: 'Define course modules' },
    { id: 3, title: 'Lesson Structure', description: 'Create lesson outline' },
    { id: 4, title: 'Content Editor', description: 'Add lesson content' }
  ];

  // Step 1: Course Details Form
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (!courseData.title || !courseData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(courseData)
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      const result = await response.json();
      setCourseId(result.data.course[0]?.courseID || result.data.course?.courseID);
      toast.success('Course created successfully!');
      setCurrentStep(2);

      // Initialize modules array
      const moduleArray = Array.from({ length: courseData.moduleNumbers }, (_, index) => ({
        title: '',
        description: '',
        order: index + 1,
        lessonNumber: 0
      }));
      setModules(moduleArray);

    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Modules Form
  const handleModulesSubmit = async () => {
    const incompleteModules = modules.filter(module => !module.title || !module.description || !module.lessonNumber);
    if (incompleteModules.length > 0) {
      toast.error('Please fill in all module details');
      return;
    }

    setLoading(true);
    try {
      const modulePromises = modules.map(async (module) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/modules/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            courseID: courseId,
            ...module
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to create module: ${module.title}`);
        }
        
        const result = await response.json();
        return result.data.module[0] || result.data.module;
      });

      const createdModules = await Promise.all(modulePromises);
      setModules(createdModules);
      
      // Initialize lessons array
      const allLessons = [];
      createdModules.forEach((module) => {
        for (let i = 0; i < module.lessonNumber; i++) {
          allLessons.push({
            moduleID: module.moduleID,
            title: '',
            order: i + 1,
            moduleTitle: module.title,
            content: []
          });
        }
      });
      setLessons(allLessons);

      toast.success('Modules created successfully!');
      setCurrentStep(3);

    } catch (error) {
      console.error('Error creating modules:', error);
      toast.error('Failed to create modules');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Lessons Form
  const handleLessonsSubmit = async () => {
    const incompleteLessons = lessons.filter(lesson => !lesson.title);
    if (incompleteLessons.length > 0) {
      toast.error('Please fill in all lesson titles');
      return;
    }

    setLoading(true);
    try {
      const lessonPromises = lessons.map(async (lesson) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/lessons/without-content`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            moduleID: lesson.moduleID,
            title: lesson.title,
            order: lesson.order
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to create lesson: ${lesson.title}`);
        }
        
        const result = await response.json();
        return {
          ...lesson,
          lessonID: result.data.lesson[0]?.lessonID || result.data.lesson?.lessonID,
          content: []
        };
      });

      const createdLessons = await Promise.all(lessonPromises);
      setLessons(createdLessons);

      toast.success('Lesson structure created successfully!');
      setIsEditorMode(true);
      setCurrentStep(4);

    } catch (error) {
      console.error('Error creating lessons:', error);
      toast.error('Failed to create lessons');
    } finally {
      setLoading(false);
    }
  };

  // File upload function
  const handleFileUpload = async (file) => {
    setUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/uploads/cloudinary`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();
      return result.data.url;

    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
      return null;
    } finally {
      setUploadingFile(false);
    }
  };

  // Course image upload
  const handleCourseImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const url = await handleFileUpload(file);
    if (url) {
      setCourseData(prev => ({ ...prev, imageURL: url }));
      toast.success('Course image uploaded successfully!');
    }
  };

  // Editor functions
  const addComponent = (type) => {
    const componentConfig = componentLibrary[type];
    if (!componentConfig) return;

    const newComponent = {
      id: Date.now(),
      type,
      data: { ...componentConfig.defaultData }
    };

    setCurrentLessonContent(prev => [...prev, newComponent]);
    setSelectedComponent(newComponent);
    setComponentData(newComponent.data);
  };

  const updateComponent = (componentId, newData) => {
    setCurrentLessonContent(prev =>
      prev.map(comp =>
        comp.id === componentId ? { ...comp, data: newData } : comp
      )
    );
    
    // Update selected component if it's the one being edited
    if (selectedComponent && selectedComponent.id === componentId) {
      setSelectedComponent(prev => ({ ...prev, data: newData }));
    }
  };

  const deleteComponent = (componentId) => {
    setCurrentLessonContent(prev => prev.filter(comp => comp.id !== componentId));
    if (selectedComponent && selectedComponent.id === componentId) {
      setSelectedComponent(null);
      setComponentData({});
    }
  };

  const selectComponent = (component) => {
    setSelectedComponent(component);
    setComponentData(component.data);
  };

  const moveComponent = (fromIndex, toIndex) => {
    const newContent = [...currentLessonContent];
    const [movedItem] = newContent.splice(fromIndex, 1);
    newContent.splice(toIndex, 0, movedItem);
    setCurrentLessonContent(newContent);
  };

  // Save lesson content
  const saveLessonContent = async () => {
    if (!lessons[currentLessonIndex]) return;

    setLoading(true);
    try {
      const lesson = lessons[currentLessonIndex];
      const content = JSON.stringify(currentLessonContent);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/lessons/add-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          lessonID: lesson.lessonID,
          content
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save lesson content');
      }

      // Update lessons array
      const updatedLessons = [...lessons];
      updatedLessons[currentLessonIndex].content = currentLessonContent;
      setLessons(updatedLessons);

      toast.success('Lesson content saved successfully!');

    } catch (error) {
      console.error('Error saving lesson content:', error);
      toast.error('Failed to save lesson content');
    } finally {
      setLoading(false);
    }
  };

  // Navigate between lessons
  const goToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      saveLessonContent();
      setCurrentLessonIndex(currentLessonIndex + 1);
      setCurrentLessonContent(lessons[currentLessonIndex + 1]?.content || []);
      setSelectedComponent(null);
      setComponentData({});
    }
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      saveLessonContent();
      setCurrentLessonIndex(currentLessonIndex - 1);
      setCurrentLessonContent(lessons[currentLessonIndex - 1]?.content || []);
      setSelectedComponent(null);
      setComponentData({});
    }
  };

  // Load lesson content when lesson changes
  useEffect(() => {
    if (lessons[currentLessonIndex]) {
      setCurrentLessonContent(lessons[currentLessonIndex].content || []);
    }
  }, [currentLessonIndex, lessons]);

  // Handle component data changes
  const handleComponentDataChange = (field, value) => {
    const newData = { ...componentData, [field]: value };
    setComponentData(newData);
    
    if (selectedComponent) {
      updateComponent(selectedComponent.id, newData);
    }
  };

  // Handle file upload for components
  const handleComponentFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = await handleFileUpload(file);
    if (url) {
      handleComponentDataChange(field, url);
      toast.success('File uploaded successfully!');
    }
  };

  // Render component form based on type
  const renderComponentForm = () => {
    if (!selectedComponent) {
      return (
        <div className="text-center text-gray-500 py-8">
          Select a component to edit its properties
        </div>
      );
    }

    const { type } = selectedComponent;

    switch (type) {
      case componentTypes.TEXT:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={componentData.content || ''}
                onChange={(e) => handleComponentDataChange('content', e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case componentTypes.VIDEO:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Upload Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleComponentFileUpload(e, 'videoUrl')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={uploadingFile}
              />
              {uploadingFile && <p className="text-sm text-blue-600">Uploading...</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={componentData.description || ''}
                onChange={(e) => handleComponentDataChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case componentTypes.IMAGE:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleComponentFileUpload(e, 'imageUrl')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={uploadingFile}
              />
              {uploadingFile && <p className="text-sm text-blue-600">Uploading...</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Alt Text</label>
              <input
                type="text"
                value={componentData.alt || ''}
                onChange={(e) => handleComponentDataChange('alt', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Caption</label>
              <input
                type="text"
                value={componentData.caption || ''}
                onChange={(e) => handleComponentDataChange('caption', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case componentTypes.AUDIO:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Upload Audio</label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleComponentFileUpload(e, 'audioUrl')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={uploadingFile}
              />
              {uploadingFile && <p className="text-sm text-blue-600">Uploading...</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={componentData.description || ''}
                onChange={(e) => handleComponentDataChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case componentTypes.QUIZ:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Question</label>
              <textarea
                value={componentData.question || ''}
                onChange={(e) => handleComponentDataChange('question', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Options</label>
              {(componentData.options || []).map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => {
                      const newOptions = [...(componentData.options || [])];
                      newOptions[index] = { ...option, text: e.target.value };
                      handleComponentDataChange('options', newOptions);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  />
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={option.isCorrect}
                      onChange={() => {
                        const newOptions = (componentData.options || []).map((opt, idx) => ({
                          ...opt,
                          isCorrect: idx === index
                        }));
                        handleComponentDataChange('options', newOptions);
                      }}
                    />
                    <span className="text-sm">Correct</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const newOptions = (componentData.options || []).filter((_, idx) => idx !== index);
                      handleComponentDataChange('options', newOptions);
                    }}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newOptions = [...(componentData.options || []), { text: '', isCorrect: false }];
                  handleComponentDataChange('options', newOptions);
                }}
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <FiPlus className="w-4 h-4" />
                <span>Add Option</span>
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Explanation</label>
              <textarea
                value={componentData.explanation || ''}
                onChange={(e) => handleComponentDataChange('explanation', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case componentTypes.INFO_BOX:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={componentData.type || 'info'}
                onChange={(e) => handleComponentDataChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
                <option value="tip">Tip</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={componentData.content || ''}
                onChange={(e) => handleComponentDataChange('content', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      default:
        return <div>Unknown component type</div>;
    }
  };

  if (isEditorMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Content Editor</h1>
            <p className="text-gray-600">Create engaging lesson content with our interactive editor</p>
          </div>

          {/* Lesson Navigation */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {lessons[currentLessonIndex]?.title} 
                  <span className="text-sm text-gray-500 ml-2">
                    ({lessons[currentLessonIndex]?.moduleTitle})
                  </span>
                </h2>
                <p className="text-sm text-gray-600">
                  Lesson {currentLessonIndex + 1} of {lessons.length}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPreviousLesson}
                  disabled={currentLessonIndex === 0}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={saveLessonContent}
                  disabled={loading}
                  className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  <FiSave className="w-4 h-4" />
                  <span>{loading ? 'Saving...' : 'Save'}</span>
                </button>
                <button
                  onClick={goToNextLesson}
                  disabled={currentLessonIndex === lessons.length - 1}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Component Library Sidebar */}
            <div className="col-span-3">
              <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
                <h3 className="text-lg font-semibold mb-4">Component Library</h3>
                <div className="space-y-2">
                  {Object.entries(componentLibrary).map(([type, config]) => (
                    <button
                      key={type}
                      onClick={() => addComponent(type)}
                      className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-md hover:bg-gray-50 hover:border-blue-300 transition-colors"
                    >
                      <span className="text-2xl">{config.icon}</span>
                      <span className="font-medium">{config.name}</span>
                    </button>
                  ))}
                </div>

                {/* Quick File Upload Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Upload</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="text-center">
                      <FiUpload className="mx-auto w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-3">Upload media files</p>
                      <input
                        type="file"
                        accept="image/*,video/*,audio/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          
                          let componentType = componentTypes.IMAGE;
                          let fieldName = 'imageUrl';
                          if (file.type.startsWith('video/')) {
                            componentType = componentTypes.VIDEO;
                            fieldName = 'videoUrl';
                          } else if (file.type.startsWith('audio/')) {
                            componentType = componentTypes.AUDIO;
                            fieldName = 'audioUrl';
                          }
                          
                          const url = await handleFileUpload(file);
                          if (url) {
                            const newComponent = {
                              id: Date.now(),
                              type: componentType,
                              data: {
                                ...componentLibrary[componentType].defaultData,
                                title: file.name.split('.')[0],
                                [fieldName]: url
                              }
                            };
                            setCurrentLessonContent(prev => [...prev, newComponent]);
                            toast.success('File uploaded and component added!');
                          }
                        }}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Component Properties Panel */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Component Properties</h3>
                  <div className="border border-gray-200 rounded-md p-4 max-h-96 overflow-y-auto">
                    {renderComponentForm()}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="col-span-9">
              <div className="bg-white rounded-lg shadow-md">
                {/* Preview Toggle */}
                <div className="border-b border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Lesson Content</h3>
                    <button
                      onClick={() => setPreviewMode(!previewMode)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                        previewMode 
                          ? 'bg-gray-600 text-white hover:bg-gray-700' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <FiEye className="w-4 h-4" />
                      <span>{previewMode ? 'Edit Mode' : 'Preview Mode'}</span>
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 min-h-96">
                  {currentLessonContent.length === 0 ? (
                    <div className="text-center text-gray-500 py-16">
                      <div className="text-6xl mb-4">📝</div>
                      <h3 className="text-xl font-medium mb-2">No content yet</h3>
                      <p>Add components from the sidebar to start building your lesson</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {currentLessonContent.map((component, index) => {
                        const ComponentRenderer = componentLibrary[component.type]?.component;
                        if (!ComponentRenderer) return null;

                        return (
                          <div
                            key={component.id}
                            className={`relative group ${
                              !previewMode ? 'border-2 border-dashed border-transparent hover:border-blue-300 rounded-lg p-4' : ''
                            } ${
                              selectedComponent?.id === component.id && !previewMode ? 'border-blue-500 bg-blue-50' : ''
                            }`}
                            onClick={() => !previewMode && selectComponent(component)}
                          >
                            <ComponentRenderer data={component.data} />
                            
                            {!previewMode && (
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex space-x-1">
                                  {/* Move Up Button */}
                                  {index > 0 && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        moveComponent(index, index - 1);
                                      }}
                                      className="p-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                                      title="Move Up"
                                    >
                                      <FiArrowUp className="w-3 h-3" />
                                    </button>
                                  )}
                                  {/* Move Down Button */}
                                  {index < currentLessonContent.length - 1 && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        moveComponent(index, index + 1);
                                      }}
                                      className="p-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                                      title="Move Down"
                                    >
                                      <FiArrowDown className="w-3 h-3" />
                                    </button>
                                  )}
                                  {/* Edit Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      selectComponent(component);
                                    }}
                                    className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    title="Edit"
                                  >
                                    <FiEdit3 className="w-3 h-3" />
                                  </button>
                                  {/* Delete Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteComponent(component.id);
                                    }}
                                    className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                                    title="Delete"
                                  >
                                    <FiTrash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Complete Course Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                saveLessonContent();
                toast.success('Course created successfully!');
                navigate('/admin/dashboard');
              }}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              Complete Course Creation
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Course</h1>
            <p className="text-gray-600">Build your course with our step-by-step wizard</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {currentStep > step.id ? <FiCheck className="w-4 h-4" /> : step.id}
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-gray-900">{step.title}</div>
                      <div className="text-xs text-gray-500">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Step 1: Course Details */}
            {currentStep === 1 && (
              <form onSubmit={handleCourseSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Course Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    value={courseData.title}
                    onChange={(e) => setCourseData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter course title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Description *
                  </label>
                  <textarea
                    value={courseData.description}
                    onChange={(e) => setCourseData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your course"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCourseImageUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {courseData.imageURL && (
                    <div className="mt-2">
                      <img
                        src={courseData.imageURL}
                        alt="Course preview"
                        className="w-32 h-20 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Modules *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={courseData.moduleNumbers}
                    onChange={(e) => setCourseData(prev => ({ ...prev, moduleNumbers: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number of modules"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
                >
                  {loading ? 'Creating Course...' : 'Continue to Modules'}
                </button>
              </form>
            )}

            {/* Step 2: Modules */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Course Modules</h2>
                
                {modules.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">Module {module.order}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Module Title *
                        </label>
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => {
                            const newModules = [...modules];
                            newModules[index].title = e.target.value;
                            setModules(newModules);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter module title"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Lessons *
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={module.lessonNumber}
                          onChange={(e) => {
                            const newModules = [...modules];
                            newModules[index].lessonNumber = parseInt(e.target.value) || 0;
                            setModules(newModules);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Number of lessons"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Module Description *
                      </label>
                      <textarea
                        value={module.description}
                        onChange={(e) => {
                          const newModules = [...modules];
                          newModules[index].description = e.target.value;
                          setModules(newModules);
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe this module"
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleModulesSubmit}
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
                >
                  {loading ? 'Creating Modules...' : 'Continue to Lessons'}
                </button>
              </div>
            )}

            {/* Step 3: Lessons */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Lesson Structure</h2>
                
                {modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">{module.title}</h3>
                    
                    <div className="space-y-3">
                      {Array.from({ length: module.lessonNumber }, (_, lessonIndex) => {
                        const lessonGlobalIndex = modules
                          .slice(0, moduleIndex)
                          .reduce((sum, mod) => sum + mod.lessonNumber, 0) + lessonIndex;
                        
                        return (
                          <div key={lessonIndex}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Lesson {lessonIndex + 1} Title *
                            </label>
                            <input
                              type="text"
                              value={lessons[lessonGlobalIndex]?.title || ''}
                              onChange={(e) => {
                                const newLessons = [...lessons];
                                if (newLessons[lessonGlobalIndex]) {
                                  newLessons[lessonGlobalIndex].title = e.target.value;
                                  setLessons(newLessons);
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter lesson title"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleLessonsSubmit}
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
                >
                  {loading ? 'Creating Lessons...' : 'Continue to Content Editor'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddCourse;
