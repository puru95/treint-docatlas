import React, { ReactNode, createContext, useContext, useState } from 'react';

const UserContext = createContext<any | undefined>(undefined);

export const UserStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [contextUserData, setContextUserData] = useState<string | null>(null);

    const contextValue = {
        contextUserData,
        setContextUserData,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserState = (): any => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserState must be used within a UserStateProvider');
    }
    return context;
};