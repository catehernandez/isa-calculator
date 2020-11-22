//use because default NumberFormat currency method always forces 2 decimal places
const toUSD = (number) => {
  const valueInUSD =
    '$' +
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(number);

  return valueInUSD;
};

export default toUSD;
