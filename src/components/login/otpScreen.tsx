import { useEffect, useRef, useState } from "react";
import { getUserData, validateOtp } from "../services/info.services";
import { setAccessTokenCookie, setCheckSubscription, setUserIdCookie } from "../../utils/auth.utils";
import { useNavigate } from "react-router-dom";
import { IS_MOBILE, ROUTES } from "../constants";
import { useUserState } from "../context/userProvider";
import { getProfileData } from "../profile/services/profile.service";
import { CiEdit } from "react-icons/ci";

interface OtpProps {
    mobile: string;
    referenceId: string;
    isMobileView: boolean;
    setIsOtpScreen: (value: boolean) => void;
    resendOtp: () => void;
}

const OtpScreen: React.FC<OtpProps> = ({ mobile, referenceId, isMobileView, setIsOtpScreen, resendOtp }) => {

    const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
    const [error, setError] = useState<string>('');
    const [timer, setTimer] = useState(30);
    const [resendDisabled, setResendDisabled] = useState(true);
    const [buttonText, setButtontext] = useState('Continue');
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const navigate = useNavigate();

    const { contextUserData, setContextUserData } = useUserState();

    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(otpValues.length).fill(null));

    useEffect(() => {
        // Focus on the first input field when the component is mounted
        inputRefs.current[0]?.focus();

        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 0) {
                    // Enable resend button when timer reaches 0
                    setResendDisabled(false);
                    return 30;
                } else {
                    return prevTimer - 1;
                }
            });
        }, 1000);

        // Clean up timer when component is unmounted
        return () => clearInterval(countdown);
    }, []);

    const handlePaste = (index: number, event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const clipboardData = event.clipboardData?.getData('Text');

        if (!clipboardData) return;

        const cleanData = clipboardData.replace(/\D/g, ''); // Remove non-numeric characters
        if (cleanData.length !== 6) {
            setError('Invalid OTP');
            return
        }; // Check length

        const otpArray = cleanData.split('');
        const newOtpValues = [...otpValues];
        otpArray.forEach((value, i) => {
            newOtpValues[i] = value;
            setOtpValues(newOtpValues);
        });
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value && index < otpValues.length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
        let count = 0;

        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);
        newOtpValues?.map((d) => {
            if (d) {
                count++;
            }
        })
        if (count === 6) {
            setError('')
        } else {
            setError('Invalid OTP')
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && index > 0 && !otpValues[index]) {
            // Focus on the previous input field if backspace is pressed and the current field is empty
            inputRefs.current[index - 1]?.focus();
        } else if (event.key.match(/[0-9]/) && index < otpValues.length - 1 && otpValues[index]) {
            // Focus on the next input field if a digit is entered and the current field is not the last one
            inputRefs.current[index + 1]?.focus();
        } else if (event.key === 'Backspace' && index > 0 && otpValues[index]) {
            // Remove the character at the current index if backspace is pressed and the current field is not empty
            const newOtpValues = [...otpValues];
            newOtpValues[index] = '';
            setOtpValues(newOtpValues);
        }
    };

    const handleResendClick = () => {
        // Disable the resend button and reset the timer when clicked
        setResendDisabled(true);
        setTimer(60);
        setError('');
        setOtpValues(['', '', '', '', '', '']);

        // Trigger the resend action
        resendOtp();
    };


    const handleVerifyOTP = () => {
        const otp = otpValues.join('');
        const data = {
            otp: otp,
            referenceId: referenceId,
        };

        if (otp?.length === 6) {
            setButtontext('Submitting');

            validateOtp(data)
                .then((response: any) => {
                    if (response?.data?.access_token) {
                        // setCheckSubscription(response?.data?.check_subscription);
                        setAccessTokenCookie(response.data.access_token);
                        setUserIdCookie(response.data.user_id);
                        // getUserDetails(response.data.user_id, response?.data?.check_subscription);
                        IS_MOBILE ? navigate(ROUTES.GET_STARTED) : navigate(ROUTES.INFO);

                    } else {
                        setButtontext('Continue');
                        setError('Invalid OTP')
                    }
                })
                .catch((err: any) => {
                    console.log('otp not sent', err, err?.response);
                    setError(err?.response?.data?.metadata?.reason)
                    setButtontext('Continue');
                });

        } else {
            // setError('Invalid OTP')
            setButtontext('Continue');
        }
        return
        // Close the OTP popup after verification

    };

    const getUserDetails = (userId: string, checkSubscription: boolean) => {
        if (userId) {
            const response = getProfileData(userId).then((response: any) => {
                setContextUserData(response?.data);

                IS_MOBILE ? navigate(ROUTES.GET_STARTED) : navigate(ROUTES.INFO);

            }).catch((err: Error) => {

            });
        }
    }

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            // Trigger the button click when Enter is pressed
            buttonRef.current?.click();
        }
    };

    useEffect(() => {
        // Add keydown event listener when the component mounts
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            // Clean up the event listener when the component unmounts
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className="-mt-2 md:mt-5 max-md:h-4/5">
            <span className="text-[20px] font-bold text-white leading-8">Mobile number verification</span>
            <p className="text-sm mt-3">
                Please enter the 6 Digit OTP we sent to<br />
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#00A3FF]">+91 {mobile}</span>
                    <span><CiEdit size={20} className="cursor-pointer" onClick={() => setIsOtpScreen(false)} /></span>
                </div>
            </p>
            <div className="mb-5 mt-6 h-full max-md:relative">
                <div className="text-blue-600 text-xs font-semibold leading-9 w-full mt-6 max-md:max-w-full max-md:mt-10">
                    <span className="text-gray-600 font-normal">Didn’t received the code? </span>
                    <span className="font-semibold text-blue-600" aria-label="Resend code">
                        {resendDisabled ? (
                            `resend code in ${timer}`
                        ) : (
                            <button onClick={handleResendClick} disabled={resendDisabled} className="font-semibold text-blue-600">
                                Click here to resend
                            </button>
                        )}
                    </span>
                </div>
                <div className="items-stretch flex w-full gap-3 md:gap-4 mt-4 md:pr-20 max-md:max-w-full max-md:flex-wrap max-md:pr-5 max-sm:pr-2">
                    {otpValues.map((value, index) => (
                        <input
                            key={index}
                            type="tel"
                            maxLength={1}
                            value={value}
                            onPaste={(e) => handlePaste(index, e)}
                            onChange={(e) => {
                                let inputValue = e.target.value;
                                // Format input as per the desired pattern
                                inputValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
                                inputValue = inputValue.slice(0, 1); // Ensure maximum length
                                handleOtpChange(index, inputValue)
                            }}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="text-white text-xl font-bold text-center whitespace-nowrap border border-[#262626] bg-[#1F222E] aspect-[0.8970588235294118] justify-center items-stretch px-2 py-3 rounded-xl border-solid max-md:pr-5 max-sm:pr-2 w-10 h-12"
                            ref={(el) => (inputRefs.current[index] = el)}
                        />
                    ))}
                </div>
                {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={handleVerifyOTP}
                    className="w-full max-md:absolute max-md:bottom-0 h-10 mt-6 bg-[#00A3FF] text-sm font-semibold text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    )
}

export default OtpScreen;