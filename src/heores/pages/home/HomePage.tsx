import { use, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heores/componentes/HeroStats';
import { HeroGrid } from '@/heores/componentes/HeroGrid';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { useHeroSummary } from '@/heores/hooks/useHeroSummary';
import { usePaginatedHero } from '@/heores/hooks/usePaginatedHero';
import { FavoriteHeroContext } from '@/heores/context/FavoriteHeroContext';

export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  const setActiveTab = (tab: string, category?: string) => {
    setSearchParams((prev) => {
      prev.set('tab', tab);
      prev.set('category', category || tab);
      prev.set('page', '1');
      return prev;
    });
  };

  // const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'heroes' | 'villains'>('all');

  // useEffect(() => {
  //   getHeroesByPageAction().then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  //* Esto se lleva a un custom hook
  // const { data: heroesResponse } = useQuery({
  //   queryKey: ['heroes', { page, limit }],
  //   queryFn: () => getHeroesByPageAction(+page, +limit),
  //   staleTime: 1000 * 60 * 5, // 5 minutos
  // });
  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);

  //* Esto se lleva a un custom hook para reutilizar.
  // const { data: summary } = useQuery({
  //   queryKey: ['summary-information'],
  //   queryFn: getSummaryAction,
  //   staleTime: 1000 * 60 * 5, // 5 minutes
  // });
  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de Superhéores"
          description="Descubre, explora y administra superhéroes y villanos"
        />

        <CustomBreadcrumbs />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setActiveTab('all')}>Todos ({summary?.totalHeroes})</TabsTrigger>
            <TabsTrigger value="favorites" onClick={() => setActiveTab('favorites')} className="flex items-center gap-2">
              Favoritos ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setActiveTab('heroes', 'hero')}>Héroes ({summary?.heroCount})</TabsTrigger>
            <TabsTrigger value="villains" onClick={() => setActiveTab('villains', 'villain')}>Villanos ({summary?.villainCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Mostrar todos los favoritos */}
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value="heroes">
            {/* Mostrar todos los héroes */}
            <h1>Héroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Mostrar todos los villanos */}
            <h1>Villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {
          selectedTab !== 'favorites' &&
          <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
        }
      </>
    </>
  );
};
