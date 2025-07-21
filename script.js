// LocalStorage-based mock login/signup
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

// Dark mode toggle
const darkToggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  if (darkToggle) darkToggle.checked = true;
}

darkToggle?.addEventListener("change", () => {
  if (darkToggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  }
});


if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Signup successful! Please login.");
    window.location.href = "index.html";
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.password === password) {
      alert("Login successful!");
      window.location.href = "tracker.html";
    } else {
      alert("Invalid credentials.");
    }
  });
}
