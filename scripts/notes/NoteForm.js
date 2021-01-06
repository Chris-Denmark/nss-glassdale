import { saveNote } from "./NoteDataProvider.js"
import { useCriminals, getCriminals } from "../criminals/CriminalDataProvider.js"

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        const author = document.querySelector("#author").value
        const text = document.querySelector("#text").value
        const criminalId = parseInt(document.querySelector("#suspect").value)

        const newNote = {
           author: author,
           text: text,
           criminalId: criminalId,
           timestamp: Date.now()
        }
        saveNote(newNote)
    }
})


const render = () => {
    const criminalsCollection = useCriminals()

    contentTarget.innerHTML = `
        <input type="text" id="author" placeholder="author name">
        <textarea id="text" placeholder="note text"></textarea>
        <select class="dropdown" id="suspect">
            <option value="0">Please select a suspect...</option>
            ${
                criminalsCollection.map(
                    (criminal) => `
                        <option value=${criminal.id}>${criminal.name}</option>
                    `
                )
            }
        </select>
        <button id="saveNote">Save Note</button>
    `
}

export const NoteForm = () => {
    getCriminals()
    .then( () => render())
}