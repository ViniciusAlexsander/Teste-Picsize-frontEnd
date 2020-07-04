// Types
export const insertLoanData = "loan/insertLoanData";

// Reducer
export const INITIAL_STATE = {
  cpf: null,
  uf: null,
  birth: null,
  requestedAmount: null,
  deadlinesMonths: null,
  taxPerMonth: null,
  totalPayable: null,
  plots: null,
};

export default (state, action) => {
  if (!state) state = INITIAL_STATE;
  switch (action.type) {
    case insertLoanData:
      return {
        ...state,
        cpf: action.payload.cpf,
        uf: action.payload.uf,
        birth: action.payload.birth,
        requestedAmount: action.payload.requestedAmount,
        deadlinesMonths: action.payload.deadlinesMonths,
        taxPerMonth: action.payload.taxPerMonth,
        totalPayable: action.payload.totalPayable,
        plots: action.payload.plots,
      };

    default:
      return state;
  }
};

// Action creators
export const updateDataLoan = (dataLoan) => {
  return {
    type: insertLoanData,
    payload: { ...dataLoan },
  };
};
