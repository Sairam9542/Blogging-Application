import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <style>
        {`
          .modern-footer {
            background: linear-gradient(to right, #f8f9fa, #f1f2f6);
            padding: 20px 0;
            margin-top: 50px;
            border-top: 1px solid #eaeaea;
            position: relative;
            overflow: hidden;
          }
          
          .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 20px;
          }
          
          .footer-content {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
          }
          
          .footer-logo {
            font-weight: 600;
            color: #6d46e4;
            margin-right: 8px;
            transition: transform 0.3s ease;
          }
          
          .footer-container:hover .footer-logo {
            transform: rotate(360deg);
          }
          
          .footer-text {
            color: #666;
            font-size: 14px;
            transition: color 0.3s ease;
          }
          
          .footer-name {
            color: #333;
            font-weight: 500;
            position: relative;
            transition: all 0.3s ease;
          }
          
          .footer-name:hover {
            color: #6d46e4;
          }
          
          .footer-name::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -2px;
            left: 0;
            background-color: #6d46e4;
            transition: width 0.3s ease;
          }
          
          .footer-name:hover::after {
            width: 100%;
          }
          
          .footer-wave {
            position: absolute;
            top: -10px;
            left: 0;
            width: 100%;
            height: 10px;
            background: repeating-linear-gradient(
              45deg,
              #6d46e4,
              #6d46e4 10px,
              #8f70e6 10px,
              #8f70e6 20px
            );
            opacity: 0.7;
          }
          
          @media (max-width: 768px) {
            .modern-footer {
              padding: 15px 0;
            }
            
            .footer-text {
              font-size: 13px;
            }
          }
        `}
      </style>
      <footer className="modern-footer">
        <div className="footer-wave"></div>
        <div className="footer-container">
          <div className="footer-content">
            <span className="footer-logo">✦</span>
            <span className="footer-text">
              Copyright © {currentYear} <span className="footer-name">Sairam Ganapavarapu</span>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}