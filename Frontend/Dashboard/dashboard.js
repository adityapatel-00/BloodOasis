// USER FIELDS
const fullName = document.getElementById("fname");
const phoneNumber = document.getElementById("number");
const email = document.getElementById("email");
const state = document.getElementById("state");
const city = document.getElementById("city");
const bloodGroup = document.getElementById("b-group");

// BUTTONS
const registerDonorBtn = document.querySelector(".register-donor");
const unRegisterBtn = document.querySelector(".unregister-donor");
const editBtn = document.getElementById("edit-btn");
const saveBtn = document.getElementById("save-btn");
const alertMsgs = document.querySelector(".alert-msgs");
const alertMsgContent = document.querySelector(".alert-msg");

const changeNav = function () {
  if (!localStorage.getItem("userId")) {
    window.location.href =
      "http://localhost:5500/Frontend/login_page/login.html";
  }
};
changeNav();

const showAlertMsg = function (data) {
  alertMsgContent.textContent = data.message;
  if (data.status === 399) {
    alertMsgs.style.backgroundColor = "rgb(176, 241, 138)";
    alertMsgs.style.borderLeft = "5px solid rgb(129, 252, 57)";
  }
  if (data.status === 299) {
    alertMsgs.style.backgroundColor = "rgb(172, 238, 238)";
    alertMsgs.style.borderLeft = "5px solid rgb(36, 245, 245)";
  }
  if (data.status === 188) {
    alertMsgs.style.backgroundColor = "rgb(241, 234, 138)";
    alertMsgs.style.borderLeft = "5px solid rgb(255, 251, 29)";
  }

  if (data.status === 500) {
    alertMsgs.style.backgroundColor = "rgb(241, 138, 138)";
    alertMsgs.style.borderLeft = "5px solid red";
  }
  alertMsgs.style.right = "1%";
  setTimeout(() => {
    alertMsgs.style.right = "-50%";
  }, 1500);
};

const getLocalStorage = () => localStorage.getItem("userId");

(async function () {
  try {
    const res = await axios.post("http://localhost:3000/auth/checkDonor", {
      userId: getLocalStorage(),
    });
    if (res.data.isDonor) {
      registerDonorBtn.classList.add("hidden");
      unRegisterBtn.classList.remove("hidden");
    }
  } catch (error) {
    console.log(error);
  }
})();

const nav_bar = document.querySelector(".Navigation-bar");
(function () {
  const html = `
        <div class="logo">
          <img class="logo-img" src="../Images/logo.png" alt="logo" />
          <p class="logo-text">Blood Oasis</p>
        </div>
        <a class="nav-link" href="../landing_page/index.html">Home</a>
        <a class="nav-link log-out" href="../landing_page/index.html">Logout</a>
        `;
  nav_bar.insertAdjacentHTML("afterbegin", html);
})();

const fetchStates = function (selectedState) {
  const states = ["Telangana"];
  state.innerHTML = "";

  states.forEach((st) => {
    const option = document.createElement("option");
    option.value = st;
    option.textContent = st;
    option.selected = st === selectedState ? true : false;
    state.appendChild(option);
  });
};

const cities = [
  "Achampet",
  "Adilabad",
  "Alampur",
  "Andole",
  "Armoor",
  "Asifabad",
  "Banswada",
  "Bellampalli",
  "Bhadrachalam",
  "Bhongir",
  "Bodhan",
  "Chevella",
  "Devarakonda",
  "Gajwel",
  "Husnabad",
  "Hyderabad",
  "Jagitial",
  "Jangaon",
  "Karimnagar",
  "Kagaznagar",
  "Kalwakurthy",
  "Kamareddy",
  "Khammam",
  "Kodad",
  "Koratla",
  "Kothagudem",
  "Mahabubabad",
  "Mahbubnagar",
  "Mandamarri",
  "Mancherial",
  "Manthani",
  "Medak",
  "Miryalaguda",
  "Nagarkurnool",
  "Nalgonda",
  "Narayanpet",
  "Nirmal",
  "Nizamabad",
  "Palwancha",
  "Ramagundam",
  "Sadasivpet",
  "Sangareddy",
  "Sathupally",
  "Siddipet",
  "Siricilla",
  "Suryapet",
  "Tandur",
  "Vemulawada",
  "Vikarabad",
  "Vikarabad",
  "Wanaparthy",
  "Warangal",
  "Yellandu",
  "Yellareddy",
  "Zaheerabad",
];

const fetchCities = (selectedCity) => {
  city.innerHTML = "";

  cities.forEach((ct) => {
    const option = document.createElement("option");
    option.value = ct;
    option.textContent = ct;
    option.selected = ct === selectedCity ? true : false;
    city.appendChild(option);
  });
};

const bloodGrps = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const fetchBloodGroups = (selectedBloodGroup) => {
  bloodGroup.innerHTML = "";

  bloodGrps.forEach((bg) => {
    const option = document.createElement("option");
    option.value = bg;
    option.textContent = bg;
    option.selected = bg === selectedBloodGroup ? true : false;
    bloodGroup.appendChild(option);
  });
};

const displayDetails = async () => {
  try {
    const res = await axios.post("http://localhost:3000/auth/getDetails", {
      userId: getLocalStorage(),
    });
    fullName.textContent = res.data.fullName;
    phoneNumber.textContent = res.data.phoneNumber;
    email.textContent = res.data.email;
    fetchStates(res.data.state);
    fetchCities(res.data.city);
    fetchBloodGroups(res.data.bloodGroup);
  } catch (error) {
    console.log(error);
  }
};

displayDetails();

setTimeout(() => {
  showAlertMsg({
    status: 299,
    message: `Hello, ${fullName.textContent} 👋`,
  });
}, 500);

registerDonorBtn.addEventListener("click", async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/registerDonor",
      {
        userId: getLocalStorage(),
      }
    );
    registerDonorBtn.classList.add("hidden");
    unRegisterBtn.classList.remove("hidden");
    showAlertMsg(response.data);
  } catch (error) {
    console.log(error);
  }
});

unRegisterBtn.addEventListener("click", async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/unregisterDonor",
      {
        userId: getLocalStorage(),
      }
    );
    registerDonorBtn.classList.remove("hidden");
    unRegisterBtn.classList.add("hidden");
    showAlertMsg(response.data);
  } catch (error) {
    console.log(error);
  }
});

const toggleEditSave = function () {
  editBtn.classList.toggle("hidden");
  saveBtn.classList.toggle("hidden");
  fullName.contentEditable = true;
  phoneNumber.contentEditable = true;
  email.contentEditable = true;
  state.disabled = !state.disabled;
  city.disabled = !city.disabled;
  bloodGroup.disabled = !bloodGroup.disabled;
};

editBtn.addEventListener("click", toggleEditSave);

saveBtn.addEventListener("click", async () => {
  try {
    const res = await axios.post("http://localhost:3000/auth/editDetails", {
      userId: getLocalStorage(),
      email: email.textContent,
      fullName: fullName.textContent,
      phoneNumber: phoneNumber.textContent,
      state: state.value,
      city: city.value,
      bloodGroup: bloodGroup.value,
    });
    if (res.status === 200) {
      showAlertMsg(res.data);
    }
    toggleEditSave();
    fullName.contentEditable = false;
    phoneNumber.contentEditable = false;
    email.contentEditable = false;
    displayDetails();
  } catch (error) {
    showAlertMsg(error.response.data.error);
  }
});

const logoutBtn = document.querySelector(".log-out");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
});
