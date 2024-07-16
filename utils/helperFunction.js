// Helper function to check if a string is a valid number
const isNumeric = (value) => {
  return /^\d+$/.test(value);
};

module.exports = {
    isNumeric
}