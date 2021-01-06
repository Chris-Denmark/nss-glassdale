import { getNotes, useNotes, deleteNote } from "./NoteDataProvider.js";
import { NoteHTMLConverter } from "./Note.js";
import { useCriminals } from "../criminals/CriminalDataProvider.js"

const contentTarget = document.querySelector(".noteList")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("showNotesClicked", () => {
    NoteList()
})

eventHub.addEventListener("noteStateChanged", () => {
  NoteList()
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, noteId] = clickEvent.target.id.split("--")

        /*
            Invoke the function that performs the delete operation.

            Once the operation is complete you should THEN invoke
            useNotes() and render the note list again.
        */
       deleteNote(noteId)
    }
})

const render = (noteArray, criminals) => {
    const allNotesConvertedToStrings = noteArray.map((note) => {
        const associatedCriminal = criminals.find(
            (criminal) => {
                return criminal.id === note.criminalId
            }
        )
        note.criminalName = associatedCriminal.name
        
        return NoteHTMLConverter(note)
    }).join("")

    contentTarget.innerHTML = allNotesConvertedToStrings
}


export const NoteList = () => {
    let criminals = useCriminals()
    getNotes()
        .then(() => {
            const allNotes = useNotes()
            render(allNotes, criminals)
        })
}