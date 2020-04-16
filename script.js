const currency1 = document.querySelector('#currency-one');
const amount1 = document.querySelector('#amount-one');
const currency2 = document.querySelector('#currency-two');
const amount2 = document.querySelector('#amount-two');

const rateElement = document.querySelector('#rate');
const swap = document.querySelector('#swap');

//Featch echange rate and update the DOM
function calculate() {
  const cur_one = currency1.value;
  const cur_two = currency2.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${cur_one}`)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      const rate = data.rates[cur_two];
      console.log(rate);

      rateElement.innerText = `1 ${cur_one} = ${rate} ${cur_two}`;

      amount2.value = (amount1.value * rate).toFixed(3);

    });

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

calculate();