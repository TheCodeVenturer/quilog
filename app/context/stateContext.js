'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";


const context = createContext();

export const StateContext = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({});
  useEffect(() => {
    if(status==="authenticated"){
      async function getUser() {
        const res = await fetch(`/api/${session.user.id}`);
        const userData = await res.json();
        if(userData.error) return;
        setUser({name:userData.name,image:userData.image})
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
