import React from 'react';
import MyPlan from '../components/myplan/component/myPlan';

interface MyPlanPageProps {
    // Define your component props here
}

const MyPlanPage: React.FC<MyPlanPageProps> = () => {
    return (
        <div className='flex justify-center'>
            <MyPlan />
        </div>
    );
};

export default MyPlanPage;
