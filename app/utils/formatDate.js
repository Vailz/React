const moment = require("moment/moment");

// Функция для форматирования даты.
const formatDate = (date) => {
  // Использование moment для форматирования даты в виде строки "DD/MM/YYYY".
  return moment(date).format("DD/MM/YYYY");
};

export default formatDate;