import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDebts } from "../redux/slices/debtSlice";
import { RootState } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import DebtStatistics from "../components/DebtStatistics";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../components/Loading";

const Home: React.FC = () => {
  const nav = useNavigate()
  function goList(){
    nav("/list"); 
  }
  const dispatch = useDispatch();
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
      <div className="row" style={{position:'fixed',top:'50%',left:'50%'}}>
      <ToastContainer />
      <CircularIndeterminate/>
    </div>
    );
  }

  if (status === "failed") {
    toast.error("Getting usser data is failed please log out and try again");
    return (
      <div className="card" >
        <ToastContainer />
        "Getting usser data is failed please log out and try again"
      </div>
    );
  }


  return (
    <div>
      <div className="d-flex justify-content-end mt-5">
        <button onClick={goList} className="btn bg-success text-white h5 float-right me-3 bg-success bg-opacity-75">
          {" "}
          Go To List
          <svg
            style={{ marginTop: "-4px", marginLeft: "5px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-layout-text-sidebar-reverse"
            viewBox="0 0 16 16"
          >
            <path d="M12.5 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm0 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm.5 3.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
            <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM4 1v14H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm1 0h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5z" />
          </svg>
        </button>
      </div>
      <DebtStatistics debts={debts} />
    </div>
  );
};

export default Home;
