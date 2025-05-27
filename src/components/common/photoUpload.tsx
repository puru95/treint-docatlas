import React, { useEffect, useRef, useState } from 'react';
import { IoIosCamera } from "react-icons/io";
import defaultProfile from '../../assets/default-profile-setting-page.svg';
import { postFileUploadData } from '../services/common.services';
import { isMobileWeb } from '../../utils/mobile-app-check';
// import { handleAlertMsg } from '../utils/common-functions';

const PhotoUpload = ({ label, name, onChange, isReadOnly, preValue }: any) => {
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | ''>('');

    useEffect(() => {
        // Listening to messages from Flutter WebView
        const handleFlutterMessage = (event: MessageEvent) => {
            // Assuming Flutter sends an object like { type: 'image', base64: 'data:image/png;base64,...' }
            const { data } = event;
            console.log({ data })
            if (data.receiveImageFromFlutter) {
                // Update the image state with the base64 data
                setImage(data.receiveImageFromFlutter);
                console.log('Received base64 image from Flutter:', data.receiveImageFromFlutter);
            }
        };

        window.addEventListener('message', handleFlutterMessage);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('message', handleFlutterMessage);
        };
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        console.log({ file })
        if (file && !file.type.startsWith('image/')) {
            // handleAlertMsg('Please upload only image', 'warning');
            return;
        }
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setImage(URL.createObjectURL(img)); // This now correctly sets a string
        }

        setFileName(file?.name || 'No file chosen');
        //setFieldValue('employeeIdImage', event.currentTarget.files?.[0]);

        try {
            const submitData = {
                imageMultipartFile: file,
                document: JSON.stringify({
                    "entity_id": null,
                    "entity_type": "ONBOARDING"
                })
            }
            const imageMultipartFile = file;
            const response = postFileUploadData(submitData).then((response: any) => {
                onChange(response.data.id);
            }).catch((err: any) => {
                console.log("API Erro", err);
            });
            return;
        } catch (error) {
            // Handle API errors
            console.log('API Error:', error);

        }
    };
    const handleImageClick = () => {
        console.log(isMobileWeb())
        if (isMobileWeb()) {
            console.log('mobile view')
        } else {
            // @ts-ignore
            WebChannel.postMessage('Image Upload');
        }
    }
    return (
        <div className="flex justify-center items-center ">
            <label className="relative">

                <input name={label} type="file" className="sr-only" ref={fileInputRef} onChange={(e) => handleFileChange(e)} disabled={isReadOnly} />
                <div className="w-25 h-25 rounded-full overflow-hidden  flex justify-center items-center cursor-pointer" onClick={handleImageClick}>
                    {image ? (
                        <img src={image} alt="Uploaded" className="aspect-square overflow-hidden shrink-0 max-w-full rounded-[50%]" />
                    ) : preValue ? <img className='aspect-square overflow-hidden shrink-0 max-w-full rounded-[50%]' src={preValue} alt="Preview" /> : (
                        <img
                            loading="lazy"
                            src={defaultProfile}
                            className="aspect-square overflow-hidden shrink-0 max-w-full rounded-[50%] "
                        />)}
                </div>
                <div className="absolute bottom-0 right-0 p-1 bg-gray-600 rounded-full shadow-lg cursor-pointer">
                    <IoIosCamera className="h-4 w-4 text-gray-400" />
                </div>
            </label>
        </div>
    );
};

export default PhotoUpload;
