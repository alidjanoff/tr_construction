import { createContext, useContext } from 'react';
import type { HomeData } from '../Models/HomeModels';

export interface HomeContextType {
    homeData: HomeData | null;
    isLoading: boolean;
    error: string | null;
    currentLang: string;
    refreshData: () => Promise<void>;
}

export const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const useHome = (): HomeContextType => {
    const context = useContext(HomeContext);
    if (context === undefined) {
        throw new Error('useHome must be used within a HomeProvider');
    }
    return context;
};
