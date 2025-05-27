// src/components/Login/Login.tsx
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrainDocMarine from '../../assets/Docpedia-logo.png';
import TreintLogo from '../../assets/Treint-logo1.svg';
import loginBackGround from '../../assets/loginBg.png';
import { getAccessTokenFromCookie, setAccessTokenCookie, setUserIdCookie } from "../../utils/auth.utils";
import { IS_MOBILE, ROUTES } from "../constants";
import { getLoggedIn } from "../services/info.services";

interface LoginProps {
    onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState<string>("");
    const [buttontext, setButtontext] = useState<string>("Continue");
    const [password, setPassword] = useState<string>("");
    const [isOtpScreen, setIsOtpScreen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isMobileView, setIsMobileView] = useState<boolean>(IS_MOBILE);
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        // Basic email regex pattern
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Please fill in both email and password.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setError('');
        const data = {
            email: email,
            password: password,
        }
        setButtontext('Submiting...');

        getLoggedIn(data)
            .then((response: any) => {
                console.log({response})
                if (response?.data?.data?.access_token) {
                    setAccessTokenCookie(response?.data?.data?.access_token);
                    setUserIdCookie(response?.data.data.user_id);
                    IS_MOBILE ? navigate(ROUTES.GET_STARTED) : navigate(ROUTES.INFO);

                } else {
                    setButtontext('Continue');
                    setError(response?.data?.data?.message)
                }
            })
            .catch((err: any) => {

                console.log('error-', err, err?.response?.data?.message);
                setError(err?.response?.data?.message);
                setButtontext('Continue');
            });



    };

    useEffect(() => {
        const accessToken = getAccessTokenFromCookie();
        if (accessToken) {
            IS_MOBILE ? navigate(ROUTES.HOME) : navigate(ROUTES.INFO);
        }
    }, [])

    return (

        <div className="flex md:bg-gradient-to-t from-black from-2% via-[#001745] via-20% to-[#001745] to-68% mt-[-20px]">
            {!isMobileView && <div className="flex">
                <div className="flex">
                    <img src={loginBackGround} alt="banner image" className="h-[80%]" />
                </div>
                {!isMobileView && <div className="absolute left-10 bottom-16 text-[28px] text-white max-w-[calc(100%-500px)]">
                    <span className="font-extrabold">Instant, reliable medical knowledge empowering doctors </span>
                    <span>to enhance patient care anytime, anywhere.</span>
                </div>}
            </div>}

            <div className={`flex max-md:w-full items-center justify-center min-h-[90vh] text-white`}>
                <form onSubmit={handleSubmit} className="absolute md:right-0 md:mr-5 max-md:mt-24 bg-[#10131FE5] backdrop-blur-lg w-[330px] md:w-[376px] max-md:py-5 md:p-5 rounded-lg h-[96%]">
                    <div className="relative w-full h-[100%]">
                        {!isMobileView && <img
                            loading="lazy"
                            src={BrainDocMarine}
                            className=" w-[78px] h-[70px] overflow-hidden cursor-pointer mt-[76px]"
                            alt='Brain DocMarine'
                        />}
                        <div className="px-2">
                            {!isMobileView ? <h2 className="mb-4 text-base font-bold text-white mt-4">Welcome to <span className="text-[#00A3FF]">Doc</span>Atlas</h2> : <h2 className="flex flex-col mb-4 text-2xl font-black text-white mt-4">Welcome <span className="flex text-sm font-extrabold gap-1">to <span><span className="text-[#00A3FF]"> Doc</span>Atlas</span></span> </h2>}
                            {!isMobileView && <span className="text-[28px] font-semibold text-white leading-8">Lets get started with your mobile number</span>}
                            <div className="mb-5 mt-10">

                                <div className="flex flex-col gap-1 text-white">
                                    <label htmlFor="mobile" className="block text-white mb-0 text-sm font-medium">
                                        Email
                                    </label>
                                    <InputText name="email" placeholder="Enter you email" className="p-2 text-sm text-gray-700" onChange={(e) => setEmail(e.target.value)} />
                                    <label htmlFor="mobile" className="block text-white mt-3 text-sm font-medium">
                                        Password
                                    </label>
                                    <InputText name="password" type="password" placeholder="Enter you password" className="p-2 text-sm text-gray-700" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="text-xs mt-1 font-semibold text-red-500">{error}</div>
                                {isMobileView && <div className="text-[10px] mt-2 font-semibold"><span className="text-[#00A3FF] cursor-pointer underline" onClick={() => navigate(ROUTES.PRIVACY_POLICY)}>Privacy Policy</span> & <span className="text-[#00A3FF] cursor-pointer underline" onClick={() => navigate(ROUTES.TERMS_OF_SERVICES)}>Terms & Conditions</span> apply</div>}
                            </div>
                            <button
                                type="button"
                                className="w-[320px] max-md:absolute max-md:bottom-0 h-10 bg-[#00A3FF] text-sm font-semibold text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300" onClick={handleSubmit}
                            >
                                {buttontext}
                            </button>
                        </div>

                        {!isOtpScreen && !isMobileView && <p className="text-white text-center font-medium text-[10px] mt-6"><span className="text-[#00A3FF] underline cursor-pointer" onClick={() => navigate(ROUTES.PRIVACY_POLICY)}>Privacy Policy</span> & <span className="text-[#00A3FF] underline cursor-pointer" onClick={() => navigate(ROUTES.TERMS_OF_SERVICES)}>Terms of Service</span> apply.</p>}
                        {!isMobileView && <div className="text-white text-center absolute bottom-0 left-1 right-1">
                            <div className="flex items-center justify-center gap-2">
                                <p className="text-xs font-medium">Powered by </p>
                                <img
                                    loading="lazy"
                                    src={TreintLogo}
                                    className=" w-[82px] h-[15px]"
                                    alt='Brain DocMarine'
                                />
                            </div>
                            <div className="opacity-70 text-[10px] mt-2">
                                Empowering healthcare through innovation &
                                AI powered solution
                            </div>
                        </div>}
                    </div>
                </form>

            </div>

        </div>




    );
};

export default Login;
