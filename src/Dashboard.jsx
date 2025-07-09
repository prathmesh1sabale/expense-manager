import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./pages/Header";
import BalanceCard from "./pages/BalanceCard";
import CreditModal from "./pages/CreditModal";
import DebitModal from "./pages/DebitModal";
import SummaryStats from "./pages/SummaryStats";
import TransactionTable from "./pages/TransactionTable";
import Footer from "./pages/Footer";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [showCredit, setShowCredit] = useState(false);
  const [showDebit, setShowDebit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Logout
  const logout = () => {
    localStorage.clear();
    alert("You have been logged out.");
    navigate("/login");
  };

  // Theme load effect
  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDark);
  }, [isDark]);

  // Fetch data
  const fetchData = async () => {
    const uid = localStorage.getItem("id");
    if (!uid) return;

    try {
      setIsLoading(true);

      // Opening Balance
      const opbalRes = await axios.post(`https://codingshika.com/APP/EXP/opbal_list.php?uid=${uid}`);
      const opbal = parseFloat(opbalRes.data.posts.post[0]?.OPBAL || 0);
      setBalance(opbal);

      // Transaction List
      const txRes = await axios.get(`https://codingshika.com/APP/EXP/transaction_list.php?uid=${uid}`);
      const data = txRes.data.posts.post || [];

      let credit = 0;
      let debit = 0;

      data.forEach((tx) => {
        credit += parseFloat(tx.CREDIT || 0);
        debit += parseFloat(tx.DEBIT || 0);
      });

      setTotalCredit(credit);
      setTotalDebit(debit);
      if (data.length > 0) setBalance(parseFloat(data[data.length - 1].CLBAL || 0));
      setTransactions(data);
    } catch (error) {
      alert("Error fetching data. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
<div className="main-wrapper px-3 px-md-4" style={{ paddingTop: "80px", width: "100%", margin: 0 }}>
      <Header onLogout={logout} toggleTheme={toggleTheme} isDarkMode={isDark} />

      {isLoading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2 text-muted">Loading dashboard...</p>
        </div>
      ) : (
        <>
          <BalanceCard
            balance={balance}
            onOpenCredit={() => setShowCredit(true)}
            onOpenDebit={() => setShowDebit(true)}
          />
          <SummaryStats totalCredit={totalCredit} totalDebit={totalDebit} />
          <TransactionTable transactions={transactions} />
        </>
      )}

      <CreditModal show={showCredit} onClose={() => setShowCredit(false)} onSuccess={fetchData} />
      <DebitModal show={showDebit} onClose={() => setShowDebit(false)} onSuccess={fetchData} />
      <Footer />
    </div>
  );
};

export default Dashboard;
