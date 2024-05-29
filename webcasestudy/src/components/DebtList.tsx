import react, { useState , useEffect } from "react";

const DebtList = (debts: any) => {
  const [clicked, setClicked] = useState("");
  if (!Array.isArray(debts.debts)) {
    return <></>;
  }
  return (
    <div className="section">
      <div className="row card" style={{ overflow: "hidden" }}>
        <div className="d-flex justify-content-between bg-secondary bg-opacity-25 align-items-center ">
          <div className="col-md-1">#</div>
          <div className="col-md-1">Debt Name</div>
          <div className="col-md-1">Lender Name</div>
          <div className="col-md-1">Debt Amount</div>
          <div className="col-md-1">Debt Amount With Interest</div>
          <div className="col-md-1">Debt Remaining</div>
          <div className="col-md-1">Debt Installment</div>
          <div className="col-md-1">Debt interest Rate</div>
          <div className="col-md-1">Debt Payment Start</div>
        </div>
        {debts?.debts?.map((debt: any, index: any) => {
          return (
            <>
              <div
                className={
                  index % 2 == 0
                    ? "d-flex justify-content-between align-items-center "
                    : "d-flex justify-content-between bg-secondary bg-opacity-25 align-items-center "
                }
                style={{cursor:'pointer'}}
                onMouseEnter={() => setClicked(debt.id)}
                onMouseLeave={() => setClicked("")}
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
              </div>
              <div
                className={
                  clicked == debt.id
                    ? "row d-flex justify-content-between align-items-center "
                    : "d-none"
                }
              >
                <div className="row m-2 h6">
                  <div className="col-4 text-center">Payment Date</div>
                  <div className="col-4 text-center">PaymentAmount</div>
                  <div className="col-4 text-center">isPaid</div>
                  <hr />
                </div>
                {debt?.paymentPlan?.map((plan: any, index: any) => {
                  return (
                    <div className="row">
                      <div className="col-4 text-center">
                        {plan.paymentDate?.slice(0, 10)}
                      </div>
                      <div className="col-4 text-center">
                        {plan.paymentAmount}₺
                      </div>
                      <div className="col-4 text-center">
                        {plan.isPaid ? (
                          <div className="text-success">Paid</div>
                        ) : (
                          <div className="text-danger">Not Paid</div>
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
