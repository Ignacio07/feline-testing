import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsVisible(scrollTop > 0);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-4 text-2xl right-4 bg-gray-800 text-white px-[22px] py-2 rounded-md shadow-xl 
                transition duration-300 hover:bg-gray-600
            ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            Arriba
        </button>
    );
};

export default ScrollToTopButton;