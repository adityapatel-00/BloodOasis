const dashLink = document.querySelector(".dashb");
const logSignLink = document.querySelector(".logsig");
const findDonor = document.querySelector(".find-Donor-link");
const feedbackName = document.querySelector(".feedback-name");
const feedbackText = document.querySelector(".feedback-text");
const feedbackSend = document.querySelector(".feedback-send");
const alertMsgContent = document.querySelector(".alert-msg");
const alertMsgs = document.querySelector(".alert-msgs");

const changeNav = function () {
  if (localStorage.getItem("userId")) {
    dashLink.classList.remove("hidden");
    logSignLink.classList.add("hidden");
    findDonor.href = "http://localhost:5500/Frontend/Donors_page/donors.html";
  } else {
    dashLink.classList.add("hidden");
    logSignLink.classList.remove("hidden");
    findDonor.href = "http://localhost:5500/Frontend/login_page/login.html";
  }
};
changeNav();

const showAlertMsg = function (data) {
  // console.log(data);
  alertMsgContent.textContent = data.message;
  if (data.status === 1268) {
    alertMsgs.style.backgroundColor = "rgb(241, 234, 138)";
    alertMsgs.style.borderLeft = "5px solid rgb(255, 251, 29)";
  }
  if (data.status === 111) {
    alertMsgs.style.backgroundColor = "rgb(172, 238, 238)";
    alertMsgs.style.borderLeft = "5px solid rgb(36, 245, 245)";
  }
  alertMsgs.style.right = "1%";
  setTimeout(() => {
    alertMsgs.style.right = "-50%";
  }, 1500);
};

feedbackSend.addEventListener("click", async function (e) {
  e.preventDefault();
  if (!feedbackName.value || !feedbackText.value) {
    return showAlertMsg({
      status: 1268,
      message: "Please provide your name and feedback",
    });
  }
  try {
    const res = await axios.post("http://localhost:3000/auth/feedback", {
      Name: feedbackName.value,
      feedback: feedbackText.value,
    });
    feedbackName.value = "";
    feedbackText.value = "";
    showAlertMsg(res.data);
  } catch (error) {
    showAlertMsg(error.response.data.error);
  }
});
