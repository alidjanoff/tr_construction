import { useState, useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { HomeData } from '../Models/HomeModels';
import HomeService from '../Service/HomeService';
import { HomeContext } from './HomeContext';

interface HomeProviderProps {
  children: ReactNode;
}

export const HomeProvider = ({ children }: HomeProviderProps) => {
  const { i18n } = useTranslation();
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentLang = i18n.language || 'az';

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
    <HomeContext.Provider value={{ homeData, isLoading, error, currentLang, refreshData }}>
      {children}
    </HomeContext.Provider>
  );
};
