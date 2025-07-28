import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../context/authContext';


const AddCourse = () => {
    return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <h1 className='text-2xl font-bold text-center my-50'>Making the editor here 🙂</h1>
      <Footer />
    </div>
    )
}

export default AddCourse;
