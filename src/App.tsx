// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Info from "./pages/infoPage";
import WelcomePage from "./pages/welcomePage";
import MobileHome from "./pages/mobileHome";
import SettingPage from "./pages/settingPage";
import { getUserIdFromCookie } from "./utils/auth.utils";
import { ROUTES } from "./components/constants";
import { UserStateProvider, useUserState } from "./components/context/userProvider";
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';   // Or choose a different theme
import 'primereact/resources/primereact.min.css';           // Core PrimeReact styles
import 'primeicons/primeicons.css';                         // PrimeIcons for icons
import ProfileDetailsPage from "./pages/profileDetailsPage";
import { getProfileData } from "./components/profile/services/profile.service";
import SubscriptionPage from "./pages/subscriptionPage";
import PrivacyPolicy from "./pages/privacyPolicy";
import TermsOfService from "./pages/termsOfService";
import PrivateRoute from "./components/private-route";
import { SubscriptionProvider, useSubscriptionState } from "./components/context/subscriptionProvider";
import EnterprisePage from "./pages/enterprisePage";
import MyPlanPage from "./pages/myPlanPage";
import { Toaster } from "react-hot-toast";
import PrivateRouteWithChecks from "./components/private-route-with-checks";

import 'react-phone-input-2/lib/material.css'
const App: React.FC = () => {
  const navigate = useNavigate();
  const { setContextUserData } = useUserState();
  const { setFreeTrialDate, setIsSubscribed, setExpiryDate, setSubscriptionEndDate } = useSubscriptionState();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = getUserIdFromCookie();

  const getUserDetails = async (userId: string) => {
    if (userId) {
      setIsLoading(true);
      try {
        const response = await getProfileData(userId);
        const freeTrialDate = new Date(response?.data?.freeTrialDate);
        const today = new Date();

        // Calculate the difference in time (in milliseconds)
        const diffInMs = freeTrialDate.getTime() - today.getTime();

        // Convert the difference to days and handle the -0 case
        let diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
        diffInDays = diffInDays === -0 ? 0 : diffInDays;
        setIsSubscribed(response?.data?.isSubscribed);

        // Handle free trial logic after response is fully processed
        if (!response?.data?.isSubscribed) {
          if (diffInDays <= 0) {
            navigate(ROUTES.SUBSCRIPTION); // Ensure this runs only after valid checks
          } else {
            setExpiryDate(freeTrialDate); // Update expiry date only after data is correct
          }
        }

        setFreeTrialDate(diffInDays.toString());
        setContextUserData(response?.data);
        setSubscriptionEndDate(new Date(response?.data?.subscriptionEndDate));

      } catch (err) {
        console.error('Error fetching profile data:', err);
      } finally {
        setIsLoading(false); // Ensure loading state is handled correctly
      }
    }
  }

  useEffect(() => {
    if (userId) {
      getUserDetails(userId);
    }

  }, [userId]);


  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/getstarted" element={<WelcomePage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/profile" element={<ProfileDetailsPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
          <Route path="/my-plan" element={<MyPlanPage />} />
        </Route>
        <Route element={<PrivateRouteWithChecks />}>
          <Route path="/info" element={<Info />} />
          <Route path="/home" element={<MobileHome />} />
        </Route>
      </Routes>
    </>
  );
};

const AppWrapper: React.FC = () => (
  <PrimeReactProvider>
    <Router>
      <UserStateProvider>
        <SubscriptionProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              success: {
                style: {
                  background: 'white',
                  color: 'green',
                },
              },
              error: {
                style: {
                  background: 'red',
                  color: 'white',
                },
              },
            }}
          />

          <App />
        </SubscriptionProvider>
      </UserStateProvider>
    </Router >
  </PrimeReactProvider>
);

export default AppWrapper;