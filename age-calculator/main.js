var DateTime = luxon.DateTime;

const birthDate = { day: null, month: null, year: null };

const resultContainer = document.getElementById("result");

const inputDate = document.getElementById("date-inpt");

const inputInvalidMessage = document.getElementById("inpt-invalid-message");

const submitButton = document.getElementById("submit-btn");

const form = document.getElementById("form");

const dateNow = DateTime.now();

function formatValue(value) {
  const alphabetRegex = /[A-Za-z]+/;
  const specialCharRegex = /[^A-Za-z0-9\/]/;

  return value.replace(alphabetRegex, "").replace(specialCharRegex, "");
}

function validDay(day) {
  const dayNumber = Number(day);

  if (dayNumber > 0 && dayNumber < 32) return true;
  else return false;
}

function validMonth(month) {
  const monthNumber = Number(month);

  if (monthNumber > 0 && monthNumber < 13) return true;
  else return false;
}

function validDate(date) {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (dateRegex.test(date)) {
    const splitedDate = date.split("/");

    if (!validDay(splitedDate[0])) return false;

    if (!validMonth(splitedDate[1])) return false;

    return true;
  } else {
    return false;
  }
}

function onDateInput(event) {
  const { value } = event.target;

  const formatedValue = formatValue(value);

  inputDate.value = formatedValue;
}

function onDateChange(event) {
  const { value } = event.target;

  const isValidDate = validDate(value);

  if (!isValidDate) {
    inputDate.dataset.invalid = "true";
    inputInvalidMessage.innerText = "Invalid format!";
    submitButton.disabled = true;
  } else {
    inputDate.dataset.invalid = "false";
    inputInvalidMessage.innerText = "";
    submitButton.disabled = false;
  }
}

inputDate.addEventListener("input", onDateInput);
inputDate.addEventListener("change", onDateChange);
form.addEventListener("submit", (event) => {
  event.preventDefault();

  data = new FormData(event.target);

  const birthDate = [...data.entries()][0][1];

  calculateDate(birthDate);
});

function calculateDate(date) {
  const isValidDate = validDate(date);

  if (!isValidDate) {
    inputDate.dataset.invalid = "true";
    inputInvalidMessage.innerText = "Invalid format!";
    return;
  }

  inputDate.dataset.invalid = "false";
  inputInvalidMessage.innerText = "";

  const splitedValues = date.split("/");

  const birthDate = DateTime.fromObject({
    day: Number(splitedValues[0]),
    month: Number(splitedValues[1]),
    year: Number(splitedValues[2]),
  });

  const newDate = dateNow.minus({
    year: birthDate.year,
    month: birthDate.month,
    day: birthDate.day,
  });

  resultContainer.innerHTML = `
    <p>You are <b>${newDate.c.year} ${newDate.c.year > 1 ? "years" : "year"} ${newDate.c.month} ${newDate.c.month > 1 ? "months" : "month"}</b> old </p>
  `;
}
