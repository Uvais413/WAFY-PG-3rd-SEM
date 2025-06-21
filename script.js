// Dummy students data
const students = [
  {
    username: "Demo",
    password: "120",
    name: "Demo Student",
    photo: "demo passport 2.jpg",
  },
  {
    username: "Uvais",
    password: "Uv786",
    name: "UVAIS A.P",
    photo: "uv2.jpg",
  },
  {
    username: "Sabesabeeh",
    password: "sabe786",
    name: "Mohammed Sabeeh",
    photo: "sabeeh 2.jpg",
  },
  {
    username: "Swalih",
    password: "Jidu",
    name: "Swalih",
    photo: "salih.jpg",
  },
  {
    username: "11785",
    password: "11785",
    name: "MUHAMMED RILWAN MK ",
    photo: "demo.jpg",
  },
  {
    username: "Muhammed Basil",
    password: "11797",
    name: "Muhammed Basil A",
    photo: "basil.JPG",
  },
  {
    username: "ahmed01",
    password: "ahmedpwd",
    name: "Ahmed Ali",
    photo: "demo.jpg",
  },
  {
    username: "ahmed01",
    password: "ahmedpwd",
    name: "Ahmed Ali",
    photo: "demo.jpg",
  },
  {
    username: "ahmed01",
    password: "ahmedpwd",
    name: "Ahmed Ali",
    photo: "demo.jpg",
  },
  {
    username: "ahmed01",
    password: "ahmedpwd",
    name: "Ahmed Ali",
    photo: "demo.jpg",
  },
  {
    username: "ahmed01",
    password: "ahmedpwd",
    name: "Ahmed Ali",
    photo: "demo.jpg",
  },

];

// Key for tracking logged-in users in localStorage
const LOGGED_IN_USERS_KEY = "loggedInUsers";

// Utility to get logged-in users object from localStorage
function getLoggedInUsers() {
  const data = localStorage.getItem(LOGGED_IN_USERS_KEY);
  return data ? JSON.parse(data) : {};
}

// Utility to set logged-in users object to localStorage
function setLoggedInUsers(obj) {
  localStorage.setItem(LOGGED_IN_USERS_KEY, JSON.stringify(obj));
}

// Login logic for index.html
function handleLogin(event) {
  event.preventDefault();
  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("loginError");

  const student = students.find(
    (s) => s.username === usernameInput && s.password === passwordInput
  );

  if (!student) {
    errorEl.textContent = "Invalid username or password.";
    return;
  }

  let loggedInUsers = getLoggedInUsers();

  if (loggedInUsers[student.username]) {
    errorEl.textContent = "This user is already logged in on another device.";
    return;
  }

  const loginTime = Date.now();

  // Mark user as logged in
  loggedInUsers[student.username] = loginTime;
  setLoggedInUsers(loggedInUsers);

  // Save session data
  sessionStorage.setItem("username", student.username);
  sessionStorage.setItem("name", student.name);
  sessionStorage.setItem("photo", student.photo);
  sessionStorage.setItem("loginTime", loginTime.toString()); // Save as string

  window.location.href = "dashboard.html";
}

// Load dashboard/profile page info
function loadUserProfile() {
  const username = sessionStorage.getItem("username");
  const name = sessionStorage.getItem("name");
  const photo = sessionStorage.getItem("photo");
  const loginTimeRaw = sessionStorage.getItem("loginTime");

  if (!username || !name || !loginTimeRaw) {
    alert("No active session found. Please login.");
    window.location.href = "index.html";
    return;
  }

  const loginTime = parseInt(loginTimeRaw);

  const usernameDisplay = document.getElementById("usernameDisplay");
  if (usernameDisplay) usernameDisplay.textContent = username;

  const nameDisplay = document.getElementById("studentName");
  if (nameDisplay) nameDisplay.textContent = name;

  const photoEl = document.getElementById("profilePhoto");
  if (photoEl) {
    photoEl.src = photo;
    photoEl.onerror = () => {
      photoEl.src = "https://via.placeholder.com/110?text=User";
    };
  }

  const timeSpentEl = document.getElementById("timeSpent");
  if (!timeSpentEl) return;

  function formatTime(seconds) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  }

  function updateTime() {
    const now = Date.now();
    const diffSeconds = Math.floor((now - loginTime) / 1000);
    timeSpentEl.textContent = formatTime(diffSeconds);
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// Logout logic
function setupLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    const username = sessionStorage.getItem("username");
    if (username) {
      let loggedInUsers = getLoggedInUsers();
      delete loggedInUsers[username];
      setLoggedInUsers(loggedInUsers);
    }
    sessionStorage.clear();
    window.location.href = "index.html";
  });
}

// Auto-clean on tab close
window.addEventListener("beforeunload", () => {
  const username = sessionStorage.getItem("username");
  if (username) {
    let loggedInUsers = getLoggedInUsers();
    delete loggedInUsers[username];
    setLoggedInUsers(loggedInUsers);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("loginForm")) {
    document
      .getElementById("loginForm")
      .addEventListener("submit", handleLogin);
  } else {
    loadUserProfile();
    setupLogout();
  }
});
