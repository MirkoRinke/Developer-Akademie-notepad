const noteInputNoteRef = document.getElementById("noteInputNote");
const noteInputTitleRef = document.getElementById("noteInputTitle");
const noteButtonRef = document.getElementById("noteButton");

let notesTitles = [];
let notes = [];
let archivNotesTitles = [];
let archivNotes = [];
let trashNotesTitles = [];
let trashNotes = [];

function saveToLocalStorage() {
  localStorage.setItem("notesTitles", JSON.stringify(notesTitles));
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("archivNotesTitles", JSON.stringify(archivNotesTitles));
  localStorage.setItem("archivNotes", JSON.stringify(archivNotes));
  localStorage.setItem("trashNotesTitles", JSON.stringify(trashNotesTitles));
  localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
}

function getFromLocalStorage() {
  const notesTitlesStorage = JSON.parse(localStorage.getItem("notesTitles"));
  const notesStorage = JSON.parse(localStorage.getItem("notes"));
  const archivNotesTitlesStorage = JSON.parse(localStorage.getItem("archivNotesTitles"));
  const archivNotesStorage = JSON.parse(localStorage.getItem("archivNotes"));
  const trashNotesTitlesStorage = JSON.parse(localStorage.getItem("trashNotesTitles"));
  const trashNotesStorage = JSON.parse(localStorage.getItem("trashNotes"));

  if (notesTitlesStorage) notesTitles = notesTitlesStorage;
  if (notesStorage) notes = notesStorage;
  if (archivNotesTitlesStorage) archivNotesTitles = archivNotesTitlesStorage;
  if (archivNotesStorage) archivNotes = archivNotesStorage;
  if (trashNotesTitlesStorage) trashNotesTitles = trashNotesTitlesStorage;
  if (trashNotesStorage) trashNotes = trashNotesStorage;
}
getFromLocalStorage();
/******************************
 *                            *
 *           Render           *
 *                            *
 *****************************/
//! The function to display the content ( render )
function renderNotes() {
  let contentRef = document.getElementById("noteContent");
  contentRef.innerHTML = "";
  for (let indexNotes = 0; indexNotes < notes.length; indexNotes++) {
    contentRef.innerHTML += getNotesTemplate(indexNotes);
  }
  saveToLocalStorage();
}
renderNotes();
//! The function to display the archivContent ( render )
function renderArchivNotes() {
  let archivContentRef = document.getElementById("archivContent");
  archivContentRef.innerHTML = "";
  for (let indexArchivNotes = 0; indexArchivNotes < archivNotes.length; indexArchivNotes++) {
    archivContentRef.innerHTML += getArchivNotesTemplate(indexArchivNotes);
  }
  saveToLocalStorage();
}
renderArchivNotes();
//! The function to display the trashContent ( render )
function renderTrashNotes() {
  let trashContentRef = document.getElementById("trashContent");
  trashContentRef.innerHTML = "";
  for (let indexTrashNotes = 0; indexTrashNotes < trashNotes.length; indexTrashNotes++) {
    trashContentRef.innerHTML += getTrashNotesTemplate(indexTrashNotes);
  }
  saveToLocalStorage();
}
renderTrashNotes();
/******************************
 *                            *
 *           Input            *
 *                            *
 *****************************/
//! Function for adding a note from the input field.
function addNote() {
  let note = noteInputNoteRef.value;
  let title = noteInputTitleRef.value;
  if ((note !== "") & (title !== "")) {
    notes.unshift(note);
    notesTitles.unshift(title);
    noteInputNoteRef.value = "";
    noteInputTitleRef.value = "";
  }
  if (title == "") noteInputTitleRef.style.borderBottomColor = "red";
  if (note == "") noteInputNoteRef.style.borderColor = "red";
  renderNotes();
}
//! EventListener
noteButtonRef.addEventListener("click", addNote);

noteInputNoteRef.addEventListener("input", function () {
  noteInputNoteRef.style.borderColor = "rgb(105, 105, 105, 0.8)";
});

noteInputTitleRef.addEventListener("input", function () {
  noteInputTitleRef.style.borderColor = "rgb(105, 105, 105, 0.8)";
});
/******************************
 *                            *
 *            move            *
 *                            *
 *****************************/
//! Notes to Trash
function notesToTrash(indexNotes) {
  let trashNote = notes.splice(indexNotes, 1);
  trashNotes.unshift(trashNote[0]);
  let trashNotesTitle = notesTitles.splice(indexNotes, 1);
  trashNotesTitles.unshift(trashNotesTitle[0]);
  renderNotes();
  renderTrashNotes();
}
//! Note to Archiv
function notesToArchiv(indexNotes) {
  let archivNote = notes.splice(indexNotes, 1);
  archivNotes.unshift(archivNote[0]);
  let archivNotesTitle = notesTitles.splice(indexNotes, 1);
  archivNotesTitles.unshift(archivNotesTitle[0]);
  renderNotes();
  renderArchivNotes();
}
//! Note return to Input
function returnNotesToInput(indexNotes) {
  if ((noteInputNoteRef.value == "") & (noteInputTitleRef.value == "")) {
    let inputNote = notes.splice(indexNotes, 1);
    noteInputNoteRef.value = inputNote;
    let inputTitle = notesTitles.splice(indexNotes, 1);
    noteInputTitleRef.value = inputTitle;
  }
  renderNotes();
}
//! Archiv to Trash
function archivToTrash(indexArchivNotes) {
  let trashNote = archivNotes.splice(indexArchivNotes, 1);
  let trashNotesTitle = archivNotesTitles.splice(indexArchivNotes, 1);
  trashNotes.unshift(trashNote[0]);
  trashNotesTitles.unshift(trashNotesTitle[0]);
  renderArchivNotes();
  renderTrashNotes();
}
//! Archiv to note
function archivTonote(indexArchivNotes) {
  let note = archivNotes.splice(indexArchivNotes, 1);
  let notesTitle = archivNotesTitles.splice(indexArchivNotes, 1);
  notes.unshift(note[0]);
  notesTitles.unshift(notesTitle[0]);
  renderArchivNotes();
  renderNotes();
}
//! Trash to Archiv
function trashToArchiv(indexTrashNotes) {
  let archivNote = trashNotes.splice(indexTrashNotes, 1);
  let archivNotesTitle = trashNotesTitles.splice(indexTrashNotes, 1);
  archivNotes.unshift(archivNote[0]);
  archivNotesTitles.unshift(archivNotesTitle[0]);
  renderArchivNotes();
  renderTrashNotes();
}
//! Trash to note
function trashTonote(indexTrashNotes) {
  let note = trashNotes.splice(indexTrashNotes, 1);
  let notesTitle = trashNotesTitles.splice(indexTrashNotes, 1);
  notes.unshift(note[0]);
  notesTitles.unshift(notesTitle[0]);
  renderTrashNotes();
  renderNotes();
}
/******************************
 *                            *
 *          delete            *
 *                            *
 *****************************/
//! Trash to delete
function deleteNotes(indexTrashNotes) {
  trashNotes.splice(indexTrashNotes, 1);
  trashNotesTitles.splice(indexTrashNotes, 1);
  renderTrashNotes();
}
