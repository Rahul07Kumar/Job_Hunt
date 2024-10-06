import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-8 items-center object-center">
            <a href="/" className="text-xl font-bold">Job Hunt</a>
            <p className="text-sm">2024 Your Company. All rights reserved.</p>
          </div>
          <div className="flex space-x-4  md:mt-8">
            <a href="https://facebook.com" className="hover:text-gray-600" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.676 0.593c0-0.593-0.193-1.058-0.583-1.448-0.39-0.39-0.855-0.583-1.448-0.583h-5.617v3.226h3.105c0.331 0 0.589 0.258 0.589 0.589v5.623c0 0.331-0.258 0.589-0.589 0.589h-3.105v12.154h-3.226v-12.154h-2.519v-3.226h2.519v-2.442c0-2.485 1.513-4.183 3.658-4.183 1.035 0 1.982 0.077 2.801 0.151v3.196h-1.923c-1.489 0-1.783 0.694-1.783 1.747v2.24h3.558l-0.455 3.226z"/>
              </svg>
            </a>
            <a href="https://twitter.com" className="hover:text-gray-600" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.937 9.937 0 0 1-2.828 0.775 4.958 4.958 0 0 0 2.164-2.726c-0.938 0.554-1.977 0.957-3.084 1.174a4.916 4.916 0 0 0-8.368 4.482c-4.086-0.204-7.715-2.161-10.14-5.137a4.928 4.928 0 0 0 1.523 6.582 4.896 4.896 0 0 1-2.227-0.616v0.062a4.917 4.917 0 0 0 3.946 4.819 4.922 4.922 0 0 1-2.214 0.084 4.925 4.925 0 0 0 4.6 3.417A9.886 9.886 0 0 1 0 19.256a13.945 13.945 0 0 0 7.548 2.21c9.057 0 14.004-7.515 14.004-14.004 0-0.215-0.005-0.428-0.012-0.641A10.058 10.058 0 0 0 24 4.557z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" className="hover:text-gray-600" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.452 20.452h-3.569v-5.679c0-1.352-0.027-3.092-1.888-3.092-1.888 0-2.178 1.527-2.178 3.099v5.671h-3.563v-11.15h3.419v1.533h0.048c0.477-0.905 1.644-1.863 3.386-1.863 3.616 0 4.284 2.377 4.284 5.473v6.008zM5.336 8.207c-1.18 0-2.141 0.973-2.141 2.177 0 1.18 0.964 2.16 2.141 2.16 1.188 0 2.148-0.973 2.148-2.16 0-1.204-0.96-2.177-2.148-2.177zM6.623 20.452h-3.564v-11.15h3.564v11.15zM21.396 0h-18.792c-1.161 0-2.09 0.929-2.09 2.09v18.82c0 1.161 0.929 2.09 2.09 2.09h18.792c1.161 0 2.09-0.929 2.09-2.09v-18.82c0-1.161-0.929-2.09-2.09-2.09z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
