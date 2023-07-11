const mobileNumberInput = document.getElementById("mobile-number");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");
const alertMsgs = document.querySelector(".alert-msgs");
const alertMsgContent = document.querySelector(".alert-msg");

const fullName = document.getElementById("name");
const phoneNumber = document.getElementById("mobile-number");
const email = document.getElementById("email");
const password = document.getElementById("password");
const state = document.getElementById("state-select");
const city = document.getElementById("city-input");
const bloodGroup = document.getElementById("blood-group-select");
const submitButton = document.getElementById("submit-button");
const acceptTerms = document.querySelector(".check-box");

const changeNav = function () {
  if (localStorage.getItem("userId")) {
    window.location.href =
      "http://localhost:5500/Frontend/Dashboard/dashboard.html";
  }
};
changeNav();

const showAlertMsg = function (data) {
  // console.log(data);
  alertMsgContent.textContent = data.message;
  if (data.status === 409 || data.status === 422) {
    alertMsgs.style.backgroundColor = "rgb(241, 138, 138)";
    alertMsgs.style.borderLeft = "5px solid red";
  }
  if (data.status === 1268) {
    alertMsgs.style.backgroundColor = "rgb(241, 234, 138)";
    alertMsgs.style.borderLeft = "5px solid rgb(255, 251, 29)";
  }
  if (data.status === 1900) {
    alertMsgs.style.backgroundColor = "rgb(176, 241, 138)";
    alertMsgs.style.borderLeft = "5px solid rgb(129, 252, 57)";
  }
  // if (data.status === 404) {
  //   alertMsgs.style.backgroundColor = "rgb(172, 238, 238)";
  //   alertMsgs.style.borderLeft = "5px solid rgb(36, 245, 245)";
  // }
  alertMsgs.style.right = "1%";
  setTimeout(() => {
    alertMsgs.style.right = "-50%";
  }, 1500);
};

submitButton.addEventListener("click", async function (e) {
  e.preventDefault();

  if (
    !fullName.value ||
    !email.value ||
    !password.value ||
    !phoneNumber.value ||
    !state.value ||
    !city.value ||
    !bloodGroup.value ||
    !acceptTerms.checked
  ) {
    showAlertMsg({
      status: 1268,
      message: "Please enter all the details!",
    });
  } else {
    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        fullName: fullName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        password: password.value,
        state: state.value,
        city: city.value,
        bloodGroup: bloodGroup.value,
      });
      // console.log(res);
      if (res.status === 200)
        showAlertMsg({
          status: 1900,
          message: "Registered Sucessfully! Redirecting...",
        });
      setTimeout(() => {
        window.location.href =
          "http://localhost:5500/Frontend/login_page/login.html";
      }, 1500);
    } catch (error) {
      showAlertMsg(error.response.data.error);
    }
  }
});

mobileNumberInput.addEventListener("input", () => {
  const mobileNumber = mobileNumberInput.value.trim();
  const regex = /^[6-9]\d{0,9}$/; // Indian mobile number format regex

  if (mobileNumber.length === 0) {
    mobileNumberInput.classList.remove("valid", "invalid");
    errorMessage.textContent = "";
    successMessage.textContent = "";
  } else if (mobileNumber.length !== 10 || !regex.test(mobileNumber)) {
    mobileNumberInput.classList.add("invalid");
    mobileNumberInput.classList.remove("valid");
    errorMessage.textContent = "Invalid mobile number";
    successMessage.textContent = "";
  } else {
    mobileNumberInput.classList.add("valid");
    mobileNumberInput.classList.remove("invalid");
    errorMessage.textContent = "";
    successMessage.textContent = "Valid mobile number";
  }
});

const emailField = document.getElementById("email");
const errorMessage2 = document.getElementById("error-message2");

emailField.addEventListener("input", () => {
  const email = emailField.value.trim();
  const isValid = isValidEmail(email);

  if (isValid) {
    emailField.classList.remove("invalid");
    emailField.classList.add("valid");
    errorMessage2.textContent = "";
  } else {
    emailField.classList.remove("valid");
    emailField.classList.add("invalid");
    errorMessage2.textContent = "Invalid email address";
  }
});

function isValidEmail(email) {
  // Email validation regex pattern
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
