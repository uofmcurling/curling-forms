function convertToDays(obj) {
  for (let value of Object.values(obj)) {
    try {value = new Date(value)
    } catch{console.Log('invalid date')}}
}

function dateInfo() {
  let now = new Date()
}

async function getPractices() {
  console.log("Fetching practice dates...");
  const url = "https://script.google.com/macros/s/AKfycbyU-Ui7d7vrLYHk65JNA_hTbikrRJJ_NHPHP-jwwmQehc4MGzVGcVJbSTbYciDyzfdn/exec";

  const formData = new URLSearchParams();
  formData.append('action', 'get_dates');

  try {
    const response = await fetch(url, { method: "POST", body: formData });
    const data = await response.json();

    console.log("Next two practices:", data);

    const nextPractice = data.nextPractice ? new Date(data.nextPractice) : null;
    const secondNextPractice = data.secondNextPractice ? new Date(data.secondNextPractice) : null;

    return { nextPractice, secondNextPractice };
  } catch (err) {
    console.error("Error fetching practices:", err);
    return { nextPractice: null, secondNextPractice: null };
  }
}

async function populatePracticeSelect() {
  // Fetch the next two practices from the server
  const { nextPractice, secondNextPractice } = await getPractices();

  const select = document.getElementById("selectPractice");

  // Clear any existing options except the hidden placeholder
  select.querySelectorAll('option:not([hidden])').forEach(opt => opt.remove());

  // Helper to format date for display without timezone shifting
  const formatDisplayDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    const d = new Date(Number(year), Number(month) - 1, Number(day)); // local time
    const weekday = d.toLocaleDateString(undefined, { weekday: 'short' });
    return `${weekday}, ${month}/${day}/${year}`;
  };

  if (nextPractice) {
    const nextStr = nextPractice.toISOString().split('T')[0]; // yyyy-mm-dd
    const option1 = document.createElement("option");
    option1.value = nextStr;
    option1.textContent = formatDisplayDate(nextStr);
    select.appendChild(option1);
  }

  if (secondNextPractice) {
    const secondStr = secondNextPractice.toISOString().split('T')[0]; // yyyy-mm-dd
    const option2 = document.createElement("option");
    option2.value = secondStr;
    option2.textContent = formatDisplayDate(secondStr);
    select.appendChild(option2);
  }
}


// Example: call this as soon as the page loads
document.addEventListener("DOMContentLoaded", () => {
  populatePracticeSelect();
});


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

function formatPracticeDay(selectedValue) {
  // If selectedValue is already in yyyy-mm-dd, just return it
  if (/^\d{4}-\d{2}-\d{2}$/.test(selectedValue)) return selectedValue;

  // Otherwise, try to parse it as a Date
  const date = new Date(selectedValue);
  if (isNaN(date)) {
    console.error("Invalid date selected:", selectedValue);
    return null;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
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

function on_continue(event) {
    event.preventDefault()
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
      // populatePracticeSelect();
    } else {
      alert("Something went wrong.")
    }
  } catch (err) {
    console.error("Fetch error:", err);
    document.getElementById("sign-in").style.display = "block";
    document.getElementById("loading").style.display = "none";
    document.getElementById("emailNotFound").style.display = "block";
    // alert("Network error. Please try again.");
  }
}

async function process(event) { //Logs data to a known email
      event.preventDefault()
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
      // populatePracticeSelect();
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
    const practice_day = formatPracticeDay(document.getElementById('selectPractice').value);
    console.log(transport)
    console.log(member_email)
    console.log(practice_day)
    const formData = new URLSearchParams();
    formData.append('transport', transport);
    formData.append('email', member_email);
    formData.append('practice_day', practice_day);
    formData.append('action', 'sign_up');
    const url = "https://script.google.com/macros/s/AKfycbyU-Ui7d7vrLYHk65JNA_hTbikrRJJ_NHPHP-jwwmQehc4MGzVGcVJbSTbYciDyzfdn/exec";

    try {
    const response = await fetch(url, { method: "POST", body: formData });
    const data = await response.text();
    console.log("Server response:", data);

    if (data === "sign up complete") {
      document.getElementById("loading").style.display = "none";
      document.getElementById("confirmation_box").style.display = "block";
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

const phoneNumberInput = document.getElementById('number');

phoneNumberInput.addEventListener('input', (event) => {
  const input = event.target.value;
  // Remove all non-digit characters from the input
  const formattedInput = input.replace(/\D/g, '');
  
  // Enforce a maximum length of 10 digits for a US phone number
  const trimmedInput = formattedInput.substring(0, 10);

  let output = '';

  // Format the trimmed number as (123) 456-7890
  if (trimmedInput.length > 0) {
    output = `${trimmedInput.substring(0, 3)}`;
  }
  if (trimmedInput.length >= 4) {
    output += `-${trimmedInput.substring(3, 6)}`;
  }
  if (trimmedInput.length >= 7) {
    output += `-${trimmedInput.substring(6, 10)}`;
  }

  // Set the formatted value back to the input field
  event.target.value = output;
});















