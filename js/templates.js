//! noteContent
function getNotesTemplate(indexNotes) {
  return /*html*/ `
    <div class="main_container--note_main_container--notes--content--note">
      <p class="main_container--note_main_container--notes--content--note--heading">
        ${allNotes.notesTitles[indexNotes]}
      </p>
      <p>${allNotes.notes[indexNotes]} 
      <img class="main_container--note_main_container--notes--content--note--delete_button" 
      onclick="moveTo(${indexNotes},'notes','trashNotes')" src="./assets/img/icon/trash.svg" alt="">
      <img class="main_container--note_main_container--notes--content--note--archiv_button" 
      onclick="moveTo(${indexNotes},'notes','archivNotes')" src="./assets/img/icon/archiv.svg" alt="">
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
          ${allNotes.archivNotesTitles[indexArchivNotes]}
        </p>
        <p>${allNotes.archivNotes[indexArchivNotes]}         
        <img class="main_container--note_main_container--archiv--archivContent--archiv_note--delete_button" 
        onclick="moveTo(${indexArchivNotes},'archivNotes','trashNotes')" src="./assets/img/icon/trash.svg" alt="">                   
        <img  class="main_container--note_main_container--archiv--archivContent--archiv_note--note_button" 
        onclick="moveTo(${indexArchivNotes},'archivNotes','notes')" src="./assets/img/icon/note.svg" alt="">        
        </p>
      </div>
          `;
}
//! trashContent
function getTrashNotesTemplate(indexTrashNotes) {
  return /*html*/ `
    <div class="main_container--note_main_container--trash--trashContent--trash_note">
      <p class="main_container--note_main_container--trash--trashContent--trash_note--heading" >
        ${allNotes.trashNotesTitles[indexTrashNotes]}
      </p>
      <p>${allNotes.trashNotes[indexTrashNotes]} 
      <img class="main_container--note_main_container--trash--trashContent--trash_note--delete_button" 
      onclick="deleteNotes(${[indexTrashNotes]})" src="./assets/img/icon/delete.svg" alt="">
      <img class="main_container--note_main_container--trash--trashContent--trash_note--archiv_button" 
      onclick="moveTo(${indexTrashNotes},'trashNotes','archivNotes')" src="./assets/img/icon/archiv.svg" alt="">
      <img class="main_container--note_main_container--trash--trashContent--trash_note--note_button" 
      onclick="moveTo(${indexTrashNotes},'trashNotes','notes')" src="./assets/img/icon/note.svg" alt="">
      </p>
    </div>
        `;
}
