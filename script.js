const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('result');

convertBtn.addEventListener('click', async () => {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = document.getElementById('fromCurrency').value;
  const to = document.getElementById('toCurrency').value;

  if (!amount || isNaN(amount)) {
    resultDiv.textContent = 'Please enter a valid number.';
    return;
  }

  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await response.json();

    if (data && data.rates && data.rates[to]) {
      const rate = data.rates[to];
      const converted = (amount * rate).toFixed(2);
      resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
    } else {
      resultDiv.textContent = 'Conversion failed.';
    }
  } catch (error) {
    console.error('Fetch error:', error);
    resultDiv.textContent = 'Error connecting to API.';
  }
});

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('amount').value = '';
  });