import React, { useEffect } from "react";
import DebtList from "../components/DebtList";
import { fetchDebts } from "../redux/slices/debtSlice";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { ToastContainer, toast } from "react-toastify";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddNewDebt from "../components/AddNewDebt";
import CircularIndeterminate from "../components/Loading";

const List: React.FC<any> = () => {
  const nav = useNavigate();
  function goHome() {
    nav("/home");
  }
  const { debts, status, error } = useSelector(
    (state: RootState) => state.debt
  );
  const dispatch = useDispatch();

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
      <div className="row" style={{position:'fixed',top:'50%',left:'50%'}}>
      <ToastContainer />
      <CircularIndeterminate/>
    </div>
    );
  }

  if (status === "failed") {
    toast.error("Getting debt data is failed please log out and try again");
    return (
      <div className="card">
        <ToastContainer />
        "Getting debt data is failed please log out and try again"
      </div>
    );
  }

  return (
    <div className="row mt-5">
      <div className="d-flex justify-content-end">
        
        <AddNewDebt/>
        <button
          onClick={goHome}
          className="btn btn-success text-white h5 float-right me-3  bg-opacity-75"
        >
          {" "}
          Go Home
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginTop: "-4px", marginLeft: "5px" }}
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-house"
            viewBox="0 0 16 16"
          >
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
          </svg>
        </button>
      </div>
      <DebtList debts={debts} />
    </div>
  );
};

export default List;
