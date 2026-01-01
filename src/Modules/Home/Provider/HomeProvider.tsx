import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type HomeData } from '../Models/HomeModels';
import HomeService from '../Service/HomeService';

interface HomeContextType {
  homeData: HomeData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

interface HomeProviderProps {
  children: ReactNode;
}

export const HomeProvider = ({ children }: HomeProviderProps) => {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await HomeService.getHomeData();
      setHomeData(data);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error fetching home data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = async () => {
    await fetchData();
  };

  return (
    <HomeContext.Provider value={{ homeData, isLoading, error, refreshData }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = (): HomeContextType => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error('useHome must be used within a HomeProvider');
  }
  return context;
};

export default HomeContext;
