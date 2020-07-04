export default {
  setData(
    cpf,
    uf,
    birth,
    requestedAmount,
    deadlinesMonths,
    taxPerMonth,
    totalPayable,
    plots
  ) {
    return {
      type: "insertLoanData",
      payload: {
        cpf,
        uf,
        birth,
        requestedAmount,
        deadlinesMonths,
        taxPerMonth,
        totalPayable,
        plots,
      },
    };
  },
};
