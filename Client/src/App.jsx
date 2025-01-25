import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Use `Navigate` instead of `Redirect`
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';

import { GlobalProvider } from './context/GlobalState';
import './App.css';

import LogReg from './components/LogReg/LogReg';
import { AuthProvider, useAuth } from './context/authContext';
import Nav from './components/Nav';



// Main FMA Dashboard Components (would separate from app)
function Dashboard() {
  return (
    <GlobalProvider>
      <Nav />
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

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
}

// main  App Component
function App() {
  return (
    <AuthProvider> 
    <Router>
      <Routes>
       
        <Route path="/" element={<LogReg />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        {/* Redirect any other routes to the blank page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
