import { saveNote } from "./NoteDataProvider.js"

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        const author = document.querySelector("#author").value
        const text = document.querySelector("#text").value
        const suspect = document.querySelector("#suspect").value

        const newNote = {
           author: author,
           text: text,
           suspect: suspect,
           timestamp: Date.now()
        }
        saveNote(newNote)
    }
})


const render = () => {
    contentTarget.innerHTML = `
        <input type="text" id="author" placeholder="author name">
        <textarea id="text" placeholder="note text"></textarea>
        <input type="text" id="suspect" placeholder="suspect name">
        <button id="saveNote">Save Note</button>
    `
}

export const NoteForm = () => {
    render()
}