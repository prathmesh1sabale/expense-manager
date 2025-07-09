import React, { useMemo } from "react";
import "./TransactionTable.css"; // Optional for styling

const TransactionTable = ({ transactions = [] }) => {
  const { totalCredit, totalDebit, closingBalance } = useMemo(() => {
    let credit = 0;
    let debit = 0;
    let clBal = 0;

    transactions.forEach((tx) => {
      credit += parseFloat(tx.CREDIT || 0);
      debit += parseFloat(tx.DEBIT || 0);
      clBal = parseFloat(tx.CLBAL || clBal);
    });

    return {
      totalCredit: credit,
      totalDebit: debit,
      closingBalance: clBal,
    };
  }, [transactions]);

  return (
    <div className="transaction-table-wrapper mt-4">
      <h5 className="fw-semibold mb-3">🧾 Transaction History</h5>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>Date</th>
              <th>Note</th>
              <th className="text-success">Credit (₹)</th>
              <th className="text-danger">Debit (₹)</th>
              <th>Balance (₹)</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-muted">
                  No transactions available.
                </td>
              </tr>
            ) : (
              transactions.map((tx, idx) => (
                <tr key={idx}>
                  <td>{tx.DATE}</td>
                  <td>{tx.NOTE}</td>
                  <td>{parseFloat(tx.CREDIT || 0).toFixed(2)}</td>
                  <td>{parseFloat(tx.DEBIT || 0).toFixed(2)}</td>
                  <td>{parseFloat(tx.CLBAL || 0).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="fw-bold text-center">
              <td colSpan="2">Total</td>
              <td className="text-success">{totalCredit.toFixed(2)}</td>
              <td className="text-danger">{totalDebit.toFixed(2)}</td>
              <td>{closingBalance.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
