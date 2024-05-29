import react, { useState, useEffect } from "react";
import PayModal from "./PayModal";

const DebtList = (debts: any) => {
  const [clicked, setClicked] = useState("");
  if (!Array.isArray(debts.debts)) {
    return <></>;
  }
  console.log("debt",debts)
  return (
    <div className="" id="scrollstyle" style={{overflowY:'scroll',height:'720px'}}>
      <div className="row card" style={{  height:'720px'}}>
        <div className="d-flex p-4 justify-content-between bg-secondary bg-opacity-25 align-items-center ">
          <div className="col-md-1">#</div>
          <div className="col-md-1 h6">Debt Name</div>
          <div className="col-md-1 h6">Lender Name</div>
          <div className="col-md-1 h6">Debt Amount</div>
          <div className="col-md-1 h6">Debt Amount With Interest</div>
          <div className="col-md-1 h6">Debt Remaining</div>
          <div className="col-md-1 h6">Debt Installment</div>
          <div className="col-md-1 h6">Debt interest Rate</div>
          <div className="col-md-1 h6">Debt Payment Start</div>
          <div className="col-md-1 h6">Details</div>
        </div>
        {debts?.debts?.map((debt: any, index: any) => {
          return (
            <>
              <div
                className={
                  index % 2 == 0
                    ? "d-flex p-4 justify-content-between align-items-center "
                    : "d-flex p-4 justify-content-between bg-secondary bg-opacity-25 align-items-center "
                }
                style={{ cursor: "pointer" }}
                onClick={() => {
                  clicked == debt.id ? setClicked("") : setClicked(debt.id);
                }}
              >
                <div className="col-md-1">{index + 1}</div>
                <div className="col-md-1">{debt.debtName}</div>
                <div className="col-md-1">{debt.lenderName}</div>
                <div className="col-md-1">{debt.debtAmount}</div>
                <div className="col-md-1">{debt.amount}</div>
                <div className="col-md-1">{debt.lastDebt}</div>
                <div className="col-md-1">{debt.installment}</div>
                <div className="col-md-1">{debt.interestRate}</div>
                <div className="col-md-1">
                  {debt.paymentStart?.slice(0, 10)}
                </div>
                <div className="col-md-1">
                  {clicked == debt.id ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-arrow-up-circle"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-arrow-down-circle"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div
                className={
                  clicked == debt.id
                    ? "d-flex p-4 justify-content-between align-items-center "
                    : "d-none"
                }
              >
                <div className="row h6 mt-2 ">
                  <div className="col-3 text-center">Payment Date</div>
                  <div className="col-3 text-center">PaymentAmount</div>
                  <div className="col-3 text-center">isPaid</div>
                  <div className="col-3 text-center">Pay</div>

                  <hr className="pt-2 mt-2" />
                </div>
                {debt?.paymentPlan?.map((plan: any, index: any) => {
                  console.log("plan ",plan)
                  return (
                    <div className="row">
                      <div className="col-3 text-center">
                        {plan.paymentDate?.slice(0, 10)}
                      </div>
                      <div className="col-3 text-center">
                        {plan.paymentAmount}₺
                      </div>
                      <div className="col-3 text-center">
                        {plan.isPaid ? (
                          <div className="text-success">Paid</div>
                        ) : (
                          <div className="text-danger">Not Paid</div>
                        )}
                      </div>
                      <div className="col-3 text-center">
                        {plan.isPaid ? (
                          <PayModal props={plan}/>
                        ) : (
                          <PayModal props={plan}/>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default DebtList;
