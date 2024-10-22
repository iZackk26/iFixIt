import { Breadcrumbs } from "@material-tailwind/react";
import { useLocation, Link } from "react-router-dom";

export function BreadcrumbsWithIcon() {
  const location = useLocation();
  const normalizedPath = location.pathname.toLowerCase().replace(/\/+$/, "");
  const isHome = normalizedPath === "/";
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x);

  const homeIcon = (
    <Link
      to="/"
      className="opacity-60"
      aria-label="Home"
      aria-current={isHome ? "page" : undefined}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    </Link>
  );

  if (isHome) {
    return (
      <Breadcrumbs>
        {homeIcon}
      </Breadcrumbs>
    );
  }

  return (
    <Breadcrumbs className="bg-transparent">
      {homeIcon}

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const label = value.charAt(0).toUpperCase() + value.slice(1);
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span key={to} className="font-semibold">
            {label} 
          </span>
        ) : (
          <Link key={to} to={to} className="opacity-60">
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
