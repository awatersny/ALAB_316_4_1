const msgDisplay = document.getElementById("msg-display")
const registerForm = document.getElementById("registration")
const loginForm = document.getElementById("login")
const terms = registerForm.childNodes[22].childNodes[1]
const persist = loginForm.childNodes[12].childNodes[1]
const users = {}

let userCount = (localStorage.length) / 3

const registerFields = {
  username: registerForm.childNodes[1],
  email: registerForm.childNodes[6],
  password: registerForm.childNodes[11],
  confirmP: registerForm.childNodes[16]
}

const loginFields = {
  username: loginForm.childNodes[1],
  password: loginForm.childNodes[6]
}

msgDisplay.style.justifyContent = "center"

updateUsers()
console.log(users)

const emailValidation = /^\w+[.-\w]*@\w+[.\w{2,3}]+$/


registerForm.addEventListener("submit", registerFormSubmitCtrl)
registerForm.addEventListener("click", removeMsg)
loginForm.addEventListener("submit", loginFormSubmitCtrl)
loginForm.addEventListener("click", removeMsg)

function storeUser(user, mail, pass) {
  userCount = localStorage.length / 3
  localStorage.setItem(`${userCount}username`, user.toLowerCase())
  localStorage.setItem(`${userCount}email`, mail.toLowerCase())
  localStorage.setItem(`${userCount}password`, pass)
}

function updateUsers() {
  for(let i = 0; i < localStorage.length / 3; i++) {
    // console.log(localStorage[`${i}username`])
    // console.log(localStorage[`${i}email`])
    // console.log(localStorage[`${i}password`])
    users[localStorage[`${i}username`]] = {
      email: localStorage[`${i}email`],
      password: localStorage[`${i}password`]
    }
  }
}

function registerFormSubmitCtrl(evt) {
  evt.preventDefault()
  // The username cannot be blank.
  for(field in registerFields) {
    if(registerFields[field].value === "") {
      displayError("All fields must be filled out.")
      return
    }
  }
  const userVal = registerFields.username.value
  const mailVal = registerFields.email.value
  const passVal = registerFields.password.value
  // The username must be at least four characters long.
  if(userVal.length < 5) {
    displayError("Username must be at least four characters long.")
    return
  }
  // The username must contain at least two unique characters.
  if(/\w+/.test(userVal)) {
    if(!/\d+/.test(userVal)) {
      displayError("Username must contain at least two unique characters.")
      return
    }
    if(!/[A-Za-z]/.test(userVal)) {
      displayError("Username must contain at least two unique characters.")
      return
    }
  }
  // The username cannot contain any special characters or whitespace.
  if(/\s+/.test(userVal) || /\W+/.test(userVal)) {
    displayError("Username cannot contain any special characters or whitespace.")
    return
  }
  // The email must be a valid email address.
  if(!emailValidation.test(mailVal)) {
    displayError("Email address format is invalid.")
    return
  }
  // The email must not be from the domain "example.com."
  if(/@example.com/.test(mailVal)) {
    displayError(`Invalid domain.  Please use a domain other than "example.com".`)
    return
  }
  // Passwords must be at least 12 characters long.
  if(passVal.length < 13) {
    displayError("Passwords must be at least 12 characters long.")
    return
  }
  // Passwords must have at least one uppercase and one lowercase letter.
  if(!/[A-Z]+/.test(passVal) || !/[A-Z]+/.test(passVal)) {
    displayError("Passwords must have at least one uppercase and one lowercase letter.")
    return
  }
  // Passwords cannot contain the username.
  if(passVal === userVal){
    displayError("Password should not be the same as your username.")
    return
  }
  // Passwords must contain at least one number.
  if(!/\d+/.test(passVal)) {
    displayError("Password must contain at least one number.")
    return
  }
  // Passwords must contain at least one special character.
  if(!/\W+/.test(passVal)) {
    displayError("Password must contain at least one special character.")
    return
  }
  // Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
  if(/password/.test(passVal.toLowerCase())) {
    displayError(`Password cannot contain the word "password" (uppercase, lowercase, or mixed).`)
    return
  }
  // Both passwords must match.
  if(registerFields.confirmP.value !== passVal){
    displayError("Passwords do not match.")
    return
  }
  if(!terms.checked) {
    displayError("You must accept the terms and conditions to proceed.")
    return
  }
  if(userVal.toLowerCase() in users) {
    displayError(`The name "${userVal}" is already taken`)
    return
  }
  storeUser(userVal, mailVal, passVal)
  updateUsers()
  displayMsg("Success!")

  for(field in registerFields) {
    registerFields[field].value = ""
  }
  terms.checked = false

  console.log(userVal, users[userVal])
}

function loginFormSubmitCtrl(evt) {
  evt.preventDefault()
  for(field in loginFields) {
    if(loginFields[field].value === "") {
      displayMsg("All fields must be filled out", true)
      return
    }
  }
  const userVal = loginFields.username.value
  const passVal = loginFields.password.value
  if(!(userVal.toLowerCase() in users)) {
    displayMsg(`The username "${userVal}" doesn't exist.`, true)
    return
  }
  if(passVal !== users[userVal].password) {
    displayMsg("Your password is incorrect.", true)
    return
  }
  for(field in loginFields) {
    loginFields[field].value = ""
  }
  if(persist.checked) {
    displayMsg("We will keep you logged in.")
    return
  }
  displayMsg("Success!")
}

function displayError(error) {
  msgDisplay.style.backgroundColor = "#fdd"
  msgDisplay.style.color = "red"
  msgDisplay.textContent = error
  msgDisplay.style.display = "flex"
}

function displayMsg(msg, isError=false) {
  msgDisplay.textContent = msg
  msgDisplay.style.display = "flex"
  if(isError) {
    msgDisplay.style.backgroundColor = "#fdd"
    msgDisplay.style.color = "red"
    return
  }
  msgDisplay.style.backgroundColor = "#dfd"
  msgDisplay.style.color = "green"
}

function removeMsg() {
  msgDisplay.textContent = ""
  msgDisplay.style.display = "none"
}