document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = e.target.name.value;
    const message = e.target.message.value;

    fetch("https://script.google.com/macros/s/AKfycbyxn9IwDJFWlh1CaVcZTz3bjrBy-mHr2ZBQiLcnpzh8c-UqQA8E5ei8oeoPyhf_F8fHuA/exec", {
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