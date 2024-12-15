import { getUser } from "./firebase-function.js";

export function createTextLink(url, text, parentId, linkId) {
  console.log(
    `createTextLink: url=${url}, text=${text}, parentId=${parentId}, linkId=${linkId}`
  );
  const link = document.createElement("a");
  link.href = url;
  link.textContent = text;
  if (linkId) {
    link.id = linkId;
  }
  const parent = document.getElementById(parentId);
  if (parent) {
    parent.appendChild(link);
  } else {
    console.error("Parent element not found");
  }
}

export function createTextInput(text, parentId, inputId) {
  const inputField = document.createElement("input");

  inputField.type = "text";
  inputField.placeholder = text;
  inputField.id = inputId;

  const parent = document.getElementById(parentId);
  if (parent) {
    parent.appendChild(inputField);
  } else {
    console.error("Parent element not found");
  }
}

export function createLabel(text, parentId, labelId) {
  const label = document.createElement("label");

  label.textContent = text;
  label.id = labelId;

  const parent = document.getElementById(parentId);
  if (parent) {
    parent.appendChild(label);
  } else {
    console.error("Parent element not found");
  }
}

export function createButton(text, parentId, buttonId, onClickHandler) {
  const button = document.createElement("button");

  button.textContent = text;
  button.id = buttonId;

  if (onClickHandler && typeof onClickHandler === "function") {
    button.addEventListener("click", onClickHandler);
  }

  const parent = document.getElementById(parentId);
  if (parent) {
    parent.appendChild(button);
  } else {
    console.error("Parent element not found");
  }
}

export function applyCssById(elementId, styles) {
  const element = document.getElementById(elementId);
  if (element) {
    for (const [property, value] of Object.entries(styles)) {
      element.style[property] = value;
    }
  } else {
    console.error("Element not found");
  }
}

export function deleteElementById(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.remove();
  }
}

export function createTop() {
  createTopLinks();
}

export function createBottom() {
  //
}

export function createTopLinks() {
  createTextLink("./index.html", "Главная", "header", "header-link-to-index");
  applyCssById("header-link-to-index", {
    color: "blue",
    top: "10px",
    left: "20px",
    position: "absolute",
    fontSize: "18px",
    textDecoration: "none",
  });

  createTextLink("./about.html", "О Нас", "header", "header-link-to-about");
  applyCssById("header-link-to-about", {
    color: "blue",
    top: "10px",
    left: "150px",
    position: "absolute",
    fontSize: "18px",
    textDecoration: "none",
  });
}

export function createLinkToAccount() {
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
      top: "10px",
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
      top: "10px",
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
        const testUser = getUser();
        localStorage.setItem("user", JSON.stringify(testUser));
        window.location.reload();
      });
  }
}

export function createLinkToLogout() {
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
}

export function createLeftAndRightContainer() {
  const parent = document.getElementById("content");
  // Создаём левый элемент
  const leftContainer = document.createElement("div");
  leftContainer.id = "leftContainer";
  parent.appendChild(leftContainer);

  // Создаём правый элемент
  const rightContainer = document.createElement("div");
  rightContainer.id = "rightContainer";
  parent.appendChild(rightContainer);

  applyCssById("leftContainer", {
    width: "300px",
    height: "100%",
    top: "0%",
    left: "0%",
    position: "absolute",
    backgroundColor: "rgb(136, 242, 206)",
  });
  applyCssById("rightContainer", {
    width: "auto",
    height: "100%",
    top: "0%",
    left: "300px",
    right: "0px",
    position: "absolute",
    backgroundColor: "rgb(236, 142, 206)",
  });
}

export function createLinksLeftMenu() {
  createTextLink("#", "Мои поля", "leftContainer", "ind1");
  applyCssById("ind1", {
    color: "black",
    top: "10px",
    left: "20px",
    position: "absolute",
    fontSize: "18px",
    textDecoration: "none",
  });
  createTextLink("#", "Данные учетной записи", "leftContainer", "ind2");
  applyCssById("ind2", {
    color: "black",
    top: "40px",
    left: "20px",
    position: "absolute",
    fontSize: "18px",
    textDecoration: "none",
  });
  createTextLink("#", "История пользования", "leftContainer", "ind3");
  applyCssById("ind3", {
    color: "black",
    top: "70px",
    left: "20px",
    position: "absolute",
    fontSize: "18px",
    textDecoration: "none",
  });
}

export function createItemListDeviceByData(
  device,
  parentId,
  pos = 0,
  hStep = 50
) {
  let linkId = `link-to-device-${pos}`;
  createTextLink("#", device.displayName, parentId, linkId);
  applyCssById(linkId, {
    color: "blue",
    top: `${10 + pos * hStep}px`,
    left: "25px",
    position: "absolute",
    fontSize: "18px",
    textDecoration: "none",
  });
  document.getElementById(linkId).addEventListener("click", function (event) {
    event.preventDefault();
    console.log(`${linkId} | ${device.displayName}`);
    // сохраняем текущее device в localstorage и получим его на следующей странице
    localStorage.setItem("device", JSON.stringify(device));
    window.location.href = `./device-management.html`;
  });
}

export function createItemNewDevice(parentId, pos = 0, hStep = 50) {
  let linkId = `link-to-create-new-device`;
  console.log(`Добавить новое устройство...`);
  createTextLink("#", "+ Добавить новое устройство", parentId, linkId);
  applyCssById(linkId, {
    color: "red",
    top: `${10 + pos * hStep}px`,
    left: "25px",
    position: "absolute",
    fontSize: "18px",
    textDecoration: "underline",
  });
  document.getElementById(linkId).addEventListener("click", function (event) {
    event.preventDefault();
    console.log(`Добавить новое устройство...`);
    window.location.href = `./bind-device.html`;
  });
}
