import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';

export default function BlogDetails() {
    const blog = useLoaderData();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Animation for content loading
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <>
            <style>
                {`
                    .blog-details-container {
                        max-width: 900px;
                        margin: 50px auto;
                        transition: all 0.5s ease;
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    
                    .blog-details-container.loaded {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    .blog-details-card {
                        background-color: #fff;
                        border-radius: 12px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
                        overflow: hidden;
                        padding: 0;
                        position: relative;
                    }
                    
                    .blog-header {
                        padding: 30px 40px;
                        position: relative;
                    }
                    
                    .blog-title {
                        font-size: 32px;
                        font-weight: 700;
                        color: #333;
                        margin-bottom: 10px;
                        line-height: 1.3;
                    }
                    
                    .blog-date {
                        font-size: 14px;
                        color: #777;
                        margin-bottom: 20px;
                        display: flex;
                        align-items: center;
                    }
                    
                    .blog-date::before {
                        content: '';
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: linear-gradient(to right, #6d46e4, #8f70e6);
                        margin-right: 8px;
                    }
                    
                    .blog-divider {
                        height: 1px;
                        background: linear-gradient(to right, rgba(240, 240, 240, 0.5), #f0f0f0, rgba(240, 240, 240, 0.5));
                        margin: 0 40px;
                    }
                    
                    .blog-content {
                        padding: 40px;
                        line-height: 1.8;
                        color: #444;
                        font-size: 17px;
                    }
                    
                    .blog-content h1, .blog-content h2, .blog-content h3 {
                        color: #333;
                        margin-top: 30px;
                        margin-bottom: 15px;
                    }
                    
                    .blog-content p {
                        margin-bottom: 20px;
                    }
                    
                    .blog-content a {
                        color: #6d46e4;
                        text-decoration: none;
                        border-bottom: 1px solid rgba(109, 70, 228, 0.3);
                        transition: border-color 0.3s ease;
                    }
                    
                    .blog-content a:hover {
                        border-color: #6d46e4;
                    }
                    
                    .blog-content img {
                        max-width: 100%;
                        border-radius: 8px;
                        margin: 20px 0;
                    }
                    
                    .blog-content blockquote {
                        border-left: 4px solid #6d46e4;
                        padding-left: 20px;
                        margin-left: 0;
                        font-style: italic;
                        color: #555;
                    }
                    
                    .blog-content code {
                        background-color: #f8f8f8;
                        padding: 2px 5px;
                        border-radius: 4px;
                        font-family: monospace;
                        font-size: 0.9em;
                    }
                    
                    .blog-content pre {
                        background-color: #f8f8f8;
                        padding: 15px;
                        border-radius: 8px;
                        overflow-x: auto;
                        margin: 20px 0;
                    }
                    
                    .blog-content pre code {
                        background-color: transparent;
                        padding: 0;
                    }
                    
                    .edit-button {
                        position: absolute;
                        top: 30px;
                        right: 40px;
                        background: linear-gradient(to right, #6d46e4, #8f70e6);
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 30px;
                        font-size: 14px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }
                    
                    .edit-button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(109, 70, 228, 0.3);
                    }
                    
                    .edit-button:active {
                        transform: translateY(0);
                    }
                    
                    .edit-icon {
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                    }
                    
                    /* Responsive styles */
                    @media (max-width: 768px) {
                        .blog-details-container {
                            margin: 30px 20px;
                        }
                        
                        .blog-header {
                            padding: 25px;
                        }
                        
                        .blog-divider {
                            margin: 0 25px;
                        }
                        
                        .blog-content {
                            padding: 25px;
                            font-size: 16px;
                        }
                        
                        .blog-title {
                            font-size: 26px;
                            padding-right: 60px;
                        }
                        
                        .edit-button {
                            top: 25px;
                            right: 25px;
                            padding: 8px 16px;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .blog-header {
                            padding: 20px;
                        }
                        
                        .blog-divider {
                            margin: 0 20px;
                        }
                        
                        .blog-content {
                            padding: 20px;
                        }
                        
                        .blog-title {
                            font-size: 22px;
                        }
                        
                        .edit-button {
                            padding: 6px 12px;
                            font-size: 12px;
                        }
                    }
                `}
            </style>

            <div className={`blog-details-container ${isLoaded ? 'loaded' : ''}`}>
                <div className="blog-details-card">
                    <div className="blog-header">
                        <h1 className="blog-title">{blog.title}</h1>
                        <div className="blog-date">{blog.date || 'Published recently'}</div>
                        <button 
                            className="edit-button"
                            onClick={() => navigate(`/editBlog/${blog.id}`)}
                        >
                            <svg className="edit-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                                <path 
                                    d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Edit
                        </button>
                    </div>
                    
                    <div className="blog-divider"></div>
                    
                    <div className="blog-content">
                        <Markdown>{blog.description}</Markdown>
                    </div>
                </div>
            </div>
        </>
    );
}