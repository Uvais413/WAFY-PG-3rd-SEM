// Show username
//*//const user = localStorage.getItem("currentUser");
document.getElementById("user-name").textContent = user ? user : "Student";

// Live IST Time + Date
function updateDateTime() {
  const now = new Date();
  const options = {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  const istTime = now.toLocaleString('en-IN', options);
  document.getElementById("date-time").textContent = "📅 " + istTime;
}

setInterval(updateDateTime, 1000);
updateDateTime();
