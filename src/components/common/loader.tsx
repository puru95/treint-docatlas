/**
 * File Name: loader.tsx
 * File Path: src/common/components/loader.tsx
 * File Description: This file contains the default loading spinner component.
 * Author: Kunal Kumar
 * Date: 2024-02-01
 * Company Name: Treint Business
 */

import React from 'react';
import { LoaderIcon } from 'react-hot-toast';

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen z-50">
            <LoaderIcon />
        </div>
    );
};

export default Loader;