import React from 'react';

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="preloader__title">Loading</div>
            <div className="preloader__load">
                <div className="preloader__item item-1"></div>
                <div className="preloader__item item-2"></div>
                <div className="preloader__item item-3"></div>
                <div className="preloader__item item-4"></div>
                <div className="preloader__item item-5"></div>
                <div className="preloader__item item-6"></div>
                <div className="preloader__item item-7"></div>
                <div className="preloader__item item-8"></div>
                <div className="preloader__item item-9"></div>
            </div>
        </div>
    );
};

export default Preloader;