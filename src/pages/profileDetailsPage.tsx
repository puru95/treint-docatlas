import React from 'react';
import ProfileDetails from '../components/profile/component/profile-details';

interface ProfileDetailsPageProps {
    // Define your props here
}

const ProfileDetailsPage: React.FC<ProfileDetailsPageProps> = (props) => {
    // Add your component logic here

    return (
        <div>
            <ProfileDetails />
        </div>
    );
};

export default ProfileDetailsPage;
