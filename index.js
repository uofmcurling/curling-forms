
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

function missingData(obj) {
  for (let value of Object.values(obj)) {
    if (!value) {
      return true; // Found missing/empty value
    }
  }
  return false; // All values present
}

function noMissingData(obj) {
  for (let value of Object.values(obj)) {
    if (!value) {
      return false; // Found missing/empty value
    }
  }
  return true; // All values present
}

function on_continue() {
    email = document.getElementById("email").value;
    checkEmail(email);
}
async function checkEmail(email) {
  console.log("Processing....");
  document.getElementById("sign-in").style.display = "none";
  document.getElementById("loading").style.display = "block";
  const url = "https://script.google.com/macros/s/AKfycbyU-Ui7d7vrLYHk65JNA_hTbikrRJJ_NHPHP-jwwmQehc4MGzVGcVJbSTbYciDyzfdn/exec";

  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('action', 'request_info');
  try {
    const response = await fetch(url, { method: "POST", body: formData });
    var data = await response.text();
    data = JSON.parse(data);
    console.log("Server response:", data);

    if (missingData(data)) {
      document.getElementById("loading").style.display = "none";
      document.getElementById("about_you").style.display = "block";
    } else if (noMissingData(data)) {
      document.getElementById("loading").style.display = "none";
      document.getElementById("signUp").style.display = "block";
    } else {
      alert("Something went wrong.")
    }
  } catch (err) {
    console.error("Fetch error:", err);
    // alert("Network error. Please try again.");
  }
}

async function process() {
      document.getElementById("loading").style.display = "block";
      document.getElementById("about_you").style.display = "none";
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const member_email = document.getElementById('email').value;
    const member_experience = document.getElementById('experience').value;
    const member_number = document.getElementById('number').value;
    const transport = document.getElementById('transport').value;
    const graduation_year = document.getElementById('graduation').value;
    console.log(member_email)
    console.log(first_name)
    console.log(member_experience)
    console.log(member_number)
    console.log(transport)
    const formData = new URLSearchParams();
    formData.append('firstName', first_name);
    formData.append('lastName', last_name);
    formData.append('email', member_email);
    formData.append('experience', member_experience);
    formData.append('number', member_number);
    formData.append('graduation', graduation_year);
    formData.append('action', 'log_info');
    const url = "https://script.google.com/macros/s/AKfycbyU-Ui7d7vrLYHk65JNA_hTbikrRJJ_NHPHP-jwwmQehc4MGzVGcVJbSTbYciDyzfdn/exec";

    try {
    const response = await fetch(url, { method: "POST", body: formData });
    const data = await response.text();
    console.log("Server response:", data);

    if (data === "Data entered") {
      document.getElementById("loading").style.display = "none";
      document.getElementById("signUp").style.display = "block";
    } else if (data === "email already exists") {
        document.getElementById("confirmation").style.display = "block";
        alert("This email is already registered");
    } else {
      alert("Something went wrong");
    }
      } catch (err) {
    console.error("Fetch error:", err);
    // alert("Network error. Please try again.");
  }
}

async function signUp() {
      document.getElementById("loading").style.display = "block";
      document.getElementById("about_you").style.display = "none";
      document.getElementById("sign-in").style.display = "none";
      document.getElementById("signUp").style.display = "none";
    const transport = document.getElementById('transport').value;
    const member_email = document.getElementById('email').value;
    console.log(transport)
    console.log(member_email)
    const formData = new URLSearchParams();
    formData.append('transport', transport);
    formData.append('email', member_email);
    formData.append('action', 'sign_up');
    const url = "https://script.google.com/macros/s/AKfycbyU-Ui7d7vrLYHk65JNA_hTbikrRJJ_NHPHP-jwwmQehc4MGzVGcVJbSTbYciDyzfdn/exec";

    try {
    const response = await fetch(url, { method: "POST", body: formData });
    const data = await response.text();
    console.log("Server response:", data);

    if (data === "sign up complete") {
      document.getElementById("loading").style.display = "none";
      document.getElementById("confirmation").style.display = "block";
    } else if (data === "email already exists") {
        document.getElementById("confirmation_box").style.display = "block";
        alert("This email is already registered");
    } else {
      alert("Something went wrong");
    }
      } catch (err) {
    console.error("Fetch error:", err);
    // alert("Network error. Please try again.");
  }
}


function handleCredentialResponse(response) {
  const token = response.credential;
  const payload = JSON.parse(atob(token.split('.')[1]));

  email = payload.email; // Assign it here
  console.log("User email is now stored:", email);
  sendEmail(email);
}
function handleExistingCredential(response) {
  const token = response.credential;
  const payload = JSON.parse(atob(token.split('.')[1]));

  email = payload.email; // Assign it here
  console.log("User email is now stored:", email);
  checkEmail(email);
}

















