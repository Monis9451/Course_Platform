import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Header from './Header';
import Footer from './Footer';
import toast from 'react-hot-toast';
import { getCourseWithDetails, updateLessonContent } from '../api/courseAPI';
import DynamicContentRenderer from '../components/DynamicContentRenderer';
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
  FiX,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi';
import { componentLibrary, componentTypes } from '../components/course-components';

// Filter component library to only include allowed components
const allowedComponents = [
  componentTypes.HEADING,
  componentTypes.AUDIO, 
  componentTypes.TEXT,
  componentTypes.IMAGE,
  componentTypes.VIDEO,
  componentTypes.PEACH_BOX,
  componentTypes.EXERCISE_BOX,
  componentTypes.GRAY_BOX,
  componentTypes.LEFT_BORDER_BOX,
  componentTypes.ORDERED_LIST_BOX,
  componentTypes.QUESTION_CARD_BOX,
  componentTypes.CHECKBOX_LIST,
  componentTypes.MARK_COMPLETE_BOX,
  componentTypes.UNORDERED_LIST_BOX,
  componentTypes.TIMELINE,
  componentTypes.DESCRIPTION_WITH_IMAGE_BOX,
  componentTypes.INFO_CARD_PAIR
];

const filteredComponentLibrary = Object.fromEntries(
  Object.entries(componentLibrary).filter(([key]) => allowedComponents.includes(key))
);

