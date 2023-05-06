import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
  button: document.querySelector('button'),
};

refs.input.addEventListener('input', throttle(onTextareaInput, 500));
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateTextarea();
populateForm();


function onFormSubmit(evt) {
  if (refs.input.value === "" || refs.textarea.value === "") {
    alert("Все поля должны быть заполнены");
  } else {
    const formData = {
      email: refs.input.value,
      message: refs.textarea.value
    };
    console.log(formData);
    refs.form.reset();
  }
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}


function onTextareaInput() {
  const email = refs.input.value;
  const message = refs.textarea.value;
  const data = {email, message};

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  console.log(data)
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const savedEmail = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    refs.textarea.value = savedMessage;
    refs.input.value = savedEmail;
  }
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const formData = JSON.parse(savedData);
    refs.input.value = formData.email;
    refs.textarea.value = formData.message;
  }
}