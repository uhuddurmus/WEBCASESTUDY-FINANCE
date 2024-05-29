import React from "react";

interface PaymentListProps {
  passedPayments: any[];
  incomingPayments: any[];
}

const PaymentList: React.FC<PaymentListProps> = ({ passedPayments, incomingPayments }) => {
  return (
    <div className="col-12 d-flex card bg-white bg-opacity-75 p-5 mt-1 mb-1">
      <div className="row">
        <div className="col-md-6 text-secondary">
          <div className="row">
            <h3>Passed Payments:</h3>

            {passedPayments.length === 0 ? (
              <div className="h6">
                Congratulations, you have no overdue payments!
              </div>
            ) : (
              <div
                className="row"
                id="scrollstyle"
                style={{
                  maxHeight: "200px",
                  overflowY: "scroll",
                  scrollbarColor: "red",
                }}
              >
                {passedPayments.map((payment: any, index: any) => (
                  <div key={index}>
                    <div className="h6">{payment.debtName}</div>
                    <div>
                      Payment Date: {payment.paymentDate.slice(0, 10)}
                    </div>
                    <div>Price: {payment.paymentAmount}</div>
                    <div>{payment.daysUntilDue}</div>
                    <hr />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6 text-secondary">
          <div className="row">
            <h3>Incoming Payments:</h3>

            {incomingPayments.length === 0 ? (
              <div className="h6">
                Congratulations, you have no overdue payments!
              </div>
            ) : (
              <div
                className="row"
                id="scrollstyle"
                style={{
                  maxHeight: "200px",
                  overflowY: "scroll",
                  scrollbarColor: "red",
                }}
              >
                {incomingPayments.map((payment: any, index: any) => (
                  <div key={index}>
                    <div className="h6">{payment.debtName}</div>
                    <div>
                      Payment Date: {payment.paymentDate.slice(0, 10)}
                    </div>
                    <div>Price: {payment.paymentAmount}</div>
                    <div>{payment.daysUntilDue}</div>
                    <hr />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
