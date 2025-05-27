// src/pages/LoginPage.tsx
import React from "react";
import Login from "../components/login/login";

const LoginPage: React.FC = () => {
    const handleLogin = (email: string, password: string) => {
        console.log("Logging in with", email, password);
        // Perform login logic here
    };

    return (
        <div>
            <Login onLogin={handleLogin} />
        </div>
    );
};

export default LoginPage;
