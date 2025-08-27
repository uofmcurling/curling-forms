function sendEmail() {
  // UI
  document.getElementById("main_content").style.display = "none";
  document.getElementById("submission").style.display = "none";
  document.getElementById("confirmation").style.display = "block";

  const member_email = document.getElementById('email').value;

  fetch("YOUR_EXEC_URL_HERE", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      action: "send_email",
      email: member_email
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Result:", data);
    if (!data.ok) throw new Error(data.error || "Unknown error");
  })
  .catch(err => {
    console.error("Error:", err);
    // Optional: show an error state / revert UI
  });
}
