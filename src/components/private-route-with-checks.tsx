import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserState } from "./context/userProvider";
import { useSubscriptionState } from "./context/subscriptionProvider";
import { IS_MOBILE, ROUTES } from "./constants";
import Header from "./info/views/header";
import Loader from "./common/loader";

const PrivateRouteWithChecks: React.FC = () => {
    const { contextUserData } = useUserState();
    const { isSubscribed, freeTrialDate, subscriptionEndDate } = useSubscriptionState();
    const isDataLoading = !contextUserData || !freeTrialDate;
    const additionalCheck = () => {
        if ((!isSubscribed && parseInt(freeTrialDate) <= 0)) {
            return false;
        }
        // if (new Date() > subscriptionEndDate) {
        //     return false;
        // }
        return true;
    };
    // if (isDataLoading) {
    //     return <div><Loader /></div>; // Or use a spinner component
    // }

    return (
        additionalCheck() ? <div>
            {!IS_MOBILE && <Header />}
            <Outlet />
        </div> : <Navigate to={ROUTES.SUBSCRIPTION} />
    );
};

export default PrivateRouteWithChecks;
