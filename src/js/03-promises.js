import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('form'),
  inputDelayEl: document.querySelector('input[name="delay"]'),
  inputStepEl: document.querySelector('input[name="step"]'),
  inputAmountEl: document.querySelector('input[name="amount"]'),
  btnSubmitEl: document.querySelector('button'), 
}

refs.formEl.addEventListener('submit', setFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
   return Promise.resolve({ position, delay })
  } else {
    return Promise.reject({ position, delay })
  }
}

function setFormSubmit(event) {
  event.preventDefault();
  const amount = Number(event.target.amount.value);

  const step = Number(event.target.step.value);
  let delay = Number(event.target.delay.value);

  getPromises(delay, step, amount);

  event.target.reset();
}

function getPromises(delay, step, amount) {
  for (let i = 1; i <= amount; i += 1) {
    let position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    delay += step;
  }
}