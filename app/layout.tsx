// app/layout.tsx
import './globals.css'; // Import your global styles
import React from 'react';

export const metadata = {
    title: 'Music Store',
    description: 'A music shop page built with Next.js and Tailwind CSS',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className="bg-[#f7f0dc] text-[#333]">
                <header className="flex justify-between items-center p-2 border-b-2 border-[#f7f0dc] bg-[#ffebb4]">
                    <div className="flex items-center space-x-2">
                        <img src="/house.png" alt="house" className="w-10" />
                        <span className="text-lg font-bold">CoC</span>
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8 text-lg font-bold">
                            <li><a href="#" className="hover:text-[#c9a828]">HOME</a></li>
                            <li><a href="#" className="hover:text-[#c9a828]">ABOUT</a></li>
                            <li><a href="#" className="hover:text-[#c9a828]">CONTACT</a></li>
                        </ul>
                    </nav>
                    <div className="hamburger md:hidden cursor-pointer" id="hamburger">
                        <div className="w-8 h-1 bg-black mb-1"></div>
                        <div className="w-8 h-1 bg-black mb-1"></div>
                        <div className="w-8 h-1 bg-black mb-1"></div>
                    </div>
                </header>

                {/* Drawer Menu */}
                <div className="drawer fixed top-0 left-[-500px] w-[300px] h-full bg-gray-700 text-white z-50 transition-all ease-in-out duration-400" id="drawer">
                    <div className="drawer-header flex justify-between items-center p-4 bg-[#fff6c3be] border-b">
                        <h2 className="text-white font-bold">Menu</h2>
                        <button className="drawer-close text-white text-2xl" id="closeDrawer">&times;</button>
                    </div>
                    <a className="a block p-4 text-lg text-gray-200 hover:bg-gray-800" href="#">HOME</a>
                    <a className="a block p-4 text-lg text-gray-200 hover:bg-gray-800" href="#">ABOUT</a>
                    <a className="a block p-4 text-lg text-gray-200 hover:bg-gray-800" href="#">CONTACT</a>
                </div>

                {children} {/* Render the child components (page content) */}

            <footer className="my-5 bg-[#f6dfa1] border-t-1 border-gray-800 shadow-lg">
                <div className="space-y-2 text-left md:text-center">
                        <h3 className="text-xl font-semibold">Lorem ipsum dolor sit amet.</h3>
                        <p className="text-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis deleniti autem nobis, corporis officia temporibus.</p>
                        <h2 className="text-xl font-semibold">Copyright © All Right Reserved</h2>
                    </div>
                </footer>
            </body>
        </html>
    );
};

export default RootLayout;
