document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = e.target.name.value;
    const message = e.target.message.value;

    fetch("https://script.google.com/macros/s/AKfycbyTo4G2HVzcBWSBAVhvcsfDqP-SysmzBLEkHeKyMe7ARwBUpGW1sLhnamyFTD2IjEV4Uw/exec", {
      method: "POST",
      body: new URLSearchParams({ name, message })
    })
    .then(res => {
      if (res.ok) {
        document.getElementById("feedbackStatus").textContent = "Thanks for your feedback!";
        e.target.reset();
      } else {
        document.getElementById("feedbackStatus").textContent = "Failed to submit. Try again.";
      }
    })
    .catch(err => {
      document.getElementById("feedbackStatus").textContent = "Error occurred.";
      console.error(err);
    });
  });