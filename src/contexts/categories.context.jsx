import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState();

  useEffect(() => {
    getCategoriesAndDocuments("categories").then((categoryMap) => {
      setCategoriesMap(categoryMap);
    });
  }, []);

  if (!categoriesMap) {
    return <div>carregando...</div>;
  }

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
