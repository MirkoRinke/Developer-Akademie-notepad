const noteInputTitleRef = document.getElementById("noteInputTitle");
const noteInputNoteRef = document.getElementById("noteInputNote");
const noteButtonRef = document.getElementById("noteButton");

let allNotes = {
  notesTitles: [],
  notes: [],
  archivNotesTitles: [],
  archivNotes: [],
  trashNotesTitles: [],
  trashNotes: [],
};

noteInputTitleRef.addEventListener("input", function () {
  noteInputTitleRef.style.borderColor = "rgb(105, 105, 105, 0.8)";
});

noteInputNoteRef.addEventListener("input", function () {
  noteInputNoteRef.style.borderColor = "rgb(105, 105, 105, 0.8)";
});

noteButtonRef.addEventListener("click", addNote);

function getCurrentDate() {
  let currentDateRef = new Date();
  let day = String(currentDateRef.getDate()).padStart(2, "0"); // https://www.w3schools.com/jsreF/jsref_string_padstart.asp
  let month = String(currentDateRef.getMonth() + 1).padStart(2, "0");
  let year = currentDateRef.getFullYear();
  let hours = String(currentDateRef.getHours()).padStart(2, "0");
  let minutes = String(currentDateRef.getMinutes()).padStart(2, "0");
  let seconds = String(currentDateRef.getSeconds()).padStart(2, "0");
  let currentDate = day + "." + month + "." + year;
  let currentTime = hours + "." + minutes + "." + seconds;
  return currentDate + " " + currentTime;
}

function saveToLocalStorage() {
  localStorage.setItem("notesTitles", JSON.stringify(allNotes.notesTitles));
  localStorage.setItem("notes", JSON.stringify(allNotes.notes));
  localStorage.setItem("archivNotesTitles", JSON.stringify(allNotes.archivNotesTitles));
  localStorage.setItem("archivNotes", JSON.stringify(allNotes.archivNotes));
  localStorage.setItem("trashNotesTitles", JSON.stringify(allNotes.trashNotesTitles));
  localStorage.setItem("trashNotes", JSON.stringify(allNotes.trashNotes));
}

function getFromLocalStorage() {
  const notesTitlesStorage = JSON.parse(localStorage.getItem("notesTitles"));
  const notesStorage = JSON.parse(localStorage.getItem("notes"));
  const archivNotesTitlesStorage = JSON.parse(localStorage.getItem("archivNotesTitles"));
  const archivNotesStorage = JSON.parse(localStorage.getItem("archivNotes"));
  const trashNotesTitlesStorage = JSON.parse(localStorage.getItem("trashNotesTitles"));
  const trashNotesStorage = JSON.parse(localStorage.getItem("trashNotes"));
  if (notesTitlesStorage) allNotes.notesTitles = notesTitlesStorage;
  if (notesStorage) allNotes.notes = notesStorage;
  if (archivNotesTitlesStorage) allNotes.archivNotesTitles = archivNotesTitlesStorage;
  if (archivNotesStorage) allNotes.archivNotes = archivNotesStorage;
  if (trashNotesTitlesStorage) allNotes.trashNotesTitles = trashNotesTitlesStorage;
  if (trashNotesStorage) allNotes.trashNotes = trashNotesStorage;
}
getFromLocalStorage();

function renderContent(renderContent) {
  let contentRef;
  let notesArray;
  let templateFunction;
  if (renderContent === "notes") {
    contentRef = document.getElementById("noteContent");
    notesArray = allNotes.notes;
    templateFunction = getNotesTemplate;
  } else if (renderContent === "archivNotes") {
    contentRef = document.getElementById("archivContent");
    notesArray = allNotes.archivNotes;
    templateFunction = getArchivNotesTemplate;
  } else if (renderContent === "trashNotes") {
    contentRef = document.getElementById("trashContent");
    notesArray = allNotes.trashNotes;
    templateFunction = getTrashNotesTemplate;
  }
  contentRef.innerHTML = "";
  for (let index = 0; index < notesArray.length; index++) {
    contentRef.innerHTML += templateFunction(index);
  }
  saveToLocalStorage();
}

function render() {
  renderContent("notes");
  renderContent("archivNotes");
  renderContent("trashNotes");
}
render();

function addNote() {
  let noteDate = getCurrentDate();
  let note = noteInputNoteRef.value;
  let title = noteInputTitleRef.value;
  if ((note !== "") & (title !== "")) {
    allNotes.notes.unshift(note.replace(/\n/g, "<br>") + "<br>" + noteDate); // https://www.w3schools.com/jsref/jsref_obj_regexp.asp
    allNotes.notesTitles.unshift(title);
    noteInputNoteRef.value = "";
    noteInputTitleRef.value = "";
  }
  if (title == "") noteInputTitleRef.style.borderBottomColor = "red";
  if (note == "") noteInputNoteRef.style.borderColor = "red";
  renderContent("notes");
}

function moveTo(indexNotes, startkey, destinationKey) {
  let notes = allNotes[startkey].splice(indexNotes, 1);
  allNotes[destinationKey].unshift(notes[0]);
  let notesTitle = allNotes[startkey + "Titles"].splice(indexNotes, 1);
  allNotes[destinationKey + "Titles"].unshift(notesTitle[0]);
  renderContent(startkey);
  renderContent(destinationKey);
}

function returnNotesToInput(indexNotes) {
  if (noteInputNoteRef.value === "" && noteInputTitleRef.value === "") {
    let inputNote = allNotes.notes.splice(indexNotes, 1)[0];
    let inputTitle = allNotes.notesTitles.splice(indexNotes, 1)[0];
    if (inputNote.length > 23) inputNote = inputNote.slice(0, -23);
    noteInputNoteRef.value = inputNote;
    noteInputTitleRef.value = inputTitle;
  }
  renderContent("notes");
}

function deleteNotes(indexTrashNotes) {
  allNotes.trashNotes.splice(indexTrashNotes, 1);
  allNotes.trashNotesTitles.splice(indexTrashNotes, 1);
  renderContent("trashNotes");
}
