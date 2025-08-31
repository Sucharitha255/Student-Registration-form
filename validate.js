document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("regForm");

  form.addEventListener("submit", (event) => {
    let valid = true;
    let messages = [];

    // Clear previous errors
    document.querySelectorAll(".error").forEach((el) => el.remove());

    // --- Name Validation ---
    const name = document.getElementById("name");
    if (!name.value.trim()) {
      showError(name, "Full name is required.");
      valid = false;
    }

    // --- Email Validation ---
    const email = document.getElementById("email");
    if (!email.value.trim()) {
      showError(email, "Email is required.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, "Enter a valid email address.");
      valid = false;
    }

    // --- Password Validation ---
    const password = document.getElementById("password");
    if (password.value.length < 6) {
      showError(password, "Password must be at least 6 characters.");
      valid = false;
    }

    // --- Confirm Password ---
    const confirmPassword = document.getElementById("confirmPassword");
    if (password.value !== confirmPassword.value) {
      showError(confirmPassword, "Passwords do not match.");
      valid = false;
    }

    // --- Date of Birth ---
    const dob = document.getElementById("dob");
    if (!dob.value) {
      showError(dob, "Date of birth is required.");
      valid = false;
    }

    // --- Phone Number ---
    const phone = document.getElementById("phone");
    if (!/^\d{10}$/.test(phone.value)) {
      showError(phone, "Enter a valid 10-digit phone number.");
      valid = false;
    }

    // --- Gender (Radio) ---
    const gender = document.querySelector("input[name='gender']:checked");
    if (!gender) {
      const genderGroup = document.getElementById("genderGroup");
      showError(genderGroup, "Please select a gender.");
      valid = false;
    }

    // --- Course Selection ---
    const course = document.getElementById("course");
    if (!course.value) {
      showError(course, "Please select a course.");
      valid = false;
    }

    // Prevent submission if invalid
    if (!valid) {
      event.preventDefault();
    }
  });

  // Utility: Show error below the field
  function showError(input, message) {
    const error = document.createElement("div");
    error.className = "error";
    error.style.color = "red";
    error.style.fontSize = "0.9em";
    error.innerText = message;
    input.insertAdjacentElement("afterend", error);
  }
});
