document.addEventListener("DOMContentLoaded", () => {
  const activeUser = localStorage.getItem("activeUser");
  if (activeUser) {
    alert("You are already logged in. Please logout first to login another account.");
    window.location.href = "profile.html";
    return;
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.querySelector("input[type='email']").value.trim();
    const password = form.querySelector("input[type='password']").value;
    const storedUserRaw = localStorage.getItem(email);

    if (!storedUserRaw) {
      alert("No user found with this email.");
      return;
    }

    const user = JSON.parse(storedUserRaw);
    if (user.password !== password) {
      alert("Incorrect password.");
      return;
    }

    localStorage.setItem("activeUser", user.nickname);
    alert("Login successful!");
    window.location.href = "profile.html";
  });
});
