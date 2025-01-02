export default (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false, // Set loading to false after successful fetch
        transactions: action.payload,
        error: null, // Clear any previous errors
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        loading: false, // Set loading to false on error as well
        error: action.payload,
      };
    case 'SET_LOADING': // Add this case
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};