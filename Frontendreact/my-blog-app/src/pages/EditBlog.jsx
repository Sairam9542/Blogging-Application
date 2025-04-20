import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

export default function EditBlog() {
  const blog = useLoaderData();
  const [blogData, setBlogData] = useState(blog);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(blog?.description?.length || 0);
  const [animateIn, setAnimateIn] = useState(false);
  const navigate = useNavigate();

  // Animation effect when component mounts
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'description') {
      setCharCount(value.length);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.put(`http://localhost:5000/blog/${blog.id}`, blogData);
      setTimeout(() => {
        navigate("/");
      }, 800); // Longer delay for animation to be visible
    } catch (error) {
      console.error("Error updating blog:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>
        {`
          :root {
            --primary-color: #6366F1;
            --primary-dark: #4F46E5;
            --primary-light: #EEF2FF;
            --danger-color: #F43F5E;
            --danger-light: #FFF1F2;
            --text-primary: #1F2937;
            --text-secondary: #4B5563;
            --text-tertiary: #9CA3AF;
            --bg-color: #F8F9FC;
            --card-bg: #FFFFFF;
            --card-border: #E5E7EB;
            --card-shadow: rgba(99, 102, 241, 0.08);
            --animation-duration: 0.3s;
          }
          
          body {
            background-color: var(--bg-color);
            color: var(--text-primary);
          }
          
          .edit-blog-wrapper {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            padding: 40px 20px;
          }
          
          .edit-blog-container {
            width: 100%;
            max-width: 800px;
            background-color: var(--card-bg);
            border-radius: 16px;
            box-shadow: 0 10px 25px var(--card-shadow);
            overflow: hidden;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid var(--card-border);
          }
          
          .animate-in .edit-blog-container {
            opacity: 1;
            transform: translateY(0);
          }
          
          .edit-blog-header {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
            padding: 35px 40px;
            position: relative;
            color: white;
            overflow: hidden;
          }
          
          .edit-blog-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='white' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
            opacity: 0.2;
          }
          
          .edit-blog-header h1 {
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 5px 0;
            position: relative;
          }
          
          .underline-animation {
            height: 3px;
            width: 60px;
            background-color: white;
            margin-bottom: 12px;
            position: relative;
            border-radius: 2px;
          }
          
          .underline-animation::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.5);
            animation: pulse 2s infinite;
            border-radius: 2px;
          }
          
          @keyframes pulse {
            0% { transform: scaleX(1); opacity: 1; }
            50% { transform: scaleX(1.5); opacity: 0.5; }
            100% { transform: scaleX(1); opacity: 1; }
          }
          
          .edit-blog-header p {
            margin: 0;
            opacity: 0.8;
            font-size: 16px;
            font-weight: 300;
          }
          
          .edit-blog-form {
            padding: 30px 40px 40px;
          }
          
          .form-group {
            margin-bottom: 28px;
          }
          
          .input-container {
            position: relative;
            margin-bottom: 10px;
          }
          
          .form-input {
            width: 100%;
            padding: 16px 18px;
            border: 2px solid var(--card-border);
            border-radius: 10px;
            font-size: 16px;
            transition: all var(--animation-duration) ease;
            background-color: #FCFCFD;
            color: var(--text-primary);
            font-family: inherit;
          }
          
          .form-input:focus {
            outline: none;
            border-color: var(--primary-color);
            background-color: white;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
          }
          
          .form-label {
            position: absolute;
            top: 17px;
            left: 16px;
            font-size: 16px;
            color: var(--text-tertiary);
            pointer-events: none;
            transform-origin: left top;
            transition: all var(--animation-duration) ease;
            background-color: transparent;
            padding: 0 4px;
          }
          
          .form-input:focus ~ .form-label,
          .form-input:not(:placeholder-shown) ~ .form-label {
            transform: translateY(-26px) scale(0.85);
            color: var(--primary-color);
            background-color: white;
          }
          
          .input-highlight {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            width: 0;
            background-color: var(--primary-color);
            transition: all var(--animation-duration) ease;
          }
          
          .form-input:focus ~ .input-highlight {
            width: 100%;
          }
          
          textarea.form-input {
            resize: vertical;
            min-height: 200px;
          }
          
          .textarea-container .form-label {
            background-color: #FCFCFD;
          }
          
          .textarea-container .form-input:focus ~ .form-label {
            background-color: white;
          }
          
          .char-count {
            font-size: 13px;
            color: var(--text-tertiary);
            text-align: right;
            margin-top: 6px;
          }
          
          .form-buttons {
            display: flex;
            justify-content: flex-end;
            gap: 16px;
            margin-top: 24px;
          }
          
          .cancel-button, .submit-button {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px 24px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            transition: all var(--animation-duration) ease;
            border: none;
          }
          
          .cancel-button {
            background-color: #f5f5f5;
            color: var(--text-secondary);
            border: 1px solid #e0e0e0;
          }
          
          .cancel-button:hover {
            background-color: #eaeaea;
            color: var(--text-primary);
          }
          
          .submit-button {
            background-color: var(--primary-color);
            color: white;
            gap: 8px;
            min-width: 140px;
            position: relative;
            overflow: hidden;
          }
          
          .submit-button:hover:not(:disabled) {
            background-color: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
          }
          
          .submit-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          
          .button-icon {
            display: flex;
            align-items: center;
            transition: transform var(--animation-duration) ease;
          }
          
          .submit-button:hover .button-icon {
            transform: translateX(3px);
          }
          
          .submitting .button-text {
            animation: moveTextLeft 0.3s forwards;
          }
          
          @keyframes moveTextLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-8px); }
          }
          
          .loader {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 0.8s ease-in-out infinite;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          

          
          
          
          /* Responsive styles */
          @media (max-width: 768px) {
            .edit-blog-header {
              padding: 25px 25px;
            }
            
            .edit-blog-form {
              padding: 25px 25px 30px;
            }
            
            .edit-blog-header h1 {
              font-size: 24px;
            }
          }
          
          @media (max-width: 480px) {
            .edit-blog-wrapper {
              padding: 20px 15px;
            }
            
            .form-buttons {
              flex-direction: column;
              gap: 12px;
            }
            
            .cancel-button, .submit-button {
              width: 100%;
            }
            
            .category-options {
              gap: 10px;
            }
          }
        `}
      </style>
      
      <div className={`edit-blog-wrapper ${animateIn ? 'animate-in' : ''}`}>
        <div className="edit-blog-container">
          <div className="edit-blog-header">
            <h1>Edit Your Blog</h1>
            <div className="underline-animation"></div>
            <p>Update your content and make it even better</p>
          </div>
          
          <form className="edit-blog-form" onSubmit={onSubmit}>
            <div className="form-group">
              <div className="input-container">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={blogData.title || ''}
                  onChange={onHandleChange}
                  className="form-input"
                  required
                  placeholder=" "
                />
                <label htmlFor="title" className="form-label">Blog Title</label>
                <div className="input-highlight"></div>
              </div>
            </div>
            
            
            <div className="form-group">
              <div className="input-container textarea-container">
                <textarea
                  name="description"
                  id="description"
                  rows="10"
                  value={blogData.description || ''}
                  onChange={onHandleChange}
                  className="form-input"
                  required
                  placeholder=" "
                ></textarea>
                <label htmlFor="description" className="form-label">Blog Content</label>
                <div className="input-highlight"></div>
              </div>
              <div className="char-count">
                {charCount} characters
              </div>
            </div>
            
            <div className="form-buttons">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="cancel-button"
              >
                <span>Cancel</span>
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
              >
                <span className="button-text">
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </span>
                <span className="button-icon">
                  {isSubmitting ? (
                    <span className="loader"></span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}