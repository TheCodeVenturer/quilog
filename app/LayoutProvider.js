// Use the client directive for using usePathname hook.
"use client";

import { NavBar, NavBarForAccount } from "./_components/NavBar";

// Use usePathname for catching route name.
import { usePathname } from "next/navigation";

export const dynamic = "force-static";

export const LayoutProvider = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/account/login" && pathname !== "/account/register" ? (
        pathname === "/" ? (
          <NavBar classes="" />
        ) : (
          <NavBar classes="border-b shadow-lg bg-white/10" />
        )
      ) : (
        <NavBarForAccount />
      )}
      {children}
    </>
  );
};
