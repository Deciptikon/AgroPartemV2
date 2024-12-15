import {
  createTextLink,
  applyCssById,
  createTop,
  createBottom,
  createLinkToLogout,
  createTextInput,
  createLabel,
  createButton,
} from "./common.js";

createTop();
createBottom();
createLinkToLogout();

createLabel(
  "Введите серийный номер устройства",
  "content",
  "label-text-input-serial-number"
);
applyCssById("label-text-input-serial-number", {
  padding: "5px",
  fontSize: "20px",
  position: "absolute",
  top: "150px",
  left: "200px",
  right: "200px",
  textAlign: "center",
});

createTextInput(
  "Введите серийный номер устройства",
  "content",
  "text-input-serial-number"
);
applyCssById("text-input-serial-number", {
  //width: "300px",
  padding: "5px",
  fontSize: "14px",
  position: "absolute",
  top: "200px",
  left: "200px",
  right: "200px",
});

createButton("Привязать устройство", "content", "button-to-bind", () => {
  let inputFieldSerialNumber = document.getElementById(
    "text-input-serial-number"
  );
  if (isValidSerialNumber(inputFieldSerialNumber.value)) {
    console.log(`Привязка устройсства ${inputFieldSerialNumber.value}`);
  } else {
    console.log(`Введите корректный серийный номер!`);
  }
});
applyCssById("button-to-bind", {
  //width: "200px",
  padding: "5px",
  fontSize: "14px",
  position: "absolute",
  top: "230px",
  left: "200px",
  right: "200px",
  textAlign: "center",
});

function isValidSerialNumber(serialNumber) {
  if (serialNumber == null) {
    console.log(`Ошибка изъятия серийного номера!`);
    alert(`Ошибка изъятия серийного номера!`);
    return false;
  }
  if (serialNumber.replace(/\s+/g, "") == "") {
    console.log(`Ошибка: серийный номер пуст!`);
    alert(`Ошибка: серийный номер пуст!`);
    return false;
  }
  if (serialNumber.replace(/\s+/g, "").length !== 20) {
    console.log(`Ошибка: серийный номер должен содержать ровно 20 символов!`);
    alert(`Ошибка: серийный номер должен содержать ровно 20 символов!`);
    return false;
  }
  if (!/^[a-zA-Z0-9]+$/.test(serialNumber)) {
    console.log(
      `Ошибка: серийный номер должен содержать только цифры 0-9 и символы литинского алфавита A-z!`
    );
    alert(
      `Ошибка: серийный номер должен содержать только цифры 0-9 и символы литинского алфавита A-z!`
    );
    return false;
  }

  return true;
}
