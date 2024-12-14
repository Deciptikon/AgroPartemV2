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
    top: "15px",
    left: "15px",
    position: "absolute",
    fontSize: "18px",
    textDecoration: "none",
  });

  createTextLink("./about.html", "О Нас", "header", "header-link-to-about");
  applyCssById("header-link-to-about", {
    color: "blue",
    top: "15px",
    left: "150px",
    position: "absolute",
    fontSize: "18px",
    textDecoration: "none",
  });
}
