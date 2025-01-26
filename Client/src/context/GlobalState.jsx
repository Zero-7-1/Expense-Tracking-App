import React, { createContext, useReducer, useEffect } from 'react'; 
import AppReducer from './AppReducer';
import axios from 'axios';
import { useAuth } from './authContext';

// Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true, // Initial loading state
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const { currentUser } = useAuth();

  const getAuthToken = async () => {
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return null;
  };

  // Actions
  async function getTransactions() {
    try {
      const token = await getAuthToken();
      const res = await axios.get('https://financial-management-app-backend.onrender.com/api/v1/transactions', {     // http://localhost:5001/api/v1/transactions
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        dispatch({
          type: 'GET_TRANSACTIONS',
          payload: res.data.data, // Update state with fetched transactions
        });
      } else {
        throw new Error('No data received');
      }
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.message,
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false }); // Set loading to false after request
    }
  }

  async function deleteTransaction(id) {
    try {
      const token = await getAuthToken();
      await axios.delete(`https://financial-management-app-backend.onrender.com/api/v1/transactions/${id}`, {    // http://localhost:5001/api/v1/transactions/${id}
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.message,
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAuthToken()}`,
      },
    };

    try {
      const res = await axios.post('https://financial-management-app-backend.onrender.com/api/v1/transactions', transaction, config);   // http://localhost:5001/api/v1/transactions

      if (res.data) {
        dispatch({
          type: 'ADD_TRANSACTION',
          payload: res.data.data,
        });
      } else {
        throw new Error('No data received');
      }
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.message,
      });
    }
  }

  // Call getTransactions on component mount (optional)
  useEffect(() => {
    if (currentUser) {
      getTransactions();
    }
  }, [currentUser]); // Empty dependency array ensures it runs only once

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      error: state.error,
      loading: state.loading,
      getTransactions,
      deleteTransaction,
      addTransaction,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};