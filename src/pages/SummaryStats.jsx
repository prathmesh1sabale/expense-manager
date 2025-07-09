import React from "react";
import "./SummaryStats.css"; // Optional for card styling

const StatCard = ({ icon, value, label, alt }) => (
  <div className="col-6 col-md-3 mb-4">
    <div className="card-box text-center p-3 shadow-sm rounded bg-white">
      <img src={icon} alt={alt} className="stat-icon mb-2" />
      <h5 className="fw-bold">₹{parseFloat(value || 0).toFixed(2)}</h5>
      <p className="text-muted mb-0">{label}</p>
    </div>
  </div>
);

const SummaryStats = ({ totalCredit = 0, totalDebit = 0 }) => {
  const creditPlusDebit = totalCredit + totalDebit;
  const creditMinusDebit = totalCredit - totalDebit;

  return (
    <div className="row">
      <StatCard
        icon="https://img.icons8.com/color/96/000000/bank-cards.png"
        alt="Credit icon"
        value={totalCredit}
        label="Total Credit"
      />
      <StatCard
        icon="https://img.icons8.com/color/96/000000/bank-cards.png"
        alt="Debit icon"
        value={totalDebit}
        label="Total Debit"
      />
      <StatCard
        icon="https://img.icons8.com/color/96/000000/money-bag.png"
        alt="Total icon"
        value={creditPlusDebit}
        label="Credit + Debit"
      />
      <StatCard
        icon="https://img.icons8.com/color/96/000000/money-transfer.png"
        alt="Net Balance icon"
        value={creditMinusDebit}
        label="Credit - Debit"
      />
    </div>
  );
};

export default SummaryStats;
