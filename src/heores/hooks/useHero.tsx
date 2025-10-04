import { useQuery } from '@tanstack/react-query';
import { getHeroAction } from '../actions/get-hero.action';

export const useHero = (idSlug: string) => {
  return useQuery({
    queryKey: ['heroes', { idSlug }],
    queryFn: () => getHeroAction(idSlug),
    staleTime: 1000 * 60 * 5, // 5 minutos,
    retry: false,
  });
};
