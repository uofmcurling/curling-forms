function email_lookup() {

}
function add_to_list() {
    const member_email = document.getElementById('email').value;
    console.log(member_email)
    fetch("https://script.google.com/macros/s/AKfycbwETn3gPI6zMEerLR68GJht_rSBvH9-CGevTKsKqWFgb2rDfM4JjsTYufMAEVXTNpBC/exec", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            action: "add_to_list",
            email: member_email
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Result:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
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
  console.log("Encoded JWT ID token: " + response.credential);
  // Normally you would send response.credential to your backend
  // to verify the token and get user info.
  // For demo: decode JWT client-side (not secure for production)
  const base64Url = response.credential.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const userData = JSON.parse(jsonPayload);
  document.getElementById(
    "user-info"
  ).innerText = `Hello, ${userData.name} (${userData.email})`;
}