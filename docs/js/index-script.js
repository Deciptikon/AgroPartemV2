import {
  createTextLink,
  applyCssById,
  createTop,
  createBottom,
  getTestUser,
  deleteElementById,
} from "./common.js";

createTop();
createBottom();

// Получение user после редиректа и сохранение в localStorage
//const testUser = getTestUser();
//const testUser = null;
//localStorage.setItem("user", JSON.stringify(testUser));

const storedUser = localStorage.getItem("user");
console.log(`storedUser=${storedUser}`);
if (storedUser && storedUser !== "null") {
  //const user = JSON.parse(storedUser);
  deleteElementById("header-link-to-login");
  createTextLink(
    "./account.html",
    "Личный кабинет",
    "header",
    "header-link-to-account"
  );
  applyCssById("header-link-to-account", {
    color: "blue",
    top: "15px",
    right: "25px",
    position: "absolute",
    fontSize: "18px",
    textDecoration: "none",
  });
} else {
  deleteElementById("header-link-to-account");
  createTextLink("#", "Регистрация/Вход", "header", "header-link-to-login");
  applyCssById("header-link-to-login", {
    color: "blue",
    top: "15px",
    right: "25px",
    position: "absolute",
    fontSize: "18px",
    textDecoration: "none",
  });
  document
    .getElementById("header-link-to-login")
    .addEventListener("click", function (event) {
      event.preventDefault();
      console.log(`Redirect to Google OAuth2.0 ...`);
      const testUser = getTestUser();
      localStorage.setItem("user", JSON.stringify(testUser));
    });
}
