const dobInput = document.getElementById("dob");
const today = new Date().toISOString().split("T")[0];
dobInput.max = today;

const form = document.getElementById("registerForm");
const table = document.getElementById("dataTable").querySelector("tbody");
const message = document.getElementById("message");

// Load saved users from localStorage or initialize empty array
const users = JSON.parse(localStorage.getItem("users")) || [];

// Render existing users on page load
function renderTable() {
  table.innerHTML = "";
  users.forEach(user => {
    const newRow = table.insertRow();
    newRow.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.password}</td>
      <td>${user.dob}</td>
      <td>${user.accepted}</td>
    `;
  });
}

renderTable();

// Helper function to calculate age from dob string (YYYY-MM-DD)
function calculateAge(dobStr) {
  const dobDate = new Date(dobStr);
  const diffMs = Date.now() - dobDate.getTime();
  const ageDate = new Date(diffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const dob = document.getElementById("dob").value;
  const accepted = document.getElementById("acceptTerms").checked;

  if (!accepted) {
    message.style.color = "red";
    message.textContent = "You must accept the Terms & Conditions.";
    return;
  }

  // Validate age between 18 and 55
  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    message.style.color = "red";
    message.textContent = "You must be between 18 and 55 years old.";
    return;
  }

  message.textContent = "";

  // Add new user to users array and save to localStorage
  users.push({ name, email, password, dob, accepted });
  localStorage.setItem("users", JSON.stringify(users));

  // Render updated table
  renderTable();

  form.reset();
});
