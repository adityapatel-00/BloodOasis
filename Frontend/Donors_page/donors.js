const findDonorsBtn = document.querySelector(".find-btn");
const backBtn = document.querySelector(".back-btn");
const bloodGroup = document.querySelector(".select-blood-group");
const state = document.querySelector(".select-state");
const city = document.querySelector(".select-city");
const alertMsgs = document.querySelector(".alert-msgs");
const alertMsgContent = document.querySelector(".alert-msg");
const resultsContainer = document.querySelector(".container");

const changeNav = function () {
  if (!localStorage.getItem("userId")) {
    window.location.href =
      "http://localhost:5500/Frontend/login_page/login.html";
  }
};
changeNav();

backBtn.addEventListener("click", function () {
  window.history.back();
});

const showAlertMsg = function (data) {
  alertMsgContent.textContent = data.message;
  if (data.status === 1268) {
    alertMsgs.style.backgroundColor = "rgb(241, 234, 138)";
    alertMsgs.style.borderLeft = "5px solid rgb(255, 251, 29)";
  }
  if (data.status === 404) {
    alertMsgs.style.backgroundColor = "rgb(172, 238, 238)";
    alertMsgs.style.borderLeft = "5px solid rgb(36, 245, 245)";
  }
  alertMsgs.style.right = "1%";
  setTimeout(() => {
    alertMsgs.style.right = "-50%";
  }, 3000);
};

const renderDonorDetails = function (donorArray) {
  if (donorArray.length === 0) {
    resultsContainer.innerHTML = "";
    showAlertMsg({
      status: 404,
      message: "Sorry, no donors found! Try a nearby city😊 ",
    });
    return;
  }
  resultsContainer.innerHTML =
    "<div class='object-card card'><p class='name-head'>Name</p><p class='blood-head'>Blood Group</p><p class='city-head'>City</p><p class='phone-head'>Phone Number</p></div>";
  donorArray.forEach((donor) => {
    const html = `
      <div class="object-card">
        <p>${donor.fullName}</p>
        <p>${donor.bloodGroup}</p>
        <p>${donor.city}</p>
        <p>${donor.phoneNumber}</p>
      </div>
    `;
    resultsContainer.insertAdjacentHTML("beforeend", html);
  });
};

findDonorsBtn.addEventListener("click", async function () {
  if (bloodGroup.value == -200 || state.value == -200 || city.value == -200) {
    showAlertMsg({
      status: 1268,
      message: "Please select Blood Group, State and City",
    });
  } else {
    try {
      const res = await axios.post("http://localhost:3000/auth/findDonors", {
        bloodGroup: bloodGroup.value,
        state: state.value,
        city: city.value,
      });
      if (res.status === 200) {
        renderDonorDetails(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
});
