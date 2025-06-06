const dobInput = document.getElementById("dob");
    const today = new Date().toISOString().split("T")[0];
    dobInput.max = today;

    const form = document.getElementById("registerForm");
    const table = document.getElementById("dataTable").querySelector("tbody");
    const message = document.getElementById("message");

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

      message.textContent = "";

      const newRow = table.insertRow();
      newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${dob}</td>
        <td>${accepted}</td>
      `;

      form.reset();
    });
