import React, { useState } from "react";
import axios from "axios";
import './Modal.css';
import "./CreditModal.css"; // Optional for extra styles

const CreditModal = ({ show, onClose, onSuccess }) => {
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredit = async () => {
    if (!date || !note || !amount || parseFloat(amount) <= 0) {
      return alert("Please fill all fields with valid values.");
    }

    const uid = localStorage.getItem("id");
    setLoading(true);

    try {
      const res = await axios.get(
        `https://codingshika.com/APP/EXP/insert_credit.php`,
        {
          params: {
            uid,
            date,
            note,
            debit: 0,
            credit: amount,
          },
        }
      );

      if (res.data?.posts?.status === "200") {
        alert("Credit Successful!");
        onSuccess(); // Refresh data
        onClose(); // Close modal
      } else {
        alert("Credit Failed. Try again.");
      }
    } catch (err) {
      alert("API Error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block credit-modal-overlay" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title w-100 text-center">Add Credit</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Note</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter amount"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={handleCredit}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Credit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditModal;
