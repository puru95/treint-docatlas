import React, { ReactNode, createContext, useContext, useState } from 'react';

const SubscriptionContext = createContext<any | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [freeTrialDate, setFreeTrialDate] = useState<string | null>(null);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [expiryDate, setExpiryDate] = useState<string | null>(null);
    const [subscriptionEndDate, setSubscriptionEndDate] = useState<string | null>(null);

    const contextValue = {
        freeTrialDate,
        setFreeTrialDate,
        isSubscribed,
        setIsSubscribed,
        expiryDate,
        setExpiryDate,
        subscriptionEndDate,
        setSubscriptionEndDate
    };

    return (
        <SubscriptionContext.Provider value={contextValue}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export const useSubscriptionState = (): any => {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error('useUserState must be used within a SubscriptionProvider');
    }
    return context;
};