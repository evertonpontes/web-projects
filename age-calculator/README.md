# Age Calculator

A simple age calculator built with **HTML, CSS, and JavaScript** as part of the [roadmap.sh Age Calculator challenge](https://roadmap.sh/projects/age-calculator).

The application allows users to enter their birth date and calculates their current age based on the current date.

## 🎯 Project Goal

This project was created to practice working with:

- JavaScript date and time manipulation
- User input and form handling
- Input validation
- DOM manipulation
- External JavaScript libraries
- Responsive interface design

The project uses **Luxon** to handle date calculations.

## ✨ Features

- Enter a birth date using the `dd/mm/yyyy` format
- Validate the entered date format
- Validate day and month ranges
- Display validation feedback for invalid input
- Calculate the user's age
- Display the result in years and months
- Responsive layout for different screen sizes
- Prevent invalid form submission
- Accessible form labels and input states

## 🛠️ Technologies

- **HTML5** — Semantic page structure and form
- **CSS3** — Layout, styling, and responsive design
- **JavaScript** — Form handling, validation, DOM manipulation, and application logic
- **Luxon** — Date and time calculations

## 📁 Project Structure

```text
age-calculator/
├── index.html
├── main.js
└── styles.css
```

### `index.html`

Contains the application structure, including:

- Age Calculator heading
- Birth date input
- Validation message
- Calculate button
- Result container

Luxon is loaded through the jsDelivr CDN.

### `main.js`

Contains the application's logic, including:

- Input formatting
- Date validation
- Form submission handling
- DOM manipulation
- Age calculation using Luxon
- Validation feedback

The form submission is intercepted with `preventDefault()` so the page does not reload when the user calculates their age.

### `styles.css`

Contains the visual styling for the application, including:

- Layout
- Typography
- Form styling
- Input states
- Validation states
- Result presentation
- Responsive behavior

## 🧮 How It Works

The user enters their birth date using the following format:

```text
dd/mm/yyyy
```

When the form is submitted, JavaScript:

1. Reads the value entered by the user.
2. Validates the date format.
3. Validates the day and month ranges.
4. Creates a Luxon `DateTime` object from the birth date.
5. Uses the current date to calculate the elapsed time.
6. Displays the resulting age in years and months.

For example:

```text
Birth date: 15/05/2000

You are 26 years 3 months old
```

The displayed values depend on the current date.

## 🚀 Running the Project

This project does not require a build tool or package manager.

Simply clone the repository:

```bash
git clone https://github.com/evertonpontes/web-projects.git
```

Navigate to the project directory:

```bash
cd web-projects/age-calculator
```

Then open `index.html` in your browser.

Alternatively, you can use a local development server such as the **Live Server** extension in Visual Studio Code.

## 📚 What I Learned

While building this project, I practiced several JavaScript concepts:

### Working with dates

I learned how to use the Luxon `DateTime` API to create and manipulate dates.

```javascript
const birthDate = DateTime.fromObject({
  day: Number(day),
  month: Number(month),
  year: Number(year),
});
```

### Form handling

The project uses the `submit` event to process the user's input without reloading the page.

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Process form data
});
```

### Input validation

The application validates the entered date before performing the calculation.

This includes checking the expected `dd/mm/yyyy` format and ensuring that the day and month values are within valid ranges.

### DOM manipulation

JavaScript is used to update the interface dynamically, including:

- Error messages
- Input validation states
- The calculated age

### External libraries

The project also provided practice with integrating an external JavaScript library directly into a web page.

## 🎓 Challenge

This project was developed as a solution to the **Age Calculator** project from roadmap.sh.

**Challenge:** [Age Calculator — roadmap.sh](https://roadmap.sh/projects/age-calculator)

The challenge focuses on practicing HTML, CSS, JavaScript, DOM manipulation, package management, and date handling.

## 📌 Project Status

**Completed**

This project is part of my collection of web development projects created while studying and practicing frontend development.

## 👤 Author

**Everton Pontes**

- GitHub: [evertonpontes](https://github.com/evertonpontes)
- Repository: [web-projects](https://github.com/evertonpontes/web-projects)
