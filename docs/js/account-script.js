import {
  createTextLink,
  applyCssById,
  createTop,
  createBottom,
  createLinkToLogout,
  createItemListDeviceByData,
  createLeftAndRightContainer,
  createLinksLeftMenu,
  createItemNewDevice,
} from "./common.js";

import { getUser, getDevices } from "./firebase-function.js";

createTop();
createBottom();
createLinkToLogout();
createLeftAndRightContainer();
createLinksLeftMenu();

const devices = getDevices();

let k = 0;
if (devices !== null) {
  devices.forEach((device, i) => {
    if (device.isVisible) {
      createItemListDeviceByData(device, "rightContainer", k);
      k++;
    }
  });
}

createItemNewDevice("rightContainer", k);
