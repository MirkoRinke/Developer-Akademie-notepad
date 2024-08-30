//! noteContent
function getNotesTemplate(indexNotes) {
  return /*html*/ `
    <div class="main_container--note_main_container--notes--content--note">
      <p class="main_container--note_main_container--notes--content--note--heading">
        ${notesTitles[indexNotes]}
      </p>
      <p>${notes[indexNotes]} 
      <img class="main_container--note_main_container--notes--content--note--delete_button" 
      onclick="notesToTrash(${[indexNotes]})" src="./assets/img/icon/trash.svg" alt="">
      <img class="main_container--note_main_container--notes--content--note--archiv_button" 
      onclick="notesToArchiv(${[indexNotes]})" src="./assets/img/icon/archiv.svg" alt="">
      <img class="main_container--note_main_container--notes--content--note--input_button"
      onclick="returnNotesToInput(${[indexNotes]})" src="./assets/img/icon/edit.svg" alt="">      
      </p>
    </div>
      `;
}

//! archivContent
function getArchivNotesTemplate(indexArchivNotes) {
  return /*html*/ `
      <div class="main_container--note_main_container--archiv--archivContent--archiv_note">
        <p class="main_container--note_main_container--archiv--archivContent--archiv_note--heading" >
          ${archivNotesTitles[indexArchivNotes]}
        </p>
        <p>${archivNotes[indexArchivNotes]}         
        <img class="main_container--note_main_container--archiv--archivContent--archiv_note--delete_button" 
        onclick="archivToTrash(${[indexArchivNotes]})" src="./assets/img/icon/trash.svg" alt="">                   
        <img  class="main_container--note_main_container--archiv--archivContent--archiv_note--note_button" 
        onclick="archivTonote(${[indexArchivNotes]})" src="./assets/img/icon/note.svg" alt="">        
        </p>
      </div>
          `;
}

//! trashContent
function getTrashNotesTemplate(indexTrashNotes) {
  return /*html*/ `
    <div class="main_container--note_main_container--trash--trashContent--trash_note">
      <p class="main_container--note_main_container--trash--trashContent--trash_note--heading" >
        ${trashNotesTitles[indexTrashNotes]}
      </p>
      <p>${trashNotes[indexTrashNotes]} 
      <img class="main_container--note_main_container--trash--trashContent--trash_note--delete_button" 
      onclick="deleteNotes(${[indexTrashNotes]})" src="./assets/img/icon/delete.svg" alt="">
      <img class="main_container--note_main_container--trash--trashContent--trash_note--archiv_button" 
      onclick="trashToArchiv(${[indexTrashNotes]})" src="./assets/img/icon/archiv.svg" alt="">
      <img class="main_container--note_main_container--trash--trashContent--trash_note--note_button" 
      onclick="trashTonote(${[indexTrashNotes]})" src="./assets/img/icon/note.svg" alt="">
      </p>
    </div>
        `;
}
