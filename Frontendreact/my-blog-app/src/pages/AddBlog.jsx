import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

export default function EditBlog() {
  const blog = useLoaderData();
  // Initialize with empty values in case blog data is undefined
  const [blogData, setBlogData] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const navigate = useNavigate();
  
  // Set blog data after component mounts if data is available
  useEffect(() => {
    if (blog && typeof blog === 'object') {
      setBlogData({
        title: blog.title || '',
        description: blog.description || ''
      });
      setCharCount(blog.description ? blog.description.length : 0);
    }
  }, [blog]);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'description') {
      setCharCount(value.length);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!blogData.title || !blogData.description) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (blog && blog.id) {
        await axios.put(`http://localhost:5000/blog/${blog.id}`, blogData);
      } else {
        // Fallback to post if it's not a valid edit
        await axios.post("http://localhost:5000/blog", blogData);
      }
      setIsSubmitting(false);
      navigate("/");
    } catch (error) {
      console.error("Error updating blog:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>
        {`
          .blog-form-container {
            max-width: 800px;
            margin: 40px auto;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .blog-form-container:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
          }
          
          .blog-form-title {
            font-size: 24px;
            font-weight: 600;
            color: #333;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid #f0f0f0;
            position: relative;
          }
          
          .blog-form-title::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 60px;
            height: 2px;
            background: linear-gradient(to right, #6d46e4, #8f70e6);
            transition: width 0.3s ease;
          }
          
          .blog-form-container:hover .blog-form-title::after {
            width: 120px;
          }
          
          .form-group {
            margin-bottom: 25px;
            position: relative;
            transition: transform 0.2s ease;
          }
          
          .form-group:focus-within {
            transform: translateY(-2px);
          }
          
          .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #444;
            font-size: 16px;
            transition: color 0.2s ease;
          }
          
          .form-group:focus-within .form-label {
            color: #6d46e4;
          }
          
          .form-control {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
          }
          
          .form-control:hover {
            border-color: #bbb;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);
          }
          
          .form-control:focus {
            border-color: #6d46e4;
            outline: none;
            box-shadow: 0 0 0 3px rgba(109, 70, 228, 0.1);
          }
          
          .char-counter {
            display: block;
            text-align: right;
            font-size: 13px;
            color: #888;
            margin-top: 5px;
            transition: color 0.2s ease;
          }
          
          .form-group:focus-within .char-counter {
            color: #6d46e4;
          }
          
          .form-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
          }
          
          .form-submit-btn, .form-cancel-btn {
            background: linear-gradient(to right, #6d46e4, #8f70e6);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(109, 70, 228, 0.3);
            display: inline-block;
            position: relative;
            overflow: hidden;
          }
          
          .form-submit-btn:hover, .form-cancel-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(109, 70, 228, 0.4);
          }
          
          .form-submit-btn:active, .form-cancel-btn:active {
            transform: translateY(1px);
          }
          
          .form-submit-btn::after, .form-cancel-btn::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 5px;
            background: rgba(255, 255, 255, 0.5);
            opacity: 0;
            border-radius: 100%;
            transform: scale(1, 1) translate(-50%);
            transform-origin: 50% 50%;
          }
          
          .form-submit-btn:focus:not(:active)::after, .form-cancel-btn:focus:not(:active)::after {
            animation: ripple 1s ease-out;
          }
          
          .form-cancel-btn {
            background: linear-gradient(to right, #f3f4f6, #e5e7eb);
            color: #4b5563;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }
          
          .form-cancel-btn:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          }
          
          .btn-submitting {
            opacity: 0.7;
            cursor: wait;
          }
          
          .btn-submitting::before {
            content: '';
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 10px;
            border: 2px solid #fff;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spinner 0.6s linear infinite;
          }
          
          @keyframes spinner {
            to {transform: rotate(360deg);}
          }
          
          @keyframes ripple {
            0% {
              transform: scale(0, 0);
              opacity: 1;
            }
            20% {
              transform: scale(25, 25);
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: scale(40, 40);
            }
          }
          
          .decorative-shape {
            position: absolute;
            top: -50px;
            right: -50px;
            width: 150px;
            height: 150px;
            background: linear-gradient(135deg, rgba(109, 70, 228, 0.1), rgba(143, 112, 230, 0.05));
            border-radius: 50%;
            z-index: 0;
            transition: transform 0.5s ease;
          }
          
          .blog-form-container:hover .decorative-shape {
            transform: scale(1.1) rotate(15deg);
          }
          
          .decorative-shape-2 {
            position: absolute;
            bottom: -70px;
            left: -40px;
            width: 180px;
            height: 180px;
            background: linear-gradient(135deg, rgba(109, 70, 228, 0.05), rgba(143, 112, 230, 0.02));
            border-radius: 50%;
            z-index: 0;
            transition: transform 0.5s ease;
          }
          
          .blog-form-container:hover .decorative-shape-2 {
            transform: scale(1.1) rotate(-10deg);
          }
          
          /* Responsive styles */
          @media (max-width: 768px) {
            .blog-form-container {
              padding: 20px;
              margin: 20px;
            }
            
            .blog-form-title {
              font-size: 22px;
            }
            
            .form-group {
              margin-bottom: 20px;
            }
            
            .form-control {
              padding: 10px 12px;
            }
            
            .form-actions {
              flex-direction: column;
            }
            
            .form-submit-btn, .form-cancel-btn {
              width: 100%;
              padding: 12px 0;
            }
          }
        `}
      </style>
      
      <div className="blog-form-container">
        <div className="decorative-shape"></div>
        <div className="decorative-shape-2"></div>
        
        <h2 className="blog-form-title">Edit Your Blog Post</h2>
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">Title</label>
            <input 
              type="text" 
              id="title"
              name="title" 
              className="form-control" 
              placeholder="Enter an engaging title for your blog"
              value={blogData.title}
              onChange={onHandleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="description">Content</label>
            <textarea 
              id="description"
              name="description" 
              rows="10" 
              className="form-control" 
              placeholder="Write your blog post content here. Markdown formatting is supported."
              value={blogData.description}
              onChange={onHandleChange}
              required
            ></textarea>
            <span className="char-counter">{charCount} characters</span>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="form-cancel-btn"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={`form-submit-btn ${isSubmitting ? 'btn-submitting' : ''}`}
              disabled={isSubmitting || !blogData.title || !blogData.description}
            >
              {isSubmitting ? 'Saving...' : 'Update Blog Post'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}