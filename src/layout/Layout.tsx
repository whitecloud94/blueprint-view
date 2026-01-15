import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#FBFBFB] text-[#1D1D1F] selection:bg-blue-100">
        <div className="max-w-[700px] mx-auto px-6 py-20 antialiased">
            {children}
            </div>
            </div>
    );
};

export default Layout;