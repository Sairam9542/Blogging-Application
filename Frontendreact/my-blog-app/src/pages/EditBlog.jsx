import axios from 'axios';
import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import './EditBlog.css'; // Make sure to include this CSS file

export default function EditBlog() {
  const blog = useLoaderData();
  const [blogData, setBlogData] = useState(blog);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    setBlogData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
    <div className="edit-blog-wrapper">
      <div className="edit-blog-container">
        <div className="edit-blog-header">
          <h1>Edit Your Blog</h1>
          <div className="underline-animation"></div>
          <p>Update your content</p>
        </div>
        
        <form className="edit-blog-form" onSubmit={onSubmit}>
          <div className="form-group">
            <div className="input-container">
              <input
                type="text"
                name="title"
                id="title"
                value={blogData.title}
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
                value={blogData.description}
                onChange={onHandleChange}
                className="form-input"
                required
                placeholder=" "
              ></textarea>
              <label htmlFor="description" className="form-label">Blog Content</label>
              <div className="input-highlight"></div>
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
  );
}