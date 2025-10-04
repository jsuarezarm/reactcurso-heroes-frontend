import { SlashIcon } from 'lucide-react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '../ui/breadcrumb';
import { Link, useLocation } from 'react-router';

export const CustomBreadcrumbs = () => {
  const { pathname } = useLocation();

  return (
    <Breadcrumb className="my-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
        </BreadcrumbItem>
        {
          pathname.split('/').filter(Boolean).map((pathPart) => {
            return (
              <div className="flex gap-2 items-center" key={`bc_${pathPart}`}>
                <BreadcrumbSeparator key={`sep_${pathPart}`}>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <Link to={`/${pathPart}`}>{pathPart.charAt(0).toUpperCase() + pathPart.slice(1)}</Link>
                </BreadcrumbItem>
              </div>
            );
          })
        }
      </BreadcrumbList>
    </Breadcrumb>
  );
};
