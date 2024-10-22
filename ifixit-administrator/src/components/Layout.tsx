import { BreadcrumbsWithIcon } from "./BreadcrumbsWithIcon";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <BreadcrumbsWithIcon />

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
