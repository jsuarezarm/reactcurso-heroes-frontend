import { cn } from '@/lib/utils';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@radix-ui/react-navigation-menu';
import { Link, useLocation } from 'react-router';

export const CustomMenu = () => {

  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  return (

    <NavigationMenu className="py-5">
      <NavigationMenuList className="flex flex-row gap-2">
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild
            className={cn(isActive('/') && 'bg-slate-200', 'p-2 rounded-md')}
          >
            <Link to="/">Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild
            className={cn(isActive('/search') && 'bg-slate-200', 'p-2 rounded-md')}
          >
            <Link to="/search">Buscar superhéores</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>

  );
};
