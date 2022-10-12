window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
  }
});

var installPwa = document.querySelector(".install-pwa");

function showInstallPromotion() {
  installPwa.style.display = "block";
}
function hideInstallPromotion() {
  installPwa.style.display = "none";
}

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
  // Optionally, send analytics event that PWA install promo was shown.
  console.log(`'beforeinstallprompt' event was fired.`);
});
// showInstallPromotion();
// var buttonInstall = document.querySelector(".btn-install");

// buttonInstall.addEventListener("click", async () => {
//   hideInstallPromotion();
//   deferredPrompt.prompt();
//   const { outcome } = await deferredPrompt.userChoice;
//   console.log(`User respons to install promt: ${outcome}`);
//   deferredPrompt = null;
// });
