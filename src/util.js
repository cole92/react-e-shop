// Funkcija za formatiranje broja u valutu (npr. $12.34)
const util = {
  formatCurrency: function (num) {
    return `$${Number(num.toFixed(1)).toLocaleString()}`;
  },
};

export default util;
