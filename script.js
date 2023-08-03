// script.js
// Get elements
const dropdown = document.querySelector(".dropdown");
const selectedOption = document.querySelector(".selected-option");
const optionsList = document.querySelector(".options");
const options = document.querySelectorAll(".options li");
const listSection = document.querySelector(".list-section");
const listContainer = document.querySelector(".list");
const browseButton = document.getElementById("browseButton");
const fileInput = document.getElementById("fileInput");
const sendData = document.querySelector(".submit");
const ulElement = document.querySelector(".options");
const leadEl = document.querySelector(".selected-option");
const noteEl = document.querySelector(".note");

// Data
let fileData;
let leadSelection;
let note;

const optionsArray = ["Option 1", "Option 2", "Option 3"];

// Function to populate the <ul> element with options from the array
function loadOptions() {
  optionsArray.forEach((option) => {
    const liElement = document.createElement("li");
    liElement.textContent = option;
    liElement.addEventListener("click", (event) => {
      selectedOption.innerHTML = event.target.innerHTML;
    });
    ulElement.appendChild(liElement);
  });
}

window.addEventListener("load", loadOptions);

// Call the function to load options on page load

// Toggle dropdown open/close
dropdown.addEventListener("click", () => {
  dropdown.classList.toggle("open");
});

// Handle option selection

browseButton.addEventListener("click", openFileInput);
fileInput.addEventListener("change", handleFileSelect);

// Submit button
sendData.addEventListener("click", (event) => {
  event.preventDefault();
  leadSelection = leadEl.innerHTML;
  note = noteEl.value;
  console.log("Hello", note, leadSelection);
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove("open");
  }
});

// Helper Functions
function openFileInput() {
  document.getElementById("fileInput").click();
}

function typeValidation(type) {
  let splitType = type.split("/")[0];
  if (
    type == "application/pdf" ||
    splitType == "image" ||
    type == "text/plain" ||
    type ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return true;
  }
}

function handleFileSelect(event) {
  [...fileInput.files].forEach((file) => {
    if (typeValidation(file.type)) {
      uploadFile(file);
    } else {
      listSection.style.display = "block";
      listContainer.innerHTML = `
      <div class="upload-card" style="margin-top:1rem">
        <p style="color:red">Invalid file Format</p>
      </div>
      `;
    }
  });
}

function uploadFile(file) {
  fileData = file;
  listSection.style.display = "block";
  var li = document.createElement("li");
  li.classList.add("in-prog");
  li.innerHTML = `
        <div class="upload-card">
        
            <div class = "flex-center">
            ${iconSelector(file.type)}
            <div class="file-info">
                <div class="file-name">
                    <div class="name">${file.name}</div>
                </div>

                <div class="file-size">${(file.size / (1024 * 1024)).toFixed(
                  2
                )} MB</div>
            </div></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="green" class="tick" height="20" width="20"><path d="m8.229 14.438-3.896-3.917 1.438-1.438 2.458 2.459 6-6L15.667 7Z"/></svg>
        </div>
    `;
  listContainer.innerHTML = "";
  listContainer.prepend(li);
}
// find icon for file
function iconSelector(type) {
  if (type.includes("image")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="file-icon">
    <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
  </svg>
  `;
  } else if (type === "text/plain") {
    return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="file-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
  `;
  } else if (type === "application/pdf") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="file-icon" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"/>
  </svg>`;
  } else if (
    type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="file-icon" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5Zm-6.839 9.688v-.522a1.54 1.54 0 0 0-.117-.641.861.861 0 0 0-.322-.387.862.862 0 0 0-.469-.129.868.868 0 0 0-.471.13.868.868 0 0 0-.32.386 1.54 1.54 0 0 0-.117.641v.522c0 .256.04.47.117.641a.868.868 0 0 0 .32.387.883.883 0 0 0 .471.126.877.877 0 0 0 .469-.126.861.861 0 0 0 .322-.386 1.55 1.55 0 0 0 .117-.642Zm.803-.516v.513c0 .375-.068.7-.205.973a1.47 1.47 0 0 1-.589.627c-.254.144-.56.216-.917.216a1.86 1.86 0 0 1-.92-.216 1.463 1.463 0 0 1-.589-.627 2.151 2.151 0 0 1-.205-.973v-.513c0-.379.069-.704.205-.975.137-.274.333-.483.59-.627.257-.147.564-.22.92-.22.357 0 .662.073.916.22.256.146.452.356.59.63.136.271.204.595.204.972ZM1 15.925v-3.999h1.459c.406 0 .741.078 1.005.235.264.156.46.382.589.68.13.296.196.655.196 1.074 0 .422-.065.784-.196 1.084-.131.301-.33.53-.595.689-.264.158-.597.237-.999.237H1Zm1.354-3.354H1.79v2.707h.563c.185 0 .346-.028.483-.082a.8.8 0 0 0 .334-.252c.088-.114.153-.254.196-.422a2.3 2.3 0 0 0 .068-.592c0-.3-.04-.552-.118-.753a.89.89 0 0 0-.354-.454c-.158-.102-.361-.152-.61-.152Zm6.756 1.116c0-.248.034-.46.103-.633a.868.868 0 0 1 .301-.398.814.814 0 0 1 .475-.138c.15 0 .283.032.398.097a.7.7 0 0 1 .273.26.85.85 0 0 1 .12.381h.765v-.073a1.33 1.33 0 0 0-.466-.964 1.44 1.44 0 0 0-.49-.272 1.836 1.836 0 0 0-.606-.097c-.355 0-.66.074-.911.223-.25.148-.44.359-.571.633-.131.273-.197.6-.197.978v.498c0 .379.065.704.194.976.13.271.321.48.571.627.25.144.555.216.914.216.293 0 .555-.054.785-.164.23-.11.414-.26.551-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.765a.8.8 0 0 1-.117.364.699.699 0 0 1-.273.248.874.874 0 0 1-.401.088.845.845 0 0 1-.478-.131.834.834 0 0 1-.298-.393 1.7 1.7 0 0 1-.103-.627v-.495Zm5.092-1.76h.894l-1.275 2.006 1.254 1.992h-.908l-.85-1.415h-.035l-.852 1.415h-.862l1.24-2.015-1.228-1.984h.932l.832 1.439h.035l.823-1.439Z"/>
  </svg>`;
  }
}
