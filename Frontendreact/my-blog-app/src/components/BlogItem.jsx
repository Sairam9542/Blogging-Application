import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import axios from 'axios';

export default function BlogItem() {
    const allBlogs = useLoaderData();
    const navigate = useNavigate();
    
    // Add state for hover effects and delete confirmation
    const [hoveredBlog, setHoveredBlog] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [animateIn, setAnimateIn] = useState(false);

    // Animation effect when component mounts
    useEffect(() => {
        setAnimateIn(true);
    }, []);

    const deleteBlog = async(id) => {
        await axios.delete(`http://localhost:5000/blog/${id}`);
        navigate("/");
    };

    // Format date helper
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString || Date.now()).toLocaleDateString(undefined, options);
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
                    
                    .blog-container {
                        max-width: 950px;
                        margin: 40px auto;
                        padding: 0 20px;
                    }
                    
                    .blog-category {
                        display: inline-block;
                        font-size: 12px;
                        font-weight: 500;
                        padding: 4px 10px;
                        border-radius: 50px;
                        background-color: var(--primary-light);
                        color: var(--primary-color);
                        margin-bottom: 12px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    
                    .blog-card {
                        background-color: var(--card-bg);
                        border-radius: 16px;
                        box-shadow: 0 10px 25px var(--card-shadow);
                        margin-bottom: 30px;
                        transition: all var(--animation-duration) cubic-bezier(0.4, 0, 0.2, 1);
                        border: 1px solid var(--card-border);
                        overflow: hidden;
                        position: relative;
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    
                    .animate-in .blog-card {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    .blog-card:nth-child(1) { transition-delay: 0.05s; }
                    .blog-card:nth-child(2) { transition-delay: 0.1s; }
                    .blog-card:nth-child(3) { transition-delay: 0.15s; }
                    .blog-card:nth-child(4) { transition-delay: 0.2s; }
                    .blog-card:nth-child(5) { transition-delay: 0.25s; }
                    
                    .blog-card:hover {
                        box-shadow: 0 20px 35px rgba(99, 102, 241, 0.15);
                        transform: translateY(-5px);
                        border-color: rgba(99, 102, 241, 0.2);
                    }
                    
                    .blog-card::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 4px;
                        height: 100%;
                        background-color: var(--primary-color);
                        transition: all var(--animation-duration) ease;
                        transform: scaleY(0);
                        transform-origin: bottom;
                    }
                    
                    .blog-card:hover::before {
                        transform: scaleY(1);
                    }
                    
                    .blog-header {
                        padding: 25px 30px 15px;
                        position: relative;
                    }
                    
                    .blog-meta {
                        display: flex;
                        align-items: center;
                        color: var(--text-tertiary);
                        font-size: 14px;
                        margin-bottom: 10px;
                    }
                    
                    .blog-date {
                        display: flex;
                        align-items: center;
                        margin-right: 16px;
                    }
                    
                    .blog-date svg, .blog-read-time svg {
                        margin-right: 6px;
                    }
                    
                    .blog-read-time {
                        display: flex;
                        align-items: center;
                    }
                    
                    .blog-title {
                        margin: 0;
                        font-size: 22px;
                        font-weight: 700;
                        color: var(--text-primary);
                        transition: color var(--animation-duration) ease;
                        line-height: 1.3;
                    }
                    
                    .blog-card:hover .blog-title {
                        color: var(--primary-color);
                    }
                    
                    .blog-content {
                        padding: 0 30px 25px;
                        color: var(--text-secondary);
                        line-height: 1.7;
                        max-height: 135px;
                        overflow: hidden;
                        position: relative;
                        font-size: 15px;
                    }
                    
                    .blog-content::after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 70px;
                        background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1));
                    }
                    
                    .blog-content img {
                        max-width: 100%;
                        height: auto;
                        border-radius: 10px;
                        margin: 15px 0;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                    }
                    
                    .blog-content p {
                        margin: 12px 0;
                    }
                    
                    .blog-actions {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 18px 30px;
                        border-top: 1px solid #f0f0f0;
                        background-color: #fafafa;
                    }
                    
                    .view-link {
                        color: var(--primary-color);
                        text-decoration: none;
                        font-weight: 600;
                        font-size: 15px;
                        display: flex;
                        align-items: center;
                        transition: all var(--animation-duration) ease;
                        padding: 8px 16px;
                        border-radius: 8px;
                    }
                    
                    .view-link:hover {
                        background-color: var(--primary-light);
                        color: var(--primary-dark);
                        transform: translateX(3px);
                    }
                    
                    .view-link svg {
                        margin-left: 8px;
                        transition: transform var(--animation-duration) ease;
                    }
                    
                    .view-link:hover svg {
                        transform: translateX(4px);
                    }
                    
                    .blog-buttons {
                        display: flex;
                        gap: 12px;
                    }
                    
                    .delete-btn {
                        border: none;
                        padding: 8px 16px;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all var(--animation-duration) ease;
                        font-weight: 500;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                    }
                    
                    
                    .delete-btn {
                        background-color: var(--danger-light);
                        color: var(--danger-color);
                    }
                    
                    .delete-btn:hover:not(.confirm-delete) {
                        background-color: var(--danger-color);
                        color: white;
                    }
                    
                    .delete-btn svg {
                        margin-right: 6px;
                    }
                    
                    .confirm-delete {
                        background-color: var(--danger-color);
                        color: white;
                        animation: pulse 1.5s infinite;
                    }
                    
                    @keyframes pulse {
                        0% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.4); }
                        70% { box-shadow: 0 0 0 10px rgba(244, 63, 94, 0); }
                        100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); }
                    }
                    
                    .no-blogs {
                        text-align: center;
                        padding: 60px 20px;
                        color: var(--text-secondary);
                        background-color: var(--card-bg);
                        border-radius: 16px;
                        box-shadow: 0 10px 25px var(--card-shadow);
                        margin-top: 50px;
                        border: 1px dashed #E5E7EB;
                    }
                    
                    .no-blogs h3 {
                        font-size: 24px;
                        margin-bottom: 15px;
                        color: var(--text-primary);
                    }
                    
                    .no-blogs p {
                        font-size: 16px;
                        margin-bottom: 25px;
                    }
                    
                    .no-blogs svg {
                        color: var(--primary-color);
                        opacity: 0.6;
                        margin-bottom: 20px;
                    }
                    
                    .create-blog-btn {
                        display: inline-flex;
                        align-items: center;
                        background-color: var(--primary-color);
                        color: white;
                        padding: 12px 24px;
                        border-radius: 8px;
                        text-decoration: none;
                        font-weight: 600;
                        transition: all var(--animation-duration) ease;
                        border: none;
                        cursor: pointer;
                    }
                    
                    .create-blog-btn:hover {
                        background-color: var(--primary-dark);
                        transform: translateY(-2px);
                        box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
                    }
                    
                    .create-blog-btn svg {
                        margin-right: 8px;
                        opacity: 1;
                    }
                    
                    /* Responsive design */
                    @media (max-width: 768px) {
                        .blog-card {
                            margin-bottom: 25px;
                        }
                        
                        .blog-title {
                            font-size: 20px;
                        }
                        
                        .blog-content {
                            max-height: 110px;
                            padding: 0 25px 20px;
                        }
                        
                        .blog-header {
                            padding: 20px 25px 10px;
                        }
                        
                        .blog-actions {
                            padding: 15px 25px;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .blog-header, .blog-content {
                            padding-left: 20px;
                            padding-right: 20px;
                        }
                        
                        .blog-actions {
                            padding: 15px 20px;
                            flex-direction: column;
                            align-items: stretch;
                            gap: 12px;
                        }
                        
                        .blog-buttons {
                            justify-content: space-between;
                        }
                        
                        .edit-btn, .delete-btn {
                            flex: 1;
                            justify-content: center;
                        }
                    }
                `}
            </style>

            <div className={`blog-container ${animateIn ? 'animate-in' : ''}`}>
                {allBlogs.length > 0 ? (
                    allBlogs.map((blog, index) => (
                        <div 
                            key={index} 
                            className="blog-card"
                            onMouseEnter={() => setHoveredBlog(blog.id)}
                            onMouseLeave={() => setHoveredBlog(null)}
                            style={{ transitionDelay: `${index * 0.05}s` }}
                        >
                            <div className="blog-header">
                                <div className="blog-category">
                                    {blog.category || 'Technology'}
                                </div>
                                <h3 className="blog-title">{blog.title}</h3>
                                <div className="blog-meta">
                                    <div className="blog-date">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        {formatDate(blog.date)}
                                    </div>
                                    <div className="blog-read-time">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        {blog.readTime || '5 min read'}
                                    </div>
                                </div>
                            </div>
                            <div className="blog-content">
                                <Markdown>{blog.description}</Markdown>
                            </div>
                            <div className="blog-actions">
                                <a className="view-link" href={`/blogView/${blog.id}`}>
                                    View more
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </a>
                                <div className="blog-buttons">

                                    <button 
                                        className={`delete-btn ${confirmDelete === blog.id ? 'confirm-delete' : ''}`}
                                        onClick={() => {
                                            if (confirmDelete === blog.id) {
                                                deleteBlog(blog.id);
                                            } else {
                                                setConfirmDelete(blog.id);
                                                setTimeout(() => setConfirmDelete(null), 3000);
                                            }
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                        {confirmDelete === blog.id ? 'Confirm' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-blogs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="12" y1="18" x2="12" y2="12"></line>
                            <line x1="9" y1="15" x2="15" y2="15"></line>
                        </svg>
                        <h3>No blogs found</h3>
                        <p>Start creating your first blog post!</p>
                        <button 
                            className="create-blog-btn"
                            onClick={() => navigate("/createBlog")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Create New Blog
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}