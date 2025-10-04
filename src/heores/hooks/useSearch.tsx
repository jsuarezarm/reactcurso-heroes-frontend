import { useQuery } from '@tanstack/react-query';
import { searchHeroesAction } from '../actions/search-heroes.action';

interface Props {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

export const useSearch = (searchOptions: Props) => {
  const { name, team, category, universe, status, strength } = searchOptions;

  return useQuery({
    queryKey: ['search', { name, team, category, universe, status, strength }],
    queryFn: () => searchHeroesAction(searchOptions),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};