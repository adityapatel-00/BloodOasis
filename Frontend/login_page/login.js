const email = document.getElementById("email");
const password = document.getElementById("password");
const submitButton = document.getElementById("submit-button");
const alertMsgs = document.querySelector(".alert-msgs");
const alertMsgContent = document.querySelector(".alert-msg");

const changeNav = function () {
  if (localStorage.getItem("userId")) {
    window.location.href =
      "http://localhost:5500/Frontend/Dashboard/dashboard.html";
  }
};
changeNav();

const showAlertMsg = function (data) {
  console.log(data);
  alertMsgContent.textContent = data.message;
  if (data.status === 1269) {
    alertMsgs.style.backgroundColor = "rgb(241, 234, 138)";
    alertMsgs.style.borderLeft = "5px solid rgb(255, 251, 29)";
  }
  if (data.status === 400) {
    alertMsgs.style.backgroundColor = "rgb(241, 138, 138)";
    alertMsgs.style.borderLeft = "5px solid red";
  }
  if (data.status === 1900) {
    alertMsgs.style.backgroundColor = "rgb(176, 241, 138)";
    alertMsgs.style.borderLeft = "5px solid rgb(129, 252, 57)";
  }
  if (data.status === 404) {
    alertMsgs.style.backgroundColor = "rgb(172, 238, 238)";
    alertMsgs.style.borderLeft = "5px solid rgb(36, 245, 245)";
  }
  alertMsgs.style.right = "1%";
  setTimeout(() => {
    alertMsgs.style.right = "-50%";
  }, 1500);
};

submitButton.addEventListener("click", async function (e) {
  e.preventDefault();

  if (!email.value || !password.value) {
    showAlertMsg({
      status: 1269,
      message: "Please enter email & Password",
    });
  } else {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email: email.value,
        password: password.value,
      });
      // console.log(res);

      localStorage.setItem("userId", res.data.id);
      if (res.status === 200) {
        email.value = "";
        password.value = "";
        showAlertMsg({
          status: 1900,
          message: "Logged in Sucessfully! Redirecting...",
        });
        setTimeout(
          () =>
            (window.location.href =
              "http://localhost:5500/Frontend/Dashboard/dashboard.html"),
          1500
        );
      }
    } catch (error) {
      showAlertMsg(error.response.data.error);
    }
  }
});
