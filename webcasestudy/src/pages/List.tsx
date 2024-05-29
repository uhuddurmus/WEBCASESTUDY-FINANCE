import React, { useEffect } from "react";
import DebtList from "../components/DebtList";
import { fetchDebts } from "../redux/slices/debtSlice";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";



const List: React.FC<any> = () => {
  const { debts, status, error } = useSelector(
    (state: RootState) => state.debt
  );

  useEffect(() => {
    try {
      dispatch<any>(fetchDebts());
    } catch (e) {
      toast.error("Login failed. Please check your credentials and try again.");
      console.error(e);
    }
  }, [dispatch]);

  if (status === "loading") {
    toast.info("loading");
    return (
      <>
        <ToastContainer />
        Loading . . .
      </>
    );
  }

  if (status === "failed") {
    toast.error("Getting usser data is failed please log out and try again");
    return (
      <>
        <ToastContainer />
        "Getting usser data is failed please log out and try again"
      </>
    );
  }

  return (
    <>
      <DebtList debts={debts} />
    </>
  );
};

export default List;
function dispatch<T>(arg0: AsyncThunkAction<any, void, AsyncThunkConfig>) {
  throw new Error("Function not implemented.");
}

