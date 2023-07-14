'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";



import { getUserData } from "../fetchUserDetails";
const context = createContext();

export const StateContext = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({});
  useEffect(() => {
    if(status==="authenticated"){
      async function getUser() {
        const userData = await getUserData(session.user.id);
        setUser(userData);
      }
      getUser();
    }
  },[session,status])
  return (
    <context.Provider
      value={{
        session,
        status,
        user,
        setUser
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useAppState = () => useContext(context);
