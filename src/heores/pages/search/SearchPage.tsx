import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heores/componentes/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { HeroGrid } from '@/heores/componentes/HeroGrid';
import { useSearchParams } from 'react-router';
import { useSearch } from '@/heores/hooks/useSearch';

export const SearchPage = () => {

  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;

  const { data: searchHeroes = [] } = useSearch({ name, strength });

  return (
    <>
      {/* Header */}
      <CustomJumbotron
        title="Búsqueda de Superhéores"
        description="Descubre, explora y administra superhéroes y villanos"
      />

      <CustomBreadcrumbs />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and search */}
      <SearchControls />

      {/* Heroes */}
      <HeroGrid heroes={searchHeroes} />
    </>
  );
};

export default SearchPage;