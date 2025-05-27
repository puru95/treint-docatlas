import React from 'react';
import Subscription from '../components/subscription/component/subscription';

interface SubscriptionPageProps {
    // Add any props you need for the SubscriptionPage component
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = () => {
    return (
        <div className='w-full flex justify-center'>
            <Subscription />
        </div>
    );
};

export default SubscriptionPage;
