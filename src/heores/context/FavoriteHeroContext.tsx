import { createContext, useEffect, useState, type PropsWithChildren } from 'react';
import type { Hero } from '../types/hero.interface';

interface FavoriteHeroContextProps {
  // state
  favorites: Hero[];
  favoriteCount: number;

  // methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContextProps);

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem('favorites');

  // Se debería hacer la validación de la información del localStorage con, por ejemplo, Zod.

  return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

  const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage);

  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find(h => h.id === hero.id);

    if (heroExist) {
      const newFavorites = favorites.filter(h => h.id !== hero.id);
      setFavorites(newFavorites);
      return;
    }

    setFavorites([...favorites, hero]);
  };

  const isFavorite = (hero: Hero) => {
    return favorites.some(h => h.id === hero.id);
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        // State
        favorites: favorites,
        favoriteCount: favorites.length,

        // Methods
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
