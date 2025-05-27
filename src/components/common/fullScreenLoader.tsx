import React from 'react';

const FullScreenLoader = () => {
    return (
        <div className="flex flex-col fixed inset-0 z-50 items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <div className="text-xl font-bold tracking-wide mt-4 text-white flex">
                Analysing Data
                <span className="dot-anim ml-1">.</span>
                <span className="dot-anim delay-200">.</span>
                <span className="dot-anim delay-400">.</span>
            </div>
        </div>
    );
};

export default FullScreenLoader;
