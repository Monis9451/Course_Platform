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
  FiX,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi';
import { HiSpeakerWave } from "react-icons/hi2";
import { FaFileAlt } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
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

const AddCourse = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();

  // Icon options for lessons
  const iconOptions = [
    { 
      value: 'page', 
      label: 'Page/Document',
      icon: <FaFileAlt className="w-4 h-4" />
    },
    { 
      value: 'speaker', 
      label: 'Audio/Speaker',
      icon: <HiSpeakerWave className="w-4 h-4" />
    },
    { 
      value: 'checkbox', 
      label: 'Exercise/Practice',
      icon: <BsPencilFill className="w-4 h-4" />
    }
  ];

  // Wizard states
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    imageURL: '',
    moduleNumbers: 0
  });
  const [selectedThumbnailFile, setSelectedThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [courseId, setCourseId] = useState(null);

  // Validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Editor states
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentLessonContent, setCurrentLessonContent] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [componentData, setComponentData] = useState({});

  // Loading states
  const [loading, setLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  // Pending file uploads - store files temporarily until save
  const [pendingUploads, setPendingUploads] = useState({});

  // Incomplete course detection
  const [incompleteCourses, setIncompleteCourses] = useState([]);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [checkingIncomplete, setCheckingIncomplete] = useState(true);
  const [deletingCourseId, setDeletingCourseId] = useState(null);

  const steps = [
    { id: 1, title: 'Course Details', description: 'Basic course information' },
    { id: 2, title: 'Course Modules', description: 'Define course modules' },
    { id: 3, title: 'Lesson Structure', description: 'Create lesson outline' },
    { id: 4, title: 'Content Editor', description: 'Add lesson content' }
  ];

  // Cleanup preview URL when component unmounts or thumbnail changes
  useEffect(() => {
    return () => {
      if (thumbnailPreview && thumbnailPreview.startsWith('blob:')) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  // Cleanup pending uploads on component unmount or lesson change
  useEffect(() => {
    return () => {
      // Revoke all blob URLs when component unmounts
      Object.keys(pendingUploads).forEach(uploadKey => {
        const [componentId, fieldName] = uploadKey.split('_');
        const component = currentLessonContent.find(comp => comp.id === componentId);
        if (component && component.data && component.data[fieldName]) {
          const url = component.data[fieldName];
          if (typeof url === 'string' && url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
          }
        }
      });
    };
  }, [currentLessonIndex, pendingUploads, currentLessonContent]);

  // Validation functions
  const validateCourseData = () => {
    const newErrors = {};

    // Title validation
    if (!courseData.title.trim()) {
      newErrors.title = 'Course title is required';
    } else if (courseData.title.trim().length < 3) {
      newErrors.title = 'Course title must be at least 3 characters long';
    } else if (courseData.title.trim().length > 100) {
      newErrors.title = 'Course title must be less than 100 characters';
    }

    // Description validation
    if (!courseData.description.trim()) {
      newErrors.description = 'Course description is required';
    } else if (courseData.description.trim().length < 10) {
      newErrors.description = 'Course description must be at least 10 characters long';
    } else if (courseData.description.trim().length > 1000) {
      newErrors.description = 'Course description must be less than 1000 characters';
    }

    // Module numbers validation
    if (!courseData.moduleNumbers || courseData.moduleNumbers < 1) {
      newErrors.moduleNumbers = 'Number of modules must be at least 1';
    } else if (courseData.moduleNumbers > 20) {
      newErrors.moduleNumbers = 'Maximum 20 modules are allowed';
    }

    // Image validation (optional but helpful)
    if (selectedThumbnailFile) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(selectedThumbnailFile.type)) {
        newErrors.thumbnail = 'Please upload a valid image file (JPEG, PNG, WebP, or GIF)';
      }
      if (selectedThumbnailFile.size > 5 * 1024 * 1024) {
        newErrors.thumbnail = 'Image size must be less than 5MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateModules = () => {
    const newErrors = {};
    
    if (modules.length === 0) {
      newErrors.general = 'At least one module is required';
      setErrors(newErrors);
      return false;
    }
    
    modules.forEach((module, index) => {
      const moduleErrors = {};
      
      // Title validation
      if (!module.title.trim()) {
        moduleErrors.title = 'Module title is required';
      } else if (module.title.trim().length < 3) {
        moduleErrors.title = 'Module title must be at least 3 characters long';
      } else if (module.title.trim().length > 100) {
        moduleErrors.title = 'Module title must be less than 100 characters';
      }

      // Check for duplicate module titles
      const duplicates = modules.filter((m, i) => 
        i !== index && m.title.trim().toLowerCase() === module.title.trim().toLowerCase()
      );
      if (duplicates.length > 0 && module.title.trim()) {
        moduleErrors.title = 'Module title must be unique';
      }

      // Description validation
      if (!module.description.trim()) {
        moduleErrors.description = 'Module description is required';
      } else if (module.description.trim().length < 10) {
        moduleErrors.description = 'Module description must be at least 10 characters long';
      } else if (module.description.trim().length > 500) {
        moduleErrors.description = 'Module description must be less than 500 characters';
      }

      // Lesson number validation
      if (!module.lessonNumber || module.lessonNumber < 1) {
        moduleErrors.lessonNumber = 'At least 1 lesson is required';
      } else if (module.lessonNumber > 50) {
        moduleErrors.lessonNumber = 'Maximum 50 lessons are allowed per module';
      }

      if (Object.keys(moduleErrors).length > 0) {
        newErrors[`module_${index}`] = moduleErrors;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLessons = () => {
    const newErrors = {};
    
    if (lessons.length === 0) {
      newErrors.general = 'At least one lesson is required';
      setErrors(newErrors);
      return false;
    }
    
    lessons.forEach((lesson, index) => {
      if (!lesson.title.trim()) {
        newErrors[`lesson_${index}`] = 'Lesson title is required';
      } else if (lesson.title.trim().length < 3) {
        newErrors[`lesson_${index}`] = 'Lesson title must be at least 3 characters long';
      } else if (lesson.title.trim().length > 100) {
        newErrors[`lesson_${index}`] = 'Lesson title must be less than 100 characters';
      }
      
      // Check for duplicate lesson titles within the same module
      // Only check for duplicates if this is a new lesson (no lessonID) or if title was changed
      const duplicates = lessons.filter((l, i) => 
        i !== index && 
        l.moduleID === lesson.moduleID && 
        l.title.trim().toLowerCase() === lesson.title.trim().toLowerCase()
      );
      if (duplicates.length > 0 && lesson.title.trim()) {
        newErrors[`lesson_${index}`] = 'Lesson title must be unique within the module';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLessonContent = () => {
    const errors = [];
    
    if (currentLessonContent.length === 0) {
      errors.push('Lesson must contain at least one component');
      return errors;
    }

    currentLessonContent.forEach((component, index) => {
      const config = filteredComponentLibrary[component.type];
      if (!config) {
        errors.push(`Invalid component type at position ${index + 1}`);
        return;
      }

      // Relaxed component data validation - only validate essential fields
      switch (component.type) {
        case componentTypes.IMAGE:
          if (!component.data?.imageURL?.trim()) {
            errors.push(`Image component at position ${index + 1} requires an image`);
          }
          break;
        case componentTypes.VIDEO:
          if (!component.data?.videoURL?.trim()) {
            errors.push(`Video component at position ${index + 1} requires a video URL`);
          }
          break;
        case componentTypes.AUDIO:
          if (!component.data?.audioURL?.trim()) {
            errors.push(`Audio component at position ${index + 1} requires an audio URL`);
          }
          break;
        // For other components like HEADING, TEXT, LEFT_BORDER_BOX, EXERCISE_BOX, etc.
        // we remove strict validation to allow optional titles and content
        default:
          // No validation for other component types - they can be empty/optional
          break;
      }
    });

    return errors;
  };

  const handleFieldChange = (field, value, index = null, isModule = false, moduleField = null) => {
    // Clear specific field error when user starts typing
    const errorKey = index !== null 
      ? isModule 
        ? `module_${index}.${moduleField || field}` 
        : `lesson_${index}`
      : field;
    
    if (errors[errorKey] || (isModule && errors[`module_${index}`]?.[moduleField || field])) {
      setErrors(prev => {
        const newErrors = { ...prev };
        if (isModule && newErrors[`module_${index}`]) {
          delete newErrors[`module_${index}`][moduleField || field];
          if (Object.keys(newErrors[`module_${index}`]).length === 0) {
            delete newErrors[`module_${index}`];
          }
        } else {
          delete newErrors[errorKey];
        }
        return newErrors;
      });
    }

    // Mark field as touched
    setTouched(prev => ({ ...prev, [errorKey]: true }));
  };

  // Step 1: Course Details Form
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!validateCourseData()) {
      toast.error('Please fix the validation errors before proceeding');
      return;
    }

    setLoading(true);
    try {
      let imageURL = courseData.imageURL;
      
      // Upload thumbnail if a file is selected
      if (selectedThumbnailFile) {
        console.log('Uploading thumbnail...');
        imageURL = await handleFileUpload(selectedThumbnailFile);
        if (!imageURL) {
          toast.error('Failed to upload thumbnail');
          setLoading(false);
          return;
        }
      }

      const courseDataWithImage = {
        ...courseData,
        imageURL
      };

      console.log('Creating course with data:', courseDataWithImage);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(courseDataWithImage)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Course creation error:', errorData);
        throw new Error('Failed to create course');
      }

      const result = await response.json();
      console.log('Course creation response:', result);
      
      // The course model returns data as an array, so we need to access the first element
      const createdCourse = result.data.course[0];
      setCourseId(createdCourse.courseID);
      console.log('Course created with ID:', createdCourse.courseID);
      
      // Update courseData with the uploaded image URL
      setCourseData(prev => ({ ...prev, imageURL }));
      
      toast.success('Course created successfully!');
      setCurrentStep(2);

      // Initialize modules array with proper validation
      const moduleArray = Array.from({ length: courseData.moduleNumbers }, (_, index) => ({
        title: '',
        description: '',
        order: index + 1,
        lessonNumber: 1
      }));
      setModules(moduleArray);

    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  const updateCourseProgress = async () => {
    if (!courseId) return;
    
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          lastModified: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Error updating course progress:', error);
    }
  };

  // Step 2: Modules Form
  const handleModulesSubmit = async () => {
    // Validate modules data
    if (!validateModules()) {
      toast.error('Please fix the validation errors before proceeding');
      return;
    }

    if (!courseId) {
      toast.error('Course ID is missing. Please create course first.');
      return;
    }

    setLoading(true);
    try {
      const modulePromises = modules.map(async (module) => {
        console.log('Creating module with data:', {
          courseID: courseId,
          title: module.title,
          description: module.description,
          order: module.order,
          lessonNumber: module.lessonNumber
        });

        const response = await fetch(`${import.meta.env.VITE_API_URL}/modules/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            courseID: courseId,
            title: module.title,
            description: module.description,
            order: module.order,
            lessonNumber: module.lessonNumber
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Module creation error:', errorData);
          throw new Error(`Failed to create module: ${module.title} - ${errorData.message || 'Unknown error'}`);
        }
        
        const result = await response.json();
        console.log('Module created:', result);
        return result.data.module[0] || result.data.module;
      });

      const createdModules = await Promise.all(modulePromises);
      console.log('All modules created successfully:', createdModules);
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
            content: [],
            icon: 'page'
          });
        }
      });
      setLessons(allLessons);

      toast.success('Modules created successfully!');
      await updateCourseProgress(); // Update progress timestamp
      setCurrentStep(3);

    } catch (error) {
      console.error('Error creating modules:', error);
      toast.error(error.message || 'Failed to create modules');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Lessons Form
  const handleLessonsSubmit = async () => {
    // Validate lessons data
    if (!validateLessons()) {
      toast.error('Please fix the validation errors before proceeding');
      return;
    }

    setLoading(true);
    try {
      // Check if lessons already have lessonIDs (meaning they already exist)
      const existingLessons = lessons.filter(lesson => lesson.lessonID);
      
      if (existingLessons.length === lessons.length) {
        // All lessons already exist, just proceed to editor
        toast.success('Lesson structure verified successfully!');
        await updateCourseProgress(); // Update progress timestamp
        setIsEditorMode(true);
        setCurrentStep(4);
        setLoading(false);
        return;
      }

      const lessonPromises = lessons.map(async (lesson) => {
        // Skip lessons that already exist
        if (lesson.lessonID) {
          return lesson;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/lessons/without-content`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            moduleID: lesson.moduleID,
            title: lesson.title,
            order: lesson.order,
            icon: lesson.icon || 'page'
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
      await updateCourseProgress(); // Update progress timestamp
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

  // Course image selection (no immediate upload)
  const handleCourseImageSelection = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Store the selected file for later upload
    setSelectedThumbnailFile(file);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setThumbnailPreview(previewUrl);
    
    toast.success('Thumbnail selected successfully! It will be uploaded when you submit the course.');
  };

  // Editor functions
  const addComponent = (type) => {
    const componentConfig = filteredComponentLibrary[type];
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
    
    // Clean up pending uploads for this component
    setPendingUploads(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        if (key.startsWith(`${componentId}_`)) {
          // Revoke the object URL to free memory
          const file = updated[key];
          if (file instanceof File) {
            const component = currentLessonContent.find(comp => comp.id === componentId);
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

  // Save lesson content with validation
  const saveLessonContent = async (showSuccess = true) => {
    if (!lessons[currentLessonIndex]) return false;

    // Validate lesson content before saving
    const contentErrors = validateLessonContent();
    if (contentErrors.length > 0) {
      toast.error(`Content validation failed: ${contentErrors[0]}`);
      return false;
    }

    setLoading(true);
    try {
      // Upload pending files first
      const contentWithUploadedFiles = await uploadPendingFiles(currentLessonContent);
      
      const lesson = lessons[currentLessonIndex];
      const content = JSON.stringify(contentWithUploadedFiles);

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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save lesson content');
      }

      // Update lessons array and current lesson content with uploaded URLs
      const updatedLessons = [...lessons];
      updatedLessons[currentLessonIndex].content = contentWithUploadedFiles;
      setLessons(updatedLessons);
      setCurrentLessonContent(contentWithUploadedFiles);

      if (showSuccess) {
        toast.success('Lesson content saved successfully!');
      }
      await updateCourseProgress(); // Update progress timestamp
      return true;

    } catch (error) {
      console.error('Error saving lesson content:', error);
      toast.error(error.message || 'Failed to save lesson content');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Navigate between lessons
  const goToNextLesson = async () => {
    if (currentLessonIndex < lessons.length - 1) {
      const saved = await saveLessonContent(false);
      if (!saved) {
        const confirmMove = window.confirm('Current lesson has validation errors. Do you want to continue without saving?');
        if (!confirmMove) return;
      }
      
      setCurrentLessonIndex(currentLessonIndex + 1);
      setCurrentLessonContent(lessons[currentLessonIndex + 1]?.content || []);
      setSelectedComponent(null);
      setComponentData({});
    }
  };

  const goToPreviousLesson = async () => {
    if (currentLessonIndex > 0) {
      const saved = await saveLessonContent(false);
      if (!saved) {
        const confirmMove = window.confirm('Current lesson has validation errors. Do you want to continue without saving?');
        if (!confirmMove) return;
      }
      
      setCurrentLessonIndex(currentLessonIndex - 1);
      setCurrentLessonContent(lessons[currentLessonIndex - 1]?.content || []);
      setSelectedComponent(null);
      setComponentData({});
    }
  };

  // Incomplete course detection functions
  const resumeCourse = async (course) => {
    try {
      setLoading(true);
      
      // Set course data
      setCourseData({
        title: course.title,
        description: course.description,
        imageURL: course.imageURL,
        moduleNumbers: course.moduleNumbers
      });
      setCourseId(course.courseID);

      // If course has modules, set them directly from the detailed response
      if (course.modules && course.modules.length > 0) {
        setModules(course.modules);
        
        // Extract all lessons from modules
        const allLessons = [];
        course.modules.forEach((module) => {
          if (module.lessons && module.lessons.length > 0) {
            module.lessons.forEach(lesson => {
              allLessons.push({
                ...lesson,
                moduleID: module.moduleID,
                moduleTitle: module.title,
                content: lesson.content ? JSON.parse(lesson.content) : []
              });
            });
          }
        });
        
        if (allLessons.length > 0) {
          setLessons(allLessons);
          
          // Reset current lesson index to start from the first lesson
          setCurrentLessonIndex(0);
          setCurrentLessonContent(allLessons[0]?.content || []);
          
          // If lessons exist, go directly to editor mode regardless of content
          // This prevents the duplicate title validation error when resuming
          setCurrentStep(4);
          setIsEditorMode(true);
          
          const hasLessonsWithContent = allLessons.some(lesson => 
            lesson.content && lesson.content.length > 0
          );
          
          if (hasLessonsWithContent) {
            toast.success('Resumed course creation from where you left off!');
          } else {
            toast.success('Resumed course creation at content editing step!');
          }
        } else {
          // If modules exist but no lessons, go to lesson creation step
          setCurrentStep(3);
          toast.success('Resumed course creation at lesson creation step!');
        }
      } else {
        // If no modules, go to modules step
        setCurrentStep(2);
        toast.success('Resumed course creation at modules step!');
      }
    } catch (error) {
      console.error('Error resuming course:', error);
      toast.error('Failed to resume course');
    } finally {
      setLoading(false);
      setShowIncompleteModal(false);
    }
  };

  const deleteIncompleteCourse = async (courseId) => {
    try {
      console.log('Deleting course with ID:', courseId);
      setDeletingCourseId(courseId);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      console.log('Delete response status:', response.status);

      if (response.ok || response.status === 204) {
        // Remove the course from the incomplete courses list
        setIncompleteCourses(prev => prev.filter(course => course.courseID !== courseId));
        toast.success('Course and all related data deleted successfully!');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        console.error('Delete error response:', errorData);
        throw new Error(errorData.message || `Failed to delete course (Status: ${response.status})`);
      }
    } catch (error) {
      console.error('Error deleting incomplete course:', error);
      toast.error(`Failed to delete course: ${error.message}`);
    } finally {
      setDeletingCourseId(null);
    }
  };

  const startNewCourse = () => {
    setShowIncompleteModal(false);
    
    // Cleanup preview URL before resetting
    if (thumbnailPreview && thumbnailPreview.startsWith('blob:')) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    
    // Reset all states to start fresh
    setCourseData({
      title: '',
      description: '',
      imageURL: '',
      moduleNumbers: 0
    });
    setSelectedThumbnailFile(null);
    setThumbnailPreview('');
    setModules([]);
    setLessons([]);
    setCourseId(null);
    setCurrentStep(1);
    setIsEditorMode(false);
    setErrors({});  // Clear all validation errors
    setTouched({}); // Clear all touched states
    toast.success('Starting a new course!');
  };

  // Mark course as completed
  // Complete course creation with comprehensive validation
  const completeCourse = async () => {
    if (!courseId) return;

    // Validate all lessons have content
    const emptyLessons = lessons.filter((lesson, index) => {
      const content = index === currentLessonIndex ? currentLessonContent : lesson.content;
      return !content || content.length === 0;
    });

    if (emptyLessons.length > 0) {
      toast.error(`${emptyLessons.length} lesson(s) are empty. Please add content to all lessons before completing the course.`);
      return;
    }

    // Save current lesson content with validation
    const saved = await saveLessonContent(false);
    if (!saved) {
      toast.error('Please fix validation errors in the current lesson before completing the course.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to complete course');
      }

      toast.success('Course completed successfully! 🎉');
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error completing course:', error);
      toast.error(error.message || 'Failed to complete course');
    } finally {
      setLoading(false);
    }
  };

  // Check for incomplete courses on component mount
  useEffect(() => {
    const checkForIncompleteCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/incomplete/details`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.data.courses.length > 0) {
            setIncompleteCourses(result.data.courses);
            setShowIncompleteModal(true);
          }
        }
      } catch (error) {
        console.error('Error checking for incomplete courses:', error);
      } finally {
        setCheckingIncomplete(false);
      }
    };

    if (authToken) {
      checkForIncompleteCourses();
    }
  }, [authToken]);

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
              <label className="block text-xs font-medium mb-1 text-gray-700">SVG Icon</label>
              <select
                value={componentData.svgType || 'lightbulb'}
                onChange={(e) => handleComponentDataChange('svgType', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="lightbulb">💡 Light Bulb</option>
                <option value="heart">❤️ Heart</option>
                <option value="brain">🧠 Brain</option>
                <option value="star">⭐ Star</option>
                <option value="shield">🛡️ Shield</option>
                <option value="target">🎯 Target</option>
                <option value="check">✅ Check</option>
                <option value="exclamation">⚠️ Exclamation</option>
                <option value="none">🚫 None</option>
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
            
            {/* Card 1 */}
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
  };

  // Render error summary
  const renderErrorSummary = (stepErrors) => {
    if (!stepErrors || Object.keys(stepErrors).length === 0) return null;

    return (
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-red-400 text-xl">⚠</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Please fix the following validation errors:
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <ul className="list-disc pl-5 space-y-1">
                {Object.entries(stepErrors).map(([key, error]) => (
                  <li key={key}>
                    {typeof error === 'string' ? error : 
                     typeof error === 'object' ? Object.values(error).join(', ') : 
                     'Please check this field'
                    }
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isEditorMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <Header /> */}
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
                
                {/* Validation Progress */}
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="text-xs text-gray-500">
                      Content Progress: {lessons.filter((lesson, index) => {
                        const content = index === currentLessonIndex ? currentLessonContent : lesson.content;
                        return content && content.length > 0;
                      }).length}/{lessons.length} lessons
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-32">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(lessons.filter((lesson, index) => {
                            const content = index === currentLessonIndex ? currentLessonContent : lesson.content;
                            return content && content.length > 0;
                          }).length / lessons.length) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
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
                                id: Date.now(),
                                type: componentType,
                                data: {
                                  ...filteredComponentLibrary[componentType].defaultData,
                                  title: file.name.split('.')[0],
                                  [fieldName]: url
                                }
                              };
                              setCurrentLessonContent(prev => [...prev, newComponent]);
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
                      {currentLessonContent.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">No components added yet</p>
                      ) : (
                        currentLessonContent.map((component) => {
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
                  {currentLessonContent.length === 0 ? (
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
                        
                        while (i < currentLessonContent.length) {
                          const component = currentLessonContent[i];
                          const ComponentRenderer = filteredComponentLibrary[component.type]?.component;
                          
                          if (!ComponentRenderer) {
                            i++;
                            continue;
                          }
                          
                          // Check if this is a LEFT_BORDER_BOX or INFO_CARD_PAIR (always treat as half-width)
                          if (component.type === componentTypes.LEFT_BORDER_BOX || component.type === componentTypes.INFO_CARD_PAIR) {
                            // Look for next component to pair with
                            const nextComponent = currentLessonContent[i + 1];
                            const NextComponentRenderer = (nextComponent?.type === componentTypes.LEFT_BORDER_BOX || nextComponent?.type === componentTypes.INFO_CARD_PAIR) ? 
                              filteredComponentLibrary[nextComponent.type]?.component : null;
                            
                            if (NextComponentRenderer) {
                              // Render two half-width components in a row
                              components.push(
                                <div key={`pair-${component.id}-${nextComponent.id}`} className="flex flex-col md:flex-row gap-6">
                                  <div
                                    className={`flex-1 transition-all duration-200 ${
                                      selectedComponent?.id === component.id 
                                        ? 'ring-2 ring-blue-400 ring-opacity-50 rounded-lg' 
                                        : ''
                                    }`}
                                    onClick={() => selectComponent(component)}
                                  >
                                    <ComponentRenderer 
                                      data={component.data} 
                                      isHalfWidth={true}
                                      isEditMode={component.type === componentTypes.EXERCISE_BOX || component.type === componentTypes.ORDERED_LIST_BOX || component.type === componentTypes.QUESTION_CARD_BOX || component.type === componentTypes.CHECKBOX_LIST || component.type === componentTypes.MARK_COMPLETE_BOX || component.type === componentTypes.UNORDERED_LIST_BOX || component.type === componentTypes.TIMELINE}
                                      onUpdate={component.type === componentTypes.EXERCISE_BOX || component.type === componentTypes.ORDERED_LIST_BOX || component.type === componentTypes.QUESTION_CARD_BOX || component.type === componentTypes.CHECKBOX_LIST || component.type === componentTypes.MARK_COMPLETE_BOX || component.type === componentTypes.UNORDERED_LIST_BOX || component.type === componentTypes.TIMELINE ? 
                                        (newData) => updateComponent(component.id, newData) : 
                                        undefined
                                      }
                                    />
                                  </div>
                                  <div
                                    className={`flex-1 transition-all duration-200 ${
                                      selectedComponent?.id === nextComponent.id 
                                        ? 'ring-2 ring-blue-400 ring-opacity-50 rounded-lg' 
                                        : ''
                                    }`}
                                    onClick={() => selectComponent(nextComponent)}
                                  >
                                    <NextComponentRenderer 
                                      data={nextComponent.data} 
                                      isHalfWidth={true}
                                      isEditMode={nextComponent.type === componentTypes.EXERCISE_BOX || nextComponent.type === componentTypes.ORDERED_LIST_BOX || nextComponent.type === componentTypes.QUESTION_CARD_BOX || nextComponent.type === componentTypes.CHECKBOX_LIST || nextComponent.type === componentTypes.MARK_COMPLETE_BOX || nextComponent.type === componentTypes.UNORDERED_LIST_BOX || nextComponent.type === componentTypes.TIMELINE}
                                      onUpdate={nextComponent.type === componentTypes.EXERCISE_BOX || nextComponent.type === componentTypes.ORDERED_LIST_BOX || nextComponent.type === componentTypes.QUESTION_CARD_BOX || nextComponent.type === componentTypes.CHECKBOX_LIST || nextComponent.type === componentTypes.MARK_COMPLETE_BOX || nextComponent.type === componentTypes.UNORDERED_LIST_BOX || nextComponent.type === componentTypes.TIMELINE ? 
                                        (newData) => updateComponent(nextComponent.id, newData) : 
                                        undefined
                                      }
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
                                    className={`flex-1 transition-all duration-200 ${
                                      selectedComponent?.id === component.id 
                                        ? 'ring-2 ring-blue-400 ring-opacity-50 rounded-lg' 
                                        : ''
                                    }`}
                                    onClick={() => selectComponent(component)}
                                  >
                                    <ComponentRenderer 
                                      data={component.data} 
                                      isHalfWidth={true}
                                      isEditMode={component.type === componentTypes.EXERCISE_BOX || component.type === componentTypes.ORDERED_LIST_BOX || component.type === componentTypes.QUESTION_CARD_BOX || component.type === componentTypes.CHECKBOX_LIST || component.type === componentTypes.MARK_COMPLETE_BOX || component.type === componentTypes.UNORDERED_LIST_BOX || component.type === componentTypes.TIMELINE}
                                      onUpdate={component.type === componentTypes.EXERCISE_BOX || component.type === componentTypes.ORDERED_LIST_BOX || component.type === componentTypes.QUESTION_CARD_BOX || component.type === componentTypes.CHECKBOX_LIST || component.type === componentTypes.MARK_COMPLETE_BOX || component.type === componentTypes.UNORDERED_LIST_BOX || component.type === componentTypes.TIMELINE ? 
                                        (newData) => updateComponent(component.id, newData) : 
                                        undefined
                                      }
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
                                className={`transition-all duration-200 ${
                                  selectedComponent?.id === component.id 
                                    ? 'ring-2 ring-blue-400 ring-opacity-50 rounded-lg' 
                                    : ''
                                }`}
                                onClick={() => selectComponent(component)}
                              >
                                <ComponentRenderer 
                                  data={component.data} 
                                  isEditMode={component.type === componentTypes.EXERCISE_BOX || component.type === componentTypes.ORDERED_LIST_BOX || component.type === componentTypes.QUESTION_CARD_BOX || component.type === componentTypes.CHECKBOX_LIST || component.type === componentTypes.MARK_COMPLETE_BOX || component.type === componentTypes.UNORDERED_LIST_BOX || component.type === componentTypes.TIMELINE}
                                  onUpdate={component.type === componentTypes.EXERCISE_BOX || component.type === componentTypes.ORDERED_LIST_BOX || component.type === componentTypes.QUESTION_CARD_BOX || component.type === componentTypes.CHECKBOX_LIST || component.type === componentTypes.MARK_COMPLETE_BOX || component.type === componentTypes.UNORDERED_LIST_BOX || component.type === componentTypes.TIMELINE ? 
                                    (newData) => updateComponent(component.id, newData) : 
                                    undefined
                                  }
                                />
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

          {/* Complete Course Button */}
          <div className="mt-8 text-center">
            <button
              onClick={async () => {
                await saveLessonContent();
                await completeCourse();
              }}
              disabled={loading}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold"
            >
              {loading ? 'Completing Course...' : 'Complete Course Creation'}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
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
                
                {renderErrorSummary(errors)}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    value={courseData.title}
                    onChange={(e) => {
                      setCourseData(prev => ({ ...prev, title: e.target.value }));
                      handleFieldChange('title', e.target.value);
                    }}
                    onBlur={() => setTouched(prev => ({ ...prev, title: true }))}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.title && touched.title
                        ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Enter course title"
                  />
                  {errors.title && touched.title && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Description *
                  </label>
                  <textarea
                    value={courseData.description}
                    onChange={(e) => {
                      setCourseData(prev => ({ ...prev, description: e.target.value }));
                      handleFieldChange('description', e.target.value);
                    }}
                    onBlur={() => setTouched(prev => ({ ...prev, description: true }))}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.description && touched.description
                        ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Describe your course"
                  />
                  {errors.description && touched.description && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.description}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {courseData.description.length}/1000 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCourseImageSelection}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.thumbnail
                        ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {errors.thumbnail && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.thumbnail}
                    </p>
                  )}
                  {(thumbnailPreview || courseData.imageURL) && (
                    <div className="mt-2">
                      <img
                        src={thumbnailPreview || courseData.imageURL}
                        alt="Course preview"
                        className="w-32 h-20 object-cover rounded border"
                      />
                      {selectedThumbnailFile && (
                        <p className="text-sm text-blue-600 mt-1">
                          Ready to upload: {selectedThumbnailFile.name}
                        </p>
                      )}
                    </div>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Supported formats: JPEG, PNG, WebP, GIF. Maximum size: 5MB
                  </p>
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
                    onChange={(e) => {
                      setCourseData(prev => ({ ...prev, moduleNumbers: parseInt(e.target.value) || 0 }));
                      handleFieldChange('moduleNumbers', parseInt(e.target.value) || 0);
                    }}
                    onBlur={() => setTouched(prev => ({ ...prev, moduleNumbers: true }))}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.moduleNumbers && touched.moduleNumbers
                        ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Enter number of modules (1-20)"
                  />
                  {errors.moduleNumbers && touched.moduleNumbers && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.moduleNumbers}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended: 3-8 modules for optimal course structure
                  </p>
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
                
                {renderErrorSummary(errors)}
                
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
                            handleFieldChange('title', e.target.value, index, true, 'title');
                          }}
                          onBlur={() => setTouched(prev => ({ ...prev, [`module_${index}.title`]: true }))}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            errors[`module_${index}`]?.title && touched[`module_${index}.title`]
                              ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                              : 'border-gray-300 focus:ring-blue-500'
                          }`}
                          placeholder="Enter module title"
                        />
                        {errors[`module_${index}`]?.title && touched[`module_${index}.title`] && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errors[`module_${index}`].title}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Lessons *
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={module.lessonNumber}
                          onChange={(e) => {
                            const newModules = [...modules];
                            const value = parseInt(e.target.value) || 1;
                            newModules[index].lessonNumber = Math.max(1, Math.min(50, value));
                            setModules(newModules);
                            handleFieldChange('lessonNumber', newModules[index].lessonNumber, index, true, 'lessonNumber');
                          }}
                          onBlur={() => setTouched(prev => ({ ...prev, [`module_${index}.lessonNumber`]: true }))}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            errors[`module_${index}`]?.lessonNumber && touched[`module_${index}.lessonNumber`]
                              ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                              : 'border-gray-300 focus:ring-blue-500'
                          }`}
                          placeholder="Number of lessons (1-50)"
                        />
                        {errors[`module_${index}`]?.lessonNumber && touched[`module_${index}.lessonNumber`] && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errors[`module_${index}`].lessonNumber}
                          </p>
                        )}
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
                          handleFieldChange('description', e.target.value, index, true, 'description');
                        }}
                        onBlur={() => setTouched(prev => ({ ...prev, [`module_${index}.description`]: true }))}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          errors[`module_${index}`]?.description && touched[`module_${index}.description`]
                            ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        placeholder="Describe this module"
                      />
                      {errors[`module_${index}`]?.description && touched[`module_${index}.description`] && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="mr-1">⚠</span>
                          {errors[`module_${index}`].description}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        {module.description.length}/500 characters
                      </p>
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
                
                {renderErrorSummary(errors)}
                
                {modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">{module.title}</h3>
                    
                    <div className="space-y-3">
                      {Array.from({ length: module.lessonNumber }, (_, lessonIndex) => {
                        const lessonGlobalIndex = modules
                          .slice(0, moduleIndex)
                          .reduce((sum, mod) => sum + mod.lessonNumber, 0) + lessonIndex;
                        
                        return (
                          <div key={lessonIndex} className="space-y-4">
                            <div>
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
                                    handleFieldChange('title', e.target.value, lessonGlobalIndex, false);
                                  }
                                }}
                                onBlur={() => setTouched(prev => ({ ...prev, [`lesson_${lessonGlobalIndex}`]: true }))}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                  errors[`lesson_${lessonGlobalIndex}`] && touched[`lesson_${lessonGlobalIndex}`]
                                    ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                                    : 'border-gray-300 focus:ring-blue-500'
                                }`}
                                placeholder="Enter lesson title"
                              />
                              {errors[`lesson_${lessonGlobalIndex}`] && touched[`lesson_${lessonGlobalIndex}`] && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                  <span className="mr-1">⚠</span>
                                  {errors[`lesson_${lessonGlobalIndex}`]}
                                </p>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Lesson Icon
                              </label>
                              <select
                                value={lessons[lessonGlobalIndex]?.icon || 'page'}
                                onChange={(e) => {
                                  const newLessons = [...lessons];
                                  if (newLessons[lessonGlobalIndex]) {
                                    newLessons[lessonGlobalIndex].icon = e.target.value;
                                    setLessons(newLessons);
                                  }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                {iconOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
                                <span>Preview:</span>
                                {iconOptions.find(opt => opt.value === (lessons[lessonGlobalIndex]?.icon || 'page'))?.icon}
                                <span>{iconOptions.find(opt => opt.value === (lessons[lessonGlobalIndex]?.icon || 'page'))?.label}</span>
                              </div>
                            </div>
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

      {/* Incomplete Course Modal */}
      {showIncompleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiEdit3 className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Incomplete Course Found
              </h3>
              <p className="text-gray-600">
                You have {incompleteCourses.length} incomplete course{incompleteCourses.length > 1 ? 's' : ''} in progress. 
                Would you like to continue where you left off?
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {incompleteCourses.map((course) => {
                // Determine progress status
                const hasModules = course.modules && course.modules.length > 0;
                const hasLessons = hasModules && course.modules.some(m => m.lessons && m.lessons.length > 0);
                const hasContent = hasLessons && course.modules.some(m => 
                  m.lessons.some(l => l.content && l.content.length > 0)
                );
                
                let progressStatus = 'Basic Info';
                let progressPercent = 25;
                
                if (hasContent) {
                  progressStatus = 'Adding Content';
                  progressPercent = 90;
                } else if (hasLessons) {
                  progressStatus = 'Lesson Structure';
                  progressPercent = 75;
                } else if (hasModules) {
                  progressStatus = 'Module Setup';
                  progressPercent = 50;
                }

                return (
                  <div key={course.courseID} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <p className="text-sm text-gray-600 truncate">{course.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mt-2 mb-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress: {progressStatus}</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => resumeCourse(course)}
                        disabled={loading}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                      >
                        {loading ? 'Resuming...' : 'Resume'}
                      </button>
                      <button
                        onClick={() => deleteIncompleteCourse(course.courseID)}
                        disabled={deletingCourseId === course.courseID}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
                      >
                        {deletingCourseId === course.courseID ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={startNewCourse}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Start New Course
              </button>
              <button
                onClick={() => setShowIncompleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {checkingIncomplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking for incomplete courses...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
