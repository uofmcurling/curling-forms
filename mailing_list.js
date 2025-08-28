function sendEmail() {
  const url = "https://script.google.com/macros/s/AKfycbyU-Ui7d7vrLYHk65JNA_hTbikrRJJ_NHPHP-jwwmQehc4MGzVGcVJbSTbYciDyzfdn/exec";
  
  const email = document.getElementById("email").value;

  const formData = new URLSearchParams();
  formData.append('email', email);

  fetch(url, {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(err => console.error(err));
}
async function addEmailToSheet() {
    const email = document.getElementById("email").value;

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbyU-Ui7d7vrLYHk65JNA_hTbikrRJJ_NHPHP-jwwmQehc4MGzVGcVJbSTbYciDyzfdn/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "add_to_list",
                email: email
            })
        });

        const result = await response.json();
        console.log("Result:", result);

        // Optional: show confirmation
        document.getElementById("confirmation").innerText = "Success!";
    } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong.");
    }
}

//   fetch("YOUR_EXEC_URL_HERE", {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: new URLSearchParams({
//       action: "send_email",
//       email: member_email
//     })
//   })
//   .then(res => res.json())
//   .then(data => {
//     console.log("Result:", data);
//     if (!data.ok) throw new Error(data.error || "Unknown error");
//   })
//   .catch(err => {
//     console.error("Error:", err);
//     // Optional: show an error state / revert UI
//   });


