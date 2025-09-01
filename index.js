// let email = "This should get Deleted";
// function email_lookup() {

// }
// function add_to_list() {
//     const member_email = document.getElementById('email').value;
//     console.log(member_email)
//     fetch("https://script.google.com/macros/s/AKfycbwETn3gPI6zMEerLR68GJht_rSBvH9-CGevTKsKqWFgb2rDfM4JjsTYufMAEVXTNpBC/exec", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             action: "add_to_list",
//             email: member_email
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log("Result:", data);
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     });
// }
function on_button_click() {
    email = document.getElementById("email").value;
    sendEmail(email);
}
async function sendEmail(email) {
  console.log("Processing....");
  document.getElementById("main_content").style.display = "none";
  document.getElementById("submission").style.display = "none";
  const url = "https://script.google.com/macros/s/AKfycbyU-Ui7d7vrLYHk65JNA_hTbikrRJJ_NHPHP-jwwmQehc4MGzVGcVJbSTbYciDyzfdn/exec";

  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('action', 'send_email');
  try {
    const response = await fetch(url, { method: "POST", body: formData });
    const data = await response.text();
    console.log("Server response:", data);

    if (data === "success") {
      document.getElementById("confirmation").style.display = "block";
    } else if (data === "email already exists") {
        document.getElementById("confirmation").style.display = "block";
        alert("This email is already registered");
    } else {
      alert("Something went wrong");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Network error. Please try again.");
  }
}

function on_continue() {
    email = document.getElementById("email").value;
    checkEmail(email);
}
async function checkEmail(email) {
  console.log("Processing....");
  document.getElementById("main_content").style.display = "none";
  document.getElementById("submission").style.display = "none";
  const url = "https://script.google.com/macros/s/AKfycbyU-Ui7d7vrLYHk65JNA_hTbikrRJJ_NHPHP-jwwmQehc4MGzVGcVJbSTbYciDyzfdn/exec";

  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('action', 'request_info');
  try {
    const response = await fetch(url, { method: "POST", body: formData });
    var data = await response.text();
    data = await JSON.parse(data);
    console.log("Server response:", data);

    if (data === "success") {
      {}
    } else if (data === "email already exists") {
        document.getElementById("confirmation").style.display = "block";
        alert("This email is already registered");
    } else {
      alert("Something went wrong");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Network error. Please try again.");
  }
}

function process() {
    const member_name = document.getElementById('name').value;
    const member_email = document.getElementById('email').value;
    const member_experience = document.getElementById('experience').value;
    const member_number = document.getElementById('number').value;
    const transport = document.getElementById('transport').value;
    console.log(member_email)
    console.log(member_name)
    console.log(member_experience)
    console.log(member_number)
    console.log(transport)
    
    fetch("https://script.google.com/macros/s/AKfycbwETn3gPI6zMEerLR68GJht_rSBvH9-CGevTKsKqWFgb2rDfM4JjsTYufMAEVXTNpBC/exec", {
        method: "POST",
        body: JSON.stringify({email, name, experience, number, transport})
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === "success") {
            alert("Submission successful!");
        } else {
            alert("Submission failed. Try again.");
        }
    })
    .catch(error => alert("Error: " + error));
}

function handleCredentialResponse(response) {
  const token = response.credential;
  const payload = JSON.parse(atob(token.split('.')[1]));

  email = payload.email; // Assign it here
  console.log("User email is now stored:", email);
  sendEmail(email);
}


















