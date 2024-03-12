const bmiText = document.getElementById("bmi");
const descText = document.getElementById("description");
const form = document.querySelector("form");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", onFormSubmit);
form.addEventListener("reset", onFormReset);

function onFormReset() {
    bmiText.textContent = 0;
    bmiText.className = '';
    descText.textContent = "N/A"
}

function onFormSubmit(e) {
    e.preventDefault();

    const weight = parseFloat(form.weight.value);
    const height = parseFloat(form.height.value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        errorMessage.textContent = "Please enter valid Weight and Height.";
        bmiText.textContent = "0";
        return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / Math.pow(heightInMeters, 2);
    const description = interpretBMI(bmi);

    errorMessage.textContent = "";
    bmiText.className = description;
    bmiText.textContent = bmi.toFixed(2);
    descText.innerHTML = `You are <strong>${description}</strong>`;
}

function interpretBMI(bmi) {
    if (bmi < 18.5) {
        return "underweight";
    }

    else if (bmi < 25) {
        return "healthy";
    }

    else if (bmi < 30) {
        return "overweight";
    }

    else {
        return "obese";
    }
}
