import { configureStore, Middleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import debtReducer from "./slices/debtSlice";

const localStorageMiddleware: Middleware = (store) => (next) => (action:any) => {
  const result = next(action);

  // Eğer aksiyon debt ile ilgili ise, localStorage'a yaz
  if (action.type.startsWith("finance/")) {
    const state = store.getState();
    localStorage.setItem("debts", JSON.stringify(state.debt.debts));
  }

  return result;
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    debt: debtReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