const EditCourseContent = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  
  // Pending file uploads - store files temporarily until save
  const [pendingUploads, setPendingUploads] = useState({});
  
  // Editor states
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [componentData, setComponentData] = useState({});
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const courseData = await getCourseWithDetails(courseId);
        setCourse(courseData);
        
        // Extract all lessons from modules and set up lesson navigation
        if (courseData?.modules?.length > 0) {
          const allLessons = [];
          courseData.modules.forEach((module) => {
            if (module.lessons && module.lessons.length > 0) {
              module.lessons.forEach(lesson => {
                allLessons.push({
                  ...lesson,
                  moduleID: module.moduleID,
                  moduleTitle: module.title,
                  content: lesson.content ? (
                    typeof lesson.content === 'string' 
                      ? JSON.parse(lesson.content) 
                      : lesson.content
                  ) : []
                });
              });
            }
          });
          
          if (allLessons.length > 0) {
            // Set up first lesson
            setCurrentLessonIndex(0);
            const firstLessonContent = allLessons[0].content || [];
            
            // Ensure all components have unique IDs
            const contentWithIds = firstLessonContent.map(component => ({
              ...component,
              id: component.id || (Date.now() + Math.random())
            }));
            
            setEditingContent(contentWithIds);
            
            // Store lessons for navigation
            setCourse(prev => ({ ...prev, allLessons }));
          }
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
        toast.error('Failed to fetch course details');
        navigate('/admin/edit-courses');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId, navigate]);

  // Cleanup pending uploads on component unmount or lesson change
  useEffect(() => {
    return () => {
      // Revoke all blob URLs when component unmounts or lesson changes
      Object.keys(pendingUploads).forEach(uploadKey => {
        const [componentId, fieldName] = uploadKey.split('_');
        const component = editingContent.find(comp => comp.id === componentId);
        if (component && component.data && component.data[fieldName]) {
          const url = component.data[fieldName];
          if (typeof url === 'string' && url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
          }
        }
      });
    };
  }, [currentLessonIndex, pendingUploads, editingContent]);

  // Editor functions
  const addComponent = (type) => {
    const componentConfig = filteredComponentLibrary[type];
    if (!componentConfig) return;

    const newComponent = {
      id: Date.now() + Math.random(), // Ensure unique IDs
      type,
      data: { ...componentConfig.defaultData }
    };

    setEditingContent(prev => [...prev, newComponent]);
    setSelectedComponent(newComponent);
    setComponentData(newComponent.data);
  };

  const updateComponent = (componentId, newData) => {
    setEditingContent(prev =>
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
    setEditingContent(prev => prev.filter(comp => comp.id !== componentId));
    
    // Clean up pending uploads for this component
    setPendingUploads(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        if (key.startsWith(`${componentId}_`)) {
          // Revoke the object URL to free memory
          const file = updated[key];
          if (file instanceof File) {
            const component = editingContent.find(comp => comp.id === componentId);
            if (component && component.data) {
              Object.values(component.data).forEach(value => {
                if (typeof value === 'string' && value.startsWith('blob:')) {
                  URL.revokeObjectURL(value);
                }
              });
            }
          }
          delete updated[key];
        }
      });
      return updated;
    });
    
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
    setEditingContent(prev => {
      const newContent = [...prev];
      const [movedItem] = newContent.splice(fromIndex, 1);
      newContent.splice(toIndex, 0, movedItem);
      return newContent;
    });
  };

  const duplicateComponent = (component) => {
    const duplicatedComponent = {
      ...component,
      id: Date.now() + Math.random(),
      data: { ...component.data }
    };
    
    const componentIndex = editingContent.findIndex(c => c.id === component.id);
    setEditingContent(prev => {
      const newContent = [...prev];
      newContent.splice(componentIndex + 1, 0, duplicatedComponent);
      return newContent;
    });
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
        const errorData = await response.json();
        console.error('Upload error:', errorData);
        throw new Error('Failed to upload file');
      }

      const result = await response.json();
      console.log('Upload response:', result);
      
      // Return the URL from the response
      return result.url;

    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
      return null;
    } finally {
      setUploadingFile(false);
    }
  };

  // Handle component data changes
  const handleComponentDataChange = (field, value) => {
    const newData = { ...componentData, [field]: value };
    setComponentData(newData);
    
    if (selectedComponent) {
      updateComponent(selectedComponent.id, newData);
    }
  };

  // Handle file upload for components (now stores temporarily)
  const handleComponentFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a local URL for preview
    const localUrl = URL.createObjectURL(file);
    
    // Store the file for later upload
    const uploadKey = `${selectedComponent.id}_${field}`;
    setPendingUploads(prev => ({
      ...prev,
      [uploadKey]: file
    }));

    // Update component data with local URL for preview
    handleComponentDataChange(field, localUrl);
    
    toast.success('Image selected! It will be uploaded when you save the lesson.');
  };

  // Navigate between lessons
  const goToNextLesson = () => {
    if (course?.allLessons && currentLessonIndex < course.allLessons.length - 1) {
      const nextIndex = currentLessonIndex + 1;
      setCurrentLessonIndex(nextIndex);
      const nextLessonContent = course.allLessons[nextIndex].content || [];
      
      // Ensure all components have unique IDs
      const contentWithIds = nextLessonContent.map(component => ({
        ...component,
        id: component.id || (Date.now() + Math.random())
      }));
      
      setEditingContent(contentWithIds);
      setSelectedComponent(null);
      setComponentData({});
    }
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      const prevIndex = currentLessonIndex - 1;
      setCurrentLessonIndex(prevIndex);
      const prevLessonContent = course.allLessons[prevIndex].content || [];
      
      // Ensure all components have unique IDs
      const contentWithIds = prevLessonContent.map(component => ({
        ...component,
        id: component.id || (Date.now() + Math.random())
      }));
      
      setEditingContent(contentWithIds);
      setSelectedComponent(null);
      setComponentData({});
    }
  };

  // Upload all pending files and update content URLs
  const uploadPendingFiles = async (content) => {
    if (Object.keys(pendingUploads).length === 0) {
      return content; // No uploads needed
    }

    const updatedContent = [...content];
    setUploadingFile(true);

    try {
      // Upload all files sequentially to avoid race conditions
      for (const [uploadKey, file] of Object.entries(pendingUploads)) {
        const [componentId, fieldName] = uploadKey.split('_');
        
        try {
          const cloudinaryUrl = await handleFileUpload(file);
          if (cloudinaryUrl) {
            // Find and update the component in content
            // Handle both string and numeric IDs
            const componentIndex = updatedContent.findIndex(comp => 
              comp.id == componentId // Use == for loose comparison to handle type differences
            );
            
            if (componentIndex !== -1) {
              updatedContent[componentIndex] = {
                ...updatedContent[componentIndex],
                data: {
                  ...updatedContent[componentIndex].data,
                  [fieldName]: cloudinaryUrl
                }
              };
            }
          }
        } catch (error) {
          console.error(`Failed to upload file for component ${componentId}:`, error);
          toast.error(`Failed to upload ${fieldName} for component`);
        }
      }

      // Clear all successful uploads
      setPendingUploads({});
      toast.success(`Files uploaded successfully!`);
    } catch (error) {
      console.error('Error in upload process:', error);
      toast.error('Some files failed to upload');
    } finally {
      setUploadingFile(false);
    }

    return updatedContent;
  };

  const handleSaveContent = async () => {
    if (!course?.allLessons?.[currentLessonIndex]) {
      toast.error('No lesson selected');
      return;
    }

    const currentLesson = course.allLessons[currentLessonIndex];

    try {
      setSaving(true);
      
      // Upload pending files first
      const contentWithUploadedFiles = await uploadPendingFiles(editingContent);
      
      const contentString = JSON.stringify(contentWithUploadedFiles);
      await updateLessonContent(currentLesson.lessonID, contentString, authToken);

      // Update local state with uploaded URLs
      setCourse(prevCourse => {
        const updatedLessons = [...prevCourse.allLessons];
        updatedLessons[currentLessonIndex] = {
          ...updatedLessons[currentLessonIndex],
          content: contentWithUploadedFiles
        };
        return { ...prevCourse, allLessons: updatedLessons };
      });
      
      // Update editing content with uploaded URLs
      setEditingContent(contentWithUploadedFiles);

      toast.success('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  // Render component form based on type
  const renderComponentForm = () => {
    if (!selectedComponent) {
      return (
        <div className="text-center text-gray-500 py-6">
          <FiEdit3 className="mx-auto w-8 h-8 mb-2 text-gray-400" />
          <p className="text-sm">Select a component to edit its properties</p>
        </div>
      );
    }

    const { type } = selectedComponent;

    switch (type) {
      case componentTypes.HEADING:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Heading title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Heading Text</label>
              <input
                type="text"
                value={componentData.content || ''}
                onChange={(e) => handleComponentDataChange('content', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your heading text..."
              />
            </div>
          </div>
        );

      case componentTypes.TEXT:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Content</label>
              <textarea
                value={componentData.content || ''}
                onChange={(e) => handleComponentDataChange('content', e.target.value)}
                rows={4}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your text content..."
              />
            </div>
          </div>
        );

      case componentTypes.VIDEO:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Video title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Upload Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleComponentFileUpload(e, 'videoUrl')}
                className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700"
                disabled={uploadingFile}
              />
              {uploadingFile && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Description</label>
              <textarea
                value={componentData.description || ''}
                onChange={(e) => handleComponentDataChange('description', e.target.value)}
                rows={2}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Video description..."
              />
            </div>
          </div>
        );

      case componentTypes.IMAGE:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Image title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleComponentFileUpload(e, 'imageUrl')}
                className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700"
                disabled={uploadingFile}
              />
              {uploadingFile && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Alt Text</label>
              <input
                type="text"
                value={componentData.alt || ''}
                onChange={(e) => handleComponentDataChange('alt', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Alternative text"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Caption</label>
              <input
                type="text"
                value={componentData.caption || ''}
                onChange={(e) => handleComponentDataChange('caption', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Image caption"
              />
            </div>
          </div>
        );

      case componentTypes.AUDIO:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Audio title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Upload Audio</label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleComponentFileUpload(e, 'audioUrl')}
                className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700"
                disabled={uploadingFile}
              />
              {uploadingFile && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Description</label>
              <textarea
                value={componentData.description || ''}
                onChange={(e) => handleComponentDataChange('description', e.target.value)}
                rows={2}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Audio description..."
              />
            </div>
          </div>
        );

      case componentTypes.PEACH_BOX:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Section Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Box Title</label>
              <input
                type="text"
                value={componentData.boxTitle || ''}
                onChange={(e) => handleComponentDataChange('boxTitle', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Title inside the peach box"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Paragraph</label>
              <textarea
                value={componentData.paragraph || ''}
                onChange={(e) => handleComponentDataChange('paragraph', e.target.value)}
                rows={3}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Main paragraph content..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">List Items (Optional)</label>
              <div className="space-y-2">
                {(componentData.listItems || []).map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newListItems = [...(componentData.listItems || [])];
                        newListItems[index] = e.target.value;
                        handleComponentDataChange('listItems', newListItems);
                      }}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder={`List item ${index + 1}...`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newListItems = (componentData.listItems || []).filter((_, i) => i !== index);
                        handleComponentDataChange('listItems', newListItems);
                      }}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newListItems = [...(componentData.listItems || []), ''];
                    handleComponentDataChange('listItems', newListItems);
                  }}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add List Item
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">SVG Icon (Optional)</label>
              <select
                value={componentData.svgType || 'none'}
                onChange={(e) => handleComponentDataChange('svgType', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="none">🚫 None (No Icon)</option>
                <option value="lightbulb">💡 Light Bulb</option>
                <option value="heart">❤️ Heart</option>
                <option value="brain">🧠 Brain</option>
                <option value="star">⭐ Star</option>
                <option value="shield">🛡️ Shield</option>
                <option value="target">🎯 Target</option>
                <option value="check">✅ Check</option>
                <option value="exclamation">⚠️ Exclamation</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Italic Lines</label>
              <input
                type="text"
                value={componentData.italicLines || ''}
                onChange={(e) => handleComponentDataChange('italicLines', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ending lines in italic"
              />
            </div>
          </div>
        );

      case componentTypes.EXERCISE_BOX:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Section Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Situation</label>
              <textarea
                value={componentData.situation || ''}
                onChange={(e) => handleComponentDataChange('situation', e.target.value)}
                rows={2}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Describe the situation for the exercise..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-700">Questions</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {(componentData.questions || []).map((q, index) => (
                  <div key={index} className="p-2 border border-gray-200 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-600">Question {index + 1}</span>
                      {componentData.questions && componentData.questions.length > 1 && (
                        <button
                          onClick={() => {
                            const newQuestions = componentData.questions.filter((_, i) => i !== index);
                            handleComponentDataChange('questions', newQuestions);
                          }}
                          className="text-red-500 hover:text-red-700 text-xs px-1"
                          type="button"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={q.question || ''}
                      onChange={(e) => {
                        const newQuestions = [...(componentData.questions || [])];
                        newQuestions[index] = { ...newQuestions[index], question: e.target.value };
                        handleComponentDataChange('questions', newQuestions);
                      }}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded mb-1"
                      placeholder="Enter question..."
                    />
                    <input
                      type="text"
                      value={q.placeholder || ''}
                      onChange={(e) => {
                        const newQuestions = [...(componentData.questions || [])];
                        newQuestions[index] = { ...newQuestions[index], placeholder: e.target.value };
                        handleComponentDataChange('questions', newQuestions);
                      }}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                      placeholder="Placeholder text for answer..."
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newQuestions = [...(componentData.questions || []), { question: '', placeholder: '' }];
                    handleComponentDataChange('questions', newQuestions);
                  }}
                  className="w-full py-1 border border-dashed border-gray-400 text-gray-600 text-xs rounded hover:bg-gray-50"
                  type="button"
                >
                  + Add Question
                </button>
              </div>
            </div>
          </div>
        );

      case componentTypes.GRAY_BOX:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Section Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Box Title</label>
              <input
                type="text"
                value={componentData.boxTitle || ''}
                onChange={(e) => handleComponentDataChange('boxTitle', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Title inside the gray box"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Paragraph</label>
              <textarea
                value={componentData.paragraph || ''}
                onChange={(e) => handleComponentDataChange('paragraph', e.target.value)}
                rows={3}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Main paragraph content..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Italic Lines</label>
              <input
                type="text"
                value={componentData.italicLines || ''}
                onChange={(e) => handleComponentDataChange('italicLines', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ending lines in italic"
              />
            </div>
          </div>
        );

      case componentTypes.LEFT_BORDER_BOX:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Section Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Box Title</label>
              <input
                type="text"
                value={componentData.boxTitle || ''}
                onChange={(e) => handleComponentDataChange('boxTitle', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Bold title inside the box"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Paragraph</label>
              <textarea
                value={componentData.paragraph || ''}
                onChange={(e) => handleComponentDataChange('paragraph', e.target.value)}
                rows={3}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Main paragraph content..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Quote</label>
              <input
                type="text"
                value={componentData.quote || ''}
                onChange={(e) => handleComponentDataChange('quote', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Italic quote text"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">List Items (Optional)</label>
              <div className="space-y-2">
                {(componentData.listItems || []).map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newListItems = [...(componentData.listItems || [])];
                        newListItems[index] = e.target.value;
                        handleComponentDataChange('listItems', newListItems);
                      }}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder={`List item ${index + 1}...`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newListItems = (componentData.listItems || []).filter((_, i) => i !== index);
                        handleComponentDataChange('listItems', newListItems);
                      }}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newListItems = [...(componentData.listItems || []), ''];
                    handleComponentDataChange('listItems', newListItems);
                  }}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add List Item
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Footer Text</label>
              <input
                type="text"
                value={componentData.footerText || ''}
                onChange={(e) => handleComponentDataChange('footerText', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Small footer text"
              />
            </div>
          </div>
        );

      case componentTypes.ORDERED_LIST_BOX:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Section Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Box Title</label>
              <input
                type="text"
                value={componentData.boxTitle || ''}
                onChange={(e) => handleComponentDataChange('boxTitle', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Title inside the box"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Description</label>
              <textarea
                value={componentData.description || ''}
                onChange={(e) => handleComponentDataChange('description', e.target.value)}
                rows={2}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Description text..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-700">Points (Countdown Order)</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {(componentData.points || []).map((point, index) => (
                  <div key={index} className="p-2 border border-gray-200 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-600">
                        Point #{(componentData.points || []).length - index}
                      </span>
                      {componentData.points && componentData.points.length > 1 && (
                        <button
                          onClick={() => {
                            const newPoints = componentData.points.filter((_, i) => i !== index);
                            handleComponentDataChange('points', newPoints);
                          }}
                          className="text-red-500 hover:text-red-700 text-xs px-1"
                          type="button"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={point.text || ''}
                      onChange={(e) => {
                        const newPoints = [...(componentData.points || [])];
                        newPoints[index] = { ...newPoints[index], text: e.target.value };
                        handleComponentDataChange('points', newPoints);
                      }}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                      placeholder="Enter point text..."
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newPoints = [...(componentData.points || []), { text: '' }];
                    handleComponentDataChange('points', newPoints);
                  }}
                  className="w-full py-1 border border-dashed border-gray-400 text-gray-600 text-xs rounded hover:bg-gray-50"
                  type="button"
                >
                  + Add Point
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Footer Text</label>
              <input
                type="text"
                value={componentData.footerText || ''}
                onChange={(e) => handleComponentDataChange('footerText', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Italic footer text"
              />
            </div>
          </div>
        );

      case componentTypes.QUESTION_CARD_BOX:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Section Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-700">Question Cards</label>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {(componentData.questions || []).map((question, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-600">Card {index + 1}</span>
                      {componentData.questions && componentData.questions.length > 1 && (
                        <button
                          onClick={() => {
                            const newQuestions = componentData.questions.filter((_, i) => i !== index);
                            handleComponentDataChange('questions', newQuestions);
                          }}
                          className="text-red-500 hover:text-red-700 text-xs px-1"
                          type="button"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={question.questionTitle || ''}
                        onChange={(e) => {
                          const newQuestions = [...(componentData.questions || [])];
                          newQuestions[index] = { ...newQuestions[index], questionTitle: e.target.value };
                          handleComponentDataChange('questions', newQuestions);
                        }}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                        placeholder="Question title..."
                      />
                      
                      <textarea
                        value={question.questionText || ''}
                        onChange={(e) => {
                          const newQuestions = [...(componentData.questions || [])];
                          newQuestions[index] = { ...newQuestions[index], questionText: e.target.value };
                          handleComponentDataChange('questions', newQuestions);
                        }}
                        rows={2}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                        placeholder="Question text..."
                      />
                      
                      <input
                        type="text"
                        value={question.placeholder || ''}
                        onChange={(e) => {
                          const newQuestions = [...(componentData.questions || [])];
                          newQuestions[index] = { ...newQuestions[index], placeholder: e.target.value };
                          handleComponentDataChange('questions', newQuestions);
                        }}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                        placeholder="Textarea placeholder..."
                      />
                      
                      <input
                        type="text"
                        value={question.consideration || ''}
                        onChange={(e) => {
                          const newQuestions = [...(componentData.questions || [])];
                          newQuestions[index] = { ...newQuestions[index], consideration: e.target.value };
                          handleComponentDataChange('questions', newQuestions);
                        }}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                        placeholder="Consideration/suggestion text..."
                      />
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => {
                    const newQuestions = [...(componentData.questions || []), { 
                      questionTitle: '', 
                      questionText: '', 
                      placeholder: '', 
                      consideration: '' 
                    }];
                    handleComponentDataChange('questions', newQuestions);
                  }}
                  className="w-full py-2 border border-dashed border-gray-400 text-gray-600 text-xs rounded hover:bg-gray-50"
                  type="button"
                >
                  + Add Question Card
                </button>
              </div>
            </div>
          </div>
        );

      case componentTypes.CHECKBOX_LIST:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Section Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-700">Checkboxes</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {(componentData.checkboxes || []).map((checkbox, index) => (
                  <div key={index} className="p-2 border border-gray-200 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-600">Checkbox {index + 1}</span>
                      {componentData.checkboxes && componentData.checkboxes.length > 1 && (
                        <button
                          onClick={() => {
                            const newCheckboxes = componentData.checkboxes.filter((_, i) => i !== index);
                            handleComponentDataChange('checkboxes', newCheckboxes);
                          }}
                          className="text-red-500 hover:text-red-700 text-xs px-1"
                          type="button"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={checkbox.checked || false}
                        onChange={(e) => {
                          const newCheckboxes = [...(componentData.checkboxes || [])];
                          newCheckboxes[index] = { ...newCheckboxes[index], checked: e.target.checked };
                          handleComponentDataChange('checkboxes', newCheckboxes);
                        }}
                        className="h-3 w-3 accent-[#bd6334]"
                      />
                      <input
                        type="text"
                        value={checkbox.text || ''}
                        onChange={(e) => {
                          const newCheckboxes = [...(componentData.checkboxes || [])];
                          newCheckboxes[index] = { ...newCheckboxes[index], text: e.target.value };
                          handleComponentDataChange('checkboxes', newCheckboxes);
                        }}
                        className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                        placeholder="Checkbox text..."
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newCheckboxes = [...(componentData.checkboxes || []), { text: '', checked: false }];
                    handleComponentDataChange('checkboxes', newCheckboxes);
                  }}
                  className="w-full py-1 border border-dashed border-gray-400 text-gray-600 text-xs rounded hover:bg-gray-50"
                  type="button"
                >
                  + Add Checkbox
                </button>
              </div>
            </div>
          </div>
        );

      case componentTypes.MARK_COMPLETE_BOX:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Section Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Box Title</label>
              <input
                type="text"
                value={componentData.boxTitle || ''}
                onChange={(e) => handleComponentDataChange('boxTitle', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Box title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Description</label>
              <textarea
                value={componentData.description || ''}
                onChange={(e) => handleComponentDataChange('description', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                rows="2"
                placeholder="Description text"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Question</label>
              <input
                type="text"
                value={componentData.question || ''}
                onChange={(e) => handleComponentDataChange('question', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Question text"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-700">Checkboxes</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {(componentData.checkboxes || []).map((checkbox, index) => (
                  <div key={index} className="p-2 border border-gray-200 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-600">Checkbox {index + 1}</span>
                      {componentData.checkboxes && componentData.checkboxes.length > 1 && (
                        <button
                          onClick={() => {
                            const newCheckboxes = componentData.checkboxes.filter((_, i) => i !== index);
                            handleComponentDataChange('checkboxes', newCheckboxes);
                          }}
                          className="text-red-500 hover:text-red-700 text-xs px-1"
                          type="button"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={checkbox.checked || false}
                        onChange={(e) => {
                          const newCheckboxes = [...(componentData.checkboxes || [])];
                          newCheckboxes[index] = { ...newCheckboxes[index], checked: e.target.checked };
                          handleComponentDataChange('checkboxes', newCheckboxes);
                        }}
                        className="h-3 w-3 accent-[#bd6334]"
                      />
                      <input
                        type="text"
                        value={checkbox.text || ''}
                        onChange={(e) => {
                          const newCheckboxes = [...(componentData.checkboxes || [])];
                          newCheckboxes[index] = { ...newCheckboxes[index], text: e.target.value };
                          handleComponentDataChange('checkboxes', newCheckboxes);
                        }}
                        className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                        placeholder="Checkbox text..."
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newCheckboxes = [...(componentData.checkboxes || []), { text: '', checked: false }];
                    handleComponentDataChange('checkboxes', newCheckboxes);
                  }}
                  className="w-full py-1 border border-dashed border-gray-400 text-gray-600 text-xs rounded hover:bg-gray-50"
                  type="button"
                >
                  + Add Checkbox
                </button>
              </div>
            </div>
          </div>
        );

      case componentTypes.UNORDERED_LIST_BOX:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Section Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Section Heading</label>
              <input
                type="text"
                value={componentData.sectionTitle || ''}
                onChange={(e) => handleComponentDataChange('sectionTitle', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Section heading"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Description</label>
              <textarea
                value={componentData.description || ''}
                onChange={(e) => handleComponentDataChange('description', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                rows="2"
                placeholder="Description text"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-700">List Boxes</label>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {(componentData.listBoxes || []).map((listBox, boxIndex) => (
                  <div key={boxIndex} className="p-3 border border-gray-200 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-600">List Box {boxIndex + 1}</span>
                      {componentData.listBoxes && componentData.listBoxes.length > 1 && (
                        <button
                          onClick={() => {
                            const newListBoxes = componentData.listBoxes.filter((_, i) => i !== boxIndex);
                            handleComponentDataChange('listBoxes', newListBoxes);
                          }}
                          className="text-red-500 hover:text-red-700 text-xs px-1"
                          type="button"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        value={listBox.title || ''}
                        onChange={(e) => {
                          const newListBoxes = [...(componentData.listBoxes || [])];
                          newListBoxes[boxIndex] = { ...newListBoxes[boxIndex], title: e.target.value };
                          handleComponentDataChange('listBoxes', newListBoxes);
                        }}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                        placeholder="List box title..."
                      />
                    </div>
                    <div className="space-y-1">
                      {(listBox.items || []).map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={item || ''}
                            onChange={(e) => {
                              const newListBoxes = [...(componentData.listBoxes || [])];
                              newListBoxes[boxIndex].items[itemIndex] = e.target.value;
                              handleComponentDataChange('listBoxes', newListBoxes);
                            }}
                            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                            placeholder="List item..."
                          />
                          {listBox.items.length > 1 && (
                            <button
                              onClick={() => {
                                const newListBoxes = [...(componentData.listBoxes || [])];
                                newListBoxes[boxIndex].items = newListBoxes[boxIndex].items.filter((_, i) => i !== itemIndex);
                                handleComponentDataChange('listBoxes', newListBoxes);
                              }}
                              className="text-red-500 hover:text-red-700 text-xs px-1"
                              type="button"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newListBoxes = [...(componentData.listBoxes || [])];
                          newListBoxes[boxIndex].items = [...(newListBoxes[boxIndex].items || []), ''];
                          handleComponentDataChange('listBoxes', newListBoxes);
                        }}
                        className="w-full py-1 border border-dashed border-gray-400 text-gray-600 text-xs rounded hover:bg-gray-50"
                        type="button"
                      >
                        + Add Item
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newListBoxes = [...(componentData.listBoxes || []), { title: '', items: [''] }];
                    handleComponentDataChange('listBoxes', newListBoxes);
                  }}
                  className="w-full py-2 border border-dashed border-gray-400 text-gray-600 text-xs rounded hover:bg-gray-50"
                  type="button"
                >
                  + Add List Box
                </button>
              </div>
            </div>
          </div>
        );

      case componentTypes.TIMELINE:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Section Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Timeline Title</label>
              <input
                type="text"
                value={componentData.timelineTitle || ''}
                onChange={(e) => handleComponentDataChange('timelineTitle', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Timeline heading"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-700">Timeline Stages</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {(componentData.stages || []).map((stage, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={stage || ''}
                      onChange={(e) => {
                        const newStages = [...(componentData.stages || [])];
                        newStages[index] = e.target.value;
                        handleComponentDataChange('stages', newStages);
                      }}
                      className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                      placeholder={`Stage ${index + 1}`}
                    />
                    {componentData.stages && componentData.stages.length > 2 && (
                      <button
                        onClick={() => {
                          const newStages = componentData.stages.filter((_, i) => i !== index);
                          handleComponentDataChange('stages', newStages);
                        }}
                        className="text-red-500 hover:text-red-700 text-xs px-1"
                        type="button"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newStages = [...(componentData.stages || []), 'New Stage'];
                    handleComponentDataChange('stages', newStages);
                  }}
                  className="w-full py-1 border border-dashed border-gray-400 text-gray-600 text-xs rounded hover:bg-gray-50"
                  type="button"
                >
                  + Add Stage
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-700">Event Slots</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {(componentData.events || []).map((event, index) => (
                  <div key={index} className="p-2 border border-gray-200 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-600">Event Slot {index + 1}</span>
                      {componentData.events && componentData.events.length > 1 && (
                        <button
                          onClick={() => {
                            const newEvents = componentData.events.filter((_, i) => i !== index);
                            handleComponentDataChange('events', newEvents);
                          }}
                          className="text-red-500 hover:text-red-700 text-xs px-1"
                          type="button"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={event.event || ''}
                        onChange={(e) => {
                          const newEvents = [...(componentData.events || [])];
                          newEvents[index] = { ...newEvents[index], event: e.target.value };
                          handleComponentDataChange('events', newEvents);
                        }}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                        placeholder="Event description (optional for students)"
                      />
                      <input
                        type="text"
                        value={event.impact || ''}
                        onChange={(e) => {
                          const newEvents = [...(componentData.events || [])];
                          newEvents[index] = { ...newEvents[index], impact: e.target.value };
                          handleComponentDataChange('events', newEvents);
                        }}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                        placeholder="Impact description (optional for students)"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newEvents = [...(componentData.events || []), { event: '', impact: '', userCanEdit: true }];
                    handleComponentDataChange('events', newEvents);
                  }}
                  className="w-full py-1 border border-dashed border-gray-400 text-gray-600 text-xs rounded hover:bg-gray-50"
                  type="button"
                >
                  + Add Event Slot
                </button>
              </div>
            </div>
            <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
              <strong>Note:</strong> Students will be able to fill in the event and impact fields when taking the course.
            </div>
          </div>
        );

      case componentTypes.DESCRIPTION_WITH_IMAGE_BOX:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Section Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Box Title</label>
              <input
                type="text"
                value={componentData.boxTitle || ''}
                onChange={(e) => handleComponentDataChange('boxTitle', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Box title (e.g., Your Body Map)"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleComponentFileUpload(e, 'imageUrl')}
                className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700"
                disabled={uploadingFile}
              />
              {uploadingFile && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Alt Text</label>
              <input
                type="text"
                value={componentData.alt || ''}
                onChange={(e) => handleComponentDataChange('alt', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Alternative text for image"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Description</label>
              <input
                type="text"
                value={componentData.description || ''}
                onChange={(e) => handleComponentDataChange('description', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Description text below image"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Term Label</label>
              <input
                type="text"
                value={componentData.termLabel || ''}
                onChange={(e) => handleComponentDataChange('termLabel', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Term label (e.g., Term:)"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Term Placeholder</label>
              <input
                type="text"
                value={componentData.termPlaceholder || ''}
                onChange={(e) => handleComponentDataChange('termPlaceholder', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Placeholder text for textarea"
              />
            </div>
          </div>
        );

      case componentTypes.INFO_CARD_PAIR:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Section Title</label>
              <input
                type="text"
                value={componentData.title || ''}
                onChange={(e) => handleComponentDataChange('title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Section title"
              />
            </div>
            
            {/* Card */}
            <div className="p-3 border border-gray-200 rounded bg-gray-50">
              <h4 className="text-sm font-medium mb-2 text-gray-800">Card</h4>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700">Card Title</label>
                  <input
                    type="text"
                    value={componentData.card1Title || ''}
                    onChange={(e) => handleComponentDataChange('card1Title', e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                    placeholder="Card title"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700">Icon</label>
                  <select
                    value={componentData.card1Icon || 'heart'}
                    onChange={(e) => handleComponentDataChange('card1Icon', e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                  >
                    <option value="heart">Heart</option>
                    <option value="lightbulb">Light Bulb</option>
                    <option value="star">Star</option>
                    <option value="info">Info</option>
                    <option value="check">Check</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700">Content</label>
                  <textarea
                    value={componentData.card1Content || ''}
                    onChange={(e) => handleComponentDataChange('card1Content', e.target.value)}
                    rows={3}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                    placeholder="Content for card (use line breaks for paragraphs)"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-xs text-gray-500">Unknown component type</div>;
    }
  };  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading course content...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
            <button
              onClick={() => navigate('/admin/edit-courses')}
              className="bg-primary text-white px-6 py-3 rounded-lg"
            >
              Back to Courses List
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Course Content</h1>
          <p className="text-gray-600">Edit lesson content for: {course.title}</p>
        </div>

        {/* Lesson Navigation */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                {course.allLessons?.[currentLessonIndex]?.title} 
                <span className="text-sm text-gray-500 ml-2">
                  ({course.allLessons?.[currentLessonIndex]?.moduleTitle})
                </span>
              </h2>
              <p className="text-sm text-gray-600">
                Lesson {currentLessonIndex + 1} of {course.allLessons?.length || 0}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigate('/admin/edit-courses')}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back to Courses</span>
              </button>
              <button
                onClick={goToPreviousLesson}
                disabled={currentLessonIndex === 0}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              <button
                onClick={handleSaveContent}
                disabled={saving}
                className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <FiSave className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save'}</span>
              </button>
              <button
                onClick={goToNextLesson}
                disabled={!course.allLessons || currentLessonIndex === course.allLessons.length - 1}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Comprehensive Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md sticky top-4 max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col">
              
              {/* Sidebar Header */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Editor Toolkit</h3>
                <p className="text-sm text-gray-600">Drag & drop or click to add components</p>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* Component Library */}
                <div className="p-4 border-b border-gray-200">
                  <h4 className="text-md font-semibold mb-3 text-gray-800">Add Components</h4>
                  <div className="max-h-80 overflow-y-auto pr-2">
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(filteredComponentLibrary).map(([type, config]) => (
                        <button
                          key={type}
                          onClick={() => addComponent(type)}
                          className="flex items-center p-3 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group w-full"
                        >
                          <span className="text-sm font-medium text-gray-700 text-left">{config.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Upload */}
                <div className="p-4 border-b border-gray-200">
                  <h4 className="text-md font-semibold mb-3 text-gray-800">Quick Upload</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 hover:border-blue-400 transition-colors">
                    <div className="text-center">
                      <FiUpload className="mx-auto w-6 h-6 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-600 mb-2">Drop files or click to upload</p>
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
                              id: Date.now() + Math.random(),
                              type: componentType,
                              data: {
                                ...filteredComponentLibrary[componentType].defaultData,
                                title: file.name.split('.')[0],
                                [fieldName]: url
                              }
                            };
                            setEditingContent(prev => [...prev, newComponent]);
                            toast.success('File uploaded and component added!');
                          }
                        }}
                        className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Structure */}
                <div className="p-4 border-b border-gray-200">
                  <h4 className="text-md font-semibold mb-3 text-gray-800">Content Structure</h4>
                  <div className="max-h-60 overflow-y-auto pr-2">
                    <div className="space-y-2">
                    {editingContent.length === 0 ? (
                      <p className="text-xs text-gray-500 italic">No components added yet</p>
                    ) : (
                      editingContent.map((component) => {
                        const config = filteredComponentLibrary[component.type];
                        return (
                          <div
                            key={component.id}
                            onClick={() => selectComponent(component)}
                            className={`flex items-center justify-between p-2 rounded border cursor-pointer transition-all ${
                              selectedComponent?.id === component.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <div>
                                <p className="text-xs font-medium truncate max-w-32">
                                  {component.data.title || config?.name}
                                </p>
                                <p className="text-xs text-gray-500">{config?.name}</p>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const currentIndex = editingContent.findIndex(c => c.id === component.id);
                                  if (currentIndex > 0) {
                                    moveComponent(currentIndex, currentIndex - 1);
                                  }
                                }}
                                disabled={editingContent.findIndex(c => c.id === component.id) === 0}
                                className="p-1 hover:bg-blue-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Move Up"
                              >
                                <FiArrowUp className="w-3 h-3 text-blue-600" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const currentIndex = editingContent.findIndex(c => c.id === component.id);
                                  if (currentIndex < editingContent.length - 1) {
                                    moveComponent(currentIndex, currentIndex + 1);
                                  }
                                }}
                                disabled={editingContent.findIndex(c => c.id === component.id) === editingContent.length - 1}
                                className="p-1 hover:bg-blue-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Move Down"
                              >
                                <FiArrowDown className="w-3 h-3 text-blue-600" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  duplicateComponent(component);
                                }}
                                className="p-1 hover:bg-green-100 rounded"
                                title="Duplicate"
                              >
                                <FiPlus className="w-3 h-3 text-green-600" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteComponent(component.id);
                                }}
                                className="p-1 hover:bg-red-100 rounded"
                                title="Delete"
                              >
                                <FiTrash2 className="w-3 h-3 text-red-600" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  </div>
                </div>

                {/* Component Properties */}
                <div className="p-4">
                  <h4 className="text-md font-semibold mb-3 text-gray-800">Properties</h4>
                  <div className="space-y-3">
                    {renderComponentForm()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Preview Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md min-h-[600px]">
              {/* Preview Header */}
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Lesson Preview</h3>
                    <p className="text-sm text-gray-600">This is how your lesson will appear to students</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Preview Mode</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Content Preview */}
              <div className="p-6">
                {editingContent.length === 0 ? (
                  <div className="text-center text-gray-500 py-20">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-xl font-medium mb-2">Your lesson is empty</h3>
                    <p className="text-gray-400">Start adding components from the sidebar to build your lesson content</p>
                    <div className="mt-6 flex justify-center">
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <FiArrowLeft className="w-4 h-4" />
                        <span>Use the sidebar to add components</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {(() => {
                      const components = [];
                      let i = 0;
                      
                      while (i < editingContent.length) {
                        const component = editingContent[i];
                        const ComponentRenderer = filteredComponentLibrary[component.type]?.component;
                        
                        if (!ComponentRenderer) {
                          components.push(
                            <div key={component.id} className="p-4 border border-red-300 bg-red-50 rounded-lg">
                              <p className="text-red-600 text-sm">Unknown component type: {component.type}</p>
                            </div>
                          );
                          i++;
                          continue;
                        }
                        
                        // Check if this is a LEFT_BORDER_BOX or INFO_CARD_PAIR (always treat as half-width)
                        if (component.type === componentTypes.LEFT_BORDER_BOX || component.type === componentTypes.INFO_CARD_PAIR) {
                          // Look for next component to pair with
                          const nextComponent = editingContent[i + 1];
                          const NextComponentRenderer = (nextComponent?.type === componentTypes.LEFT_BORDER_BOX || nextComponent?.type === componentTypes.INFO_CARD_PAIR) ? 
                            filteredComponentLibrary[nextComponent.type]?.component : null;
                          
                          if (NextComponentRenderer) {
                            // Render two half-width components in a row
                            components.push(
                              <div key={`pair-${component.id}-${nextComponent.id}`} className="flex flex-col md:flex-row gap-6">
                                <div
                                  className={`flex-1 transition-all duration-200 cursor-pointer ${
                                    selectedComponent?.id === component.id 
                                      ? 'ring-2 ring-blue-400 ring-opacity-50 rounded-lg' 
                                      : ''
                                  }`}
                                  onClick={() => selectComponent(component)}
                                >
                                  <ComponentRenderer 
                                    data={component.data} 
                                    isHalfWidth={true}
                                  />
                                </div>
                                <div
                                  className={`flex-1 transition-all duration-200 cursor-pointer ${
                                    selectedComponent?.id === nextComponent.id 
                                      ? 'ring-2 ring-blue-400 ring-opacity-50 rounded-lg' 
                                      : ''
                                  }`}
                                  onClick={() => selectComponent(nextComponent)}
                                >
                                  <NextComponentRenderer 
                                    data={nextComponent.data} 
                                    isHalfWidth={true}
                                  />
                                </div>
                              </div>
                            );
                            i += 2; // Skip next component as it's already rendered
                          } else {
                            // Render single half-width component taking half space, other half remains empty
                            components.push(
                              <div key={component.id} className="flex flex-col md:flex-row gap-6">
                                <div
                                  className={`flex-1 transition-all duration-200 cursor-pointer ${
                                    selectedComponent?.id === component.id 
                                      ? 'ring-2 ring-blue-400 ring-opacity-50 rounded-lg' 
                                      : ''
                                  }`}
                                  onClick={() => selectComponent(component)}
                                >
                                  <ComponentRenderer 
                                    data={component.data} 
                                    isHalfWidth={true}
                                  />
                                </div>
                                <div className="flex-1"></div>
                              </div>
                            );
                            i++;
                          }
                        } else {
                          // Render full-width component normally
                          components.push(
                            <div
                              key={component.id}
                              className={`transition-all duration-200 cursor-pointer ${
                                selectedComponent?.id === component.id 
                                  ? 'ring-2 ring-blue-400 ring-opacity-50 rounded-lg' 
                                  : ''
                              }`}
                              onClick={() => selectComponent(component)}
                            >
                              <ComponentRenderer data={component.data} />
                            </div>
                          );
                          i++;
                        }
                      }
                      
                      return components;
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditCourseContent;
