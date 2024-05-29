import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

interface DebtOverviewProps {
  totalDebtAmount: number;
  totalAmount: number;
  totalLastDebt: number;
}

const DebtOverview: React.FC<DebtOverviewProps> = ({ totalDebtAmount, totalAmount, totalLastDebt }) => {
  const paidAmount = totalAmount - totalLastDebt;
  const paidPercentage = Math.round((paidAmount / totalAmount) * 100);
  const remainingPercentage = 100 - paidPercentage;

  return (
    <div className="col-12 d-flex card bg-opacity-75 p-5 bg-white mb-1">
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
    </div>
  );
};

export default DebtOverview;
