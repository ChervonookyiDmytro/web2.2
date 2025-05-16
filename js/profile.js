import { WordModel } from "./model.js";

document.addEventListener("DOMContentLoaded", () => {
  const nickname = localStorage.getItem("activeUser") || "guest";
  document.querySelector("#nickname").textContent = nickname;

  const emailKey = localStorage.getItem("userEmailByNickname_" + nickname);
  const userRaw = localStorage.getItem(emailKey);
  const user = userRaw ? JSON.parse(userRaw) : {};

  if (user.email) document.querySelector("#email").textContent = user.email;
  if (user.gender) document.querySelector("#gender").textContent = user.gender;
  if (user.dob) document.querySelector("#dob").textContent = user.dob;

  const model = new WordModel(nickname);
  model.loadFromFileIfEmpty().then(() => {
    document.querySelector("#stats").textContent = `You’ve learned ${model.getKnownCount()} of ${model.getTotalCount()} words.`;
  });

  document.querySelector(".btn-logout").addEventListener("click", () => {
    localStorage.removeItem("activeUser");
    window.location.href = "index.html";
  });
});
