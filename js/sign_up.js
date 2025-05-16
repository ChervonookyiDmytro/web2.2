document.addEventListener("DOMContentLoaded", () => {
  const activeUser = localStorage.getItem("activeUser");
  if (activeUser) {
    alert("You are already logged in. Please logout first to register a new user.");
    window.location.href = "profile.html";
    return;
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nickname = form.querySelector("input[type='text']").value.trim();
    const email = form.querySelector("input[type='email']").value.trim();
    const password = form.querySelector("input[type='password']").value;
    const gender = form.querySelector("select").value;
    const dob = form.querySelector("input[type='date']").value;

    if (localStorage.getItem(email)) {
      alert("A user with this email already exists.");
      return;
    }

    for (let key in localStorage) {
      if (key.startsWith("userEmailByNickname_")) {
        const existingNick = key.replace("userEmailByNickname_", "");
        if (existingNick === nickname) {
          alert("A user with this nickname already exists.");
          return;
        }
      }
    }

    const user = { nickname, email, password, gender, dob };
    localStorage.setItem(email, JSON.stringify(user));
    localStorage.setItem("activeUser", nickname);
    localStorage.setItem("userEmailByNickname_" + nickname, email);

    alert("Registration successful!");
    window.location.href = "profile.html";
  });
});
