let enabled = false;

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "enable") {
    enableDyslexicFont();
    enabled = true;
  } else if (message.action === "disable") {
    disableDyslexicFont();
    enabled = false;
  }
});

function enableDyslexicFont() {
  document.body.style.fontFamily = "dyslexic-font, Arial, sans-serif";
  detectImages();
}

function disableDyslexicFont() {
  document.body.style.fontFamily = "";
  const speakers = document.querySelectorAll(".dyslexia-speaker");
  speakers.forEach((speaker) => speaker.remove());
}

function detectImages() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.style.position = "relative";

    const altText = img.alt || "It's an image";
    img.title = altText;

    const speakerIcon = document.createElement("img");
    speakerIcon.src = chrome.runtime.getURL("speaker-icon.png");
    speakerIcon.className = "dyslexia-speaker";
    speakerIcon.style.position = "absolute";
    speakerIcon.style.top = "5px";
    speakerIcon.style.right = "5px";
    speakerIcon.style.width = "20px";
    speakerIcon.style.cursor = "pointer";

    speakerIcon.addEventListener("click", () => {
      speakText(altText);
    });

    img.parentElement.style.position = "relative";
    img.parentElement.appendChild(speakerIcon);
  });
}

function speakText(text) {
  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(speech);
}
