function sendEmail() {
  // UI
  document.getElementById("main_content").style.display = "none";
  document.getElementById("submission").style.display = "none";
  document.getElementById("confirmation").style.display = "block";

  const member_email = document.getElementById('email').value;

async function addEmailToSheet() {
    const email = document.getElementById("email").value;

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzpFDUPQqc2NUnugw2CL079wXVUQ4kxmkEKaAkdsrYIPHqLrlkc6vzl5qfdKeviyXhH/exec", {
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
}
