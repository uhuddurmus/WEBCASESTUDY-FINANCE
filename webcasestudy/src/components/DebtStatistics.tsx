import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import DebtList from "./DebtList";

const DebtStatistics = (debts: any) => {
  const [totalDebtAmount, setTotalDebtAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalLastDebt, setTotalLastDebt] = useState(0);
  const [upcomingPayments, setUpcomingPayments] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(debts.debts)) {
      let totalDebtAmount = 0;
      let totalAmount = 0;
      let totalLastDebt = 0;
      let upcomingPayments: any[] = [];

      debts.debts.forEach((debt: any) => {
        totalDebtAmount += debt.debtAmount;
        totalAmount += debt.amount;
        totalLastDebt += debt.lastDebt;
        debt.paymentPlan.forEach((payment: any) => {
          const paymentDate = new Date(payment.paymentDate);
          const currentDate = new Date();

          // Eğer ödeme tarihi geçmişse ve ödeme yapılmamışsa
          if (paymentDate > currentDate && !payment.isPaid) {
            const daysDifference = Math.ceil(
              (paymentDate.getTime() - currentDate.getTime()) /
                (1000 * 60 * 60 * 24)
            );
            if (daysDifference <= 20) {
              upcomingPayments.push({
                debtName: debt.debtName,
                paymentDate: payment.paymentDate,
                paymentAmount: payment.paymentAmount,
                daysUntilDue: `${daysDifference} days left`,
                isPassed: false,
              });
            }
          } else if (paymentDate < currentDate && !payment.isPaid) {
            const daysDifference = Math.ceil(
              (currentDate.getTime() - paymentDate.getTime()) /
                (1000 * 60 * 60 * 24)
            );
            if (daysDifference <= 20) {
              upcomingPayments.push({
                debtName: debt.debtName,
                paymentDate: payment.paymentDate,
                paymentAmount: payment.paymentAmount,
                daysUntilDue: `${daysDifference} days past`,
                isPassed: true,
              });
            }
          }
        });
      });

      setTotalDebtAmount(totalDebtAmount);
      setTotalAmount(totalAmount);
      setTotalLastDebt(totalLastDebt);
      setUpcomingPayments(upcomingPayments);
    }
  }, [debts]);

  if (!Array.isArray(debts.debts)) {
    return <></>;
  }

  const passedPayments = upcomingPayments.filter((payment) => payment.isPassed);
  const incomingPayments = upcomingPayments.filter(
    (payment) => !payment.isPassed
  );

  const paidAmount = totalAmount - totalLastDebt;
  const paidPercentage = Math.round((paidAmount / totalAmount) * 100);
  const remainingPercentage = 100 - paidPercentage;

  return (
    <div className="row d-flex align-items-center ">
      <div className="row">
        <div className="col-12 d-flex card bg-opacity-75 p-5 bg-white mb-1">
          {/* Toplam borçlar ve ödemeler burada görüntülenecek */}
          <div className="row d-flex">
            <div className="col-md-6 d-flex align-items-center text-secondary">
              <div className="row">
                <div className="d-flex justify-content-between">
                  <div className="h5">Principal:</div>
                  <div className="h4 text-primary">{totalDebtAmount}₺</div>
                </div>
                <hr className="m-1" />
                <div className="d-flex justify-content-between">
                  <div className="h5">Total Debt:</div>
                  <div className="h4 text-primary">{totalAmount}₺</div>
                </div>
                <hr className="m-1" />
                <div className="d-flex justify-content-between">
                  <div className="h5">Remaining From Total Debt:</div>
                  <div className="h4 text-primary">{totalLastDebt}₺</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: paidPercentage, label: `Paid`, color: "green" },
                      { id: 1, value: remainingPercentage, label: `Remaining`, color: "blue" },
                    ],
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                width={400}
                height={200}
              />
              <div id="html-dist"></div>
            </div>
          </div>
          {/* Geçmiş ve 5 gün kalmış ödemelerin listesi burada olacak */}
        </div>

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
      </div>
    </div>
  );
};

export default DebtStatistics;
