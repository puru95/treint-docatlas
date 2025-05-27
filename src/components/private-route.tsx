// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAccessTokenFromCookie, getCheckSubscription } from "../utils/auth.utils";
import SubscriptionPage from "../pages/subscriptionPage";
import Header from "./info/views/header";
import { IS_MOBILE } from "./constants";

const PrivateRoute: React.FC = () => {
    const token = getAccessTokenFromCookie();
    // Check if the token exists, if not redirect to the login page
    if (!token) {
        return <Navigate to="/" />;
    }

    // // If the checkSubscription is true, redirect to the subscription page
    // if (checkSubscription) {
    //     return <SubscriptionPage />;
    // }

    // If everything is fine, render the child routes
    return (
        <div>
            {!IS_MOBILE && <Header />}
            <Outlet />
        </div>
    );
};

export default PrivateRoute;
