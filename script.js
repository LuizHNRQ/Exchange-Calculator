const currency1 = document.querySelector('#currency-one');
const amount1 = document.querySelector('#amount-one');
const currency2 = document.querySelector('#currency-two');
const amount2 = document.querySelector('#amount-two');

const rateElement = document.querySelector('#rate');
const swap = document.querySelector('#swap');

//Featch echange rate and update the DOM

let globalData;

fetch(`https://api.exchangerate-api.com/v6/latest`)
  .then(response => response.json())
  .then(data => {

    globalData = data;

    const currencyList = Object.keys(data.rates);

    currencyList.forEach(obj => {
      currency1.innerHTML += `<option value="${obj}">${obj}</option>`;
      if (obj === 'BRL') {
        currency2.innerHTML += `<option value="${obj}"selected >${obj}</option>`;
        return;
      }
      currency2.innerHTML += `<option value="${obj}">${obj}</option>`;
    });

    calculate();

  });


function calculate() {
  const cur_one = currency1.value;
  const cur_two = currency2.value;

  console.log(globalData);
  const rate = globalData.rates[cur_two];
  rateElement.innerText = `1 ${cur_one} = ${rate} ${cur_two}`;
  if (amount2.value !== '') {
    amount2.value = (amount1.value * rate).toFixed(3);
  }
};

//Event Listners

currency1.addEventListener('change', calculate);
amount1.addEventListener('input', calculate);
currency2.addEventListener('change', calculate);
amount2.addEventListener('input', calculate);
swap.addEventListener('click', () => {
  const aux = currency2.value;
  currency2.value = currency1.value;
  currency1.value = aux;
  calculate();
});