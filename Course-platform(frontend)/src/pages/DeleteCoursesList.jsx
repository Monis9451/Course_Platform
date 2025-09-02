import React, { useEffect, useState } from "react";
import { getAllCourses, deleteCourseCascade } from "../api/courseAPI";

const DeleteCoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllCourses()
      .then((data) => setCourses(data))
      .catch(() => setError("Failed to fetch courses"));
  }, []);

  const handleDelete = async (courseId) => {
    setLoading(true);
    setError("");
    try {
      await deleteCourseCascade(courseId);
      setCourses((prev) => prev.filter((c) => c._id !== courseId));
    } catch (err) {
      setError("Failed to delete course");
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Delete Courses</h2>
      {error && <div className="text-red-500">{error}</div>}
      {loading && <div>Deleting...</div>}
      <ul>
        {courses.map((course) => (
          <li key={course._id} className="mb-4 flex items-center justify-between">
            <span>{course.title}</span>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(course._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteCoursesList;
