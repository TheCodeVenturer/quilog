 // Use the client directive for using usePathname hook.
 'use client'
 
 import { NavBar,NavBarForAccount } from './components/NavBar';

 // Use usePathname for catching route name.
 import { usePathname } from 'next/navigation';
 
export const dynamic = "force-static";

 export const LayoutProvider = ({ children }) => {
     const pathname = usePathname();
     return (
         <>
             {pathname !== "/account/login" && pathname !== "/account/register"?<NavBar/>:<NavBarForAccount/>}

             {children}
         </>
     )
 };