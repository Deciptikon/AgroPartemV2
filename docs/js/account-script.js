import {
  createTextLink,
  applyCssById,
  createTop,
  createBottom,
  getTestUser,
} from "./common.js";

createTop();
createBottom();

createTextLink("#", "Выход", "header", "header-link-to-logout");
applyCssById("header-link-to-logout", {
  color: "blue",
  top: "10px",
  right: "25px",
  position: "absolute",
  fontSize: "18px",
  textDecoration: "none",
});
document
  .getElementById("header-link-to-logout")
  .addEventListener("click", function (event) {
    event.preventDefault();
    console.log(`Выход из аккаунта`);
    localStorage.setItem("user", JSON.stringify(null));
    window.location.href = "./index.html";
  });
