// profile.js

window.onload = function () {
  const username = localStorage.getItem("loggedInUser");
  document.getElementById("studentName").innerText = username || "Guest";

  // Retrieve and display time spent
  const seconds = localStorage.getItem(`${username}_timeSpent`) || 0;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  document.getElementById("timeSpent").innerText = `${minutes} min ${remainingSeconds} sec`;
};
