import {
  createTextLink,
  applyCssById,
  createTop,
  createBottom,
  createLinkToLogout,
} from "./common.js";

createTop();
createBottom();
createLinkToLogout();

const storedDevice = localStorage.getItem("device");
console.log(`storedDevice=${storedDevice}`);
if (storedDevice && storedDevice !== "null") {
  console.log(`Отображаем: ${storedDevice}`);
} else {
  console.log(`Ошибка обращения к ${storedDevice}`);
}
