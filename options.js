function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    reblog: document.querySelector("#reblog").value.split(","),
    reblogUser: document.querySelector("#reblogUser").checked,
    text: document.querySelector("#text").value.split(","),
    image: document.querySelector("#image").value.split(","),
    art: document.querySelector("#art").value.split(","),
    video: document.querySelector("#video").value.split(","),
    audio: document.querySelector("#audio").value.split(","),
    chat: document.querySelector("#chat").value.split(","),
    quote: document.querySelector("#quote").value.split(","),
    link: document.querySelector("#link").value.split(",")
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#reblog").value = result.reblog.join(",") || "";
    document.querySelector("#reblogUser").checked = result.reblogUser || false;
    document.querySelector("#text").value = result.text.join(",") || "";
    document.querySelector("#image").value = result.image.join(",") || "";
    document.querySelector("#art").value = result.art.join(",") || "";
    document.querySelector("#video").value = result.video.join(",") || "";
    document.querySelector("#audio").value = result.audio.join(",") || "";
    document.querySelector("#chat").value = result.chat.join(",") || "";
    document.querySelector("#quote").value = result.quote.join(",") || "";
    document.querySelector("#link").value = result.link.join(",") || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get({
    reblog: [],
    reblogUser: false,
    text: [],
    image: [],
    art: [],
    video: [],
    audio: [],
    chat: [],
    quote: [],
    link: []
  });
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);