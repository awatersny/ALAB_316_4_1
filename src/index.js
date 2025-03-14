const errorDisplay = document.getElementById("errorDisplay")
const loginForm = document.getElementById("login")
const registerForm = document.getElementById("registration")

function displayError(error) {
  errorDisplay.textContent = error
  errorDisplay.style.display = "flex"
}

function removeError() {
  errorDisplay.textContent = ""
  errorDisplay.style.display = "none"
}
