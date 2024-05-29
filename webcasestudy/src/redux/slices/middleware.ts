import { Middleware } from "@reduxjs/toolkit";

export const localStorageMiddleware: Middleware = (store) => (next) => (action:any) => {
  const result = next(action);
  
  // Eğer aksiyon debt ile ilgili ise, localStorage'a yaz
  if (action.type.startsWith("finance/")) {
    const state = store.getState();
    localStorage.setItem("debts", JSON.stringify(state.finance.debts));
  }
  
  return result;
};
