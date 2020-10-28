export function calculateLoan(loan) {
  return {
    type: '@loan/CALCULATE',
    loan
  }
}