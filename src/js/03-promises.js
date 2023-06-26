function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    return Promise.reject(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

var form = document.getElementsByClassName('form')[0];

form.addEventListener('submit', event => {
  event.preventDefault();
  var delay = document.querySelector("input[name='delay']").value;
  var step = document.querySelector("input[name='step']").value;
  var amount = document.querySelector("input[name='amount']").value;
  displayCurrentPromise(1, parseInt(step), parseInt(delay), parseInt(amount));
});

function displayCurrentPromise(currentAmount, step, delay, amount) {
  if (amount < 0) {
    console.log('Invalid amount');
  } else if (amount == 0) {
    console.log('No promises to display.');
  } else if (currentAmount == 1) {
    setTimeout(() => {
      console.log(
        createPromise(currentAmount, delay + (currentAmount - 1) * step)
      );
      displayCurrentPromise(currentAmount + 1, step, delay, amount);
    }, delay);
  } else if (currentAmount < amount + 1) {
    setTimeout(() => {
      console.log(
        createPromise(currentAmount, delay + (currentAmount - 1) * step)
      );
      displayCurrentPromise(currentAmount + 1, step, delay, amount);
    }, step);
  }
}
