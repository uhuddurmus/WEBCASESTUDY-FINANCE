import React, { useState, useEffect } from "react";
import DebtOverview from "./DebtOverview";
import PaymentList from "./PaymentList";


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

  return (
    <div className="row d-flex align-items-center ">
      <div className="row">
        <DebtOverview
          totalDebtAmount={totalDebtAmount}
          totalAmount={totalAmount}
          totalLastDebt={totalLastDebt}
        />
        <PaymentList
          passedPayments={passedPayments}
          incomingPayments={incomingPayments}
        />
      </div>
    </div>
  );
};

export default DebtStatistics;
