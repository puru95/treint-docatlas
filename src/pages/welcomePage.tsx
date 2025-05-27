// src/pages/LoginPage.tsx
import React from "react";
import bannerImage from '../assets/aiPerson.svg';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const WelcomePage: React.FC = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate('/home');
    }

    return (
        <div className="flex flex-col relative h-screen items-center py-5  bg-[#001834] mt-[-20px]">
            <div className="flex w-full mt-[10%] ">
                <div className="flex md:place-content-center w-full pr-2 bg-gradient-to-lb from-[#001834] via-[#001834] to-[#004D4D]"
                    style={{
                        backgroundBlendMode: 'color-dodge',
                        mixBlendMode: 'color-dodge'
                    }}>
                    <img src={bannerImage} alt="image" className="w-full md:w-[30%]" />
                </div>
            </div>
            <div className="flex flex-wrap mt-16 px-5 md:mt-28 md:max-w-[460px]">
                <span className="text-sm min-[400px]:text-lg font-extrabold text-center text-white">Instant, reliable medical knowledge empowering doctors<span className="font-light"> to enhance patient care anytime, anywhere.</span></span>
            </div>
            <div className="flex absolute bottom-10 md:bottom-20 w-full md:w-[320px] mt-6 px-5">
                <button type="button" className="flex w-full bg-[#00A3FF] text-sm font-semibold text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300" onClick={handleGetStarted}>
                    <div className="flex w-full items-center justify-between">
                        <span></span>
                        <span>Get Started</span>
                        <MdOutlineKeyboardArrowRight className="w-5 h-5" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;
