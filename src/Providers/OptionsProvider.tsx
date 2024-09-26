// 'use client'
// import React, { createContext, useState, useContext } from "react";



// type GlobalContext = {

//   toggleSIdeBar: boolean;
//   setToggleSIdeBar: React.Dispatch<React.SetStateAction<boolean>>;
// };

// type GlobalContextProviderProps = {
//   children: React.ReactNode;
// };

// export const GlobalContext = createContext<GlobalContext | null>(null);



// export function GlobalThemeProvider({
//   children,
// }: GlobalContextProviderProps) {


//   const [toggleSIdeBar, setToggleSIdeBar] = useState<boolean>(false);
//   return (
//     <GlobalContext.Provider
//       value={{ setToggleSIdeBar, toggleSIdeBar }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// }



// export function useGlobalTheme() {
//   const context = useContext(GlobalContext);
//   if (!context) {
//     throw new Error(
//       "useGlobalContext must be used within a GlobalContextProvider"
//     );
//   }
//   return context;
// }

// // Usage:
// // const { theme, setTheme } = useGlobalContext();
