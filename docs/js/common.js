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
        const testUser = getTestUser();
        localStorage.setItem("user", JSON.stringify(testUser));
        window.location.reload();
      });
  }
}

export function getTestUser() {
  return {
    uid: "unique_user_id",
    email: "user@example.com",
    emailVerified: true,
    displayName: "User Name",
    photoURL: "https://example.com/photo.jpg",
    phoneNumber: "+1234567890",
    providerId: "firebase",
    providerData: [
      {
        providerId: "google.com",
        uid: "google_user_id",
        displayName: "User Name",
        photoURL: "https://example.com/photo.jpg",
        email: "user@example.com",
        phoneNumber: null,
      },
    ],
    metadata: {
      creationTime: "2024-01-01T00:00:00.000Z",
      lastSignInTime: "2024-01-01T12:00:00.000Z",
    },
    customClaims: null,
    tenantId: null,
    tokenManager: {
      accessToken: "OAuth2_access_token",
      expirationTime: 1234567890123,
      refreshToken: "refresh_token",
    },
  };
}
