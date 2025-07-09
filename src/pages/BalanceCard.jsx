import React from "react";
import "./BalanceCard.css";

const BalanceCard = ({ balance = 0, onOpenCredit, onOpenDebit }) => {
  const formattedBalance = `₹${parseFloat(balance || 0).toFixed(2)}`;

  return (
    <div className="card balance-card shadow-sm p-4 text-center">
      <div className="d-flex justify-content-center gap-3 mb-3">
        <img
          src="https://img.icons8.com/color/96/000000/money.png"
          alt="Money icon"
          className="balance-icon"
        />
        <img
          src="https://img.icons8.com/color/96/000000/sales-performance.png"
          alt="Performance icon"
          className="balance-icon"
        />
      </div>

      <h2 className="balance-amount text-success">{formattedBalance}</h2>
      <p className="text-muted mb-4">Current Balance</p>

      <div className="row">
        <div className="col-6">
          <button
            className="btn btn-outline-success w-100"
            onClick={onOpenCredit}
          >
            + Add Credit
          </button>
        </div>
        <div className="col-6">
          <button
            className="btn btn-outline-danger w-100"
            onClick={onOpenDebit}
          >
            - Add Debit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
