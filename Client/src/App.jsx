import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Use `Navigate` instead of `Redirect`
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';

import { GlobalProvider } from './context/GlobalState';
import './App.css';

// Blank Page Component
function BlankPage() {
  return <h1>This is a blank page!</h1>;
}

// Main FMA Dashboard Components
function Dashboard() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <AddTransaction />
        <TransactionList />
      </div>
    </GlobalProvider>
  );
}

// App Component
function App() {
  return (
    <Router>
      <Routes>
        {/* Blank Page for '/' */}
        <Route path="/" element={<BlankPage />} />

        {/* Dashboard Page for '/dashboard' */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redirect any other routes to the blank page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
