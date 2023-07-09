'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const context = createContext();

export const StateContext = ({ children }) => {
  const { data: session, status } = useSession();
  console.log(session)
  return (
    <context.Provider
      value={{
        session,
        status,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useAppState = () => useContext(context);
