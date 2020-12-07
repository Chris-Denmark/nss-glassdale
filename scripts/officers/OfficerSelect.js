import { useOfficers, getOfficers } from "./OfficerProvider.js"

const contentTarget = document.querySelector(".filters__officer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("change", event => {
  if (event.target.id === "officerSelect") {
    const customEvent = new CustomEvent("officerChosen", {
      detail: {
        officerThatWasChosen: event.target.value
      }
    })
    eventHub.dispatchEvent(customEvent)
  }
})

export const OfficerSelect = () => {
  getOfficers()
  .then( () => {
    const officers = useOfficers()
    render(officers)
  })
}

const render = officersCollection => {
  contentTarget.innerHTML =`
  <select class="dropdown" id="officerSelect">
    <option value="0">Please select an officer...</option>
    ${
      officersCollection.map((officer) => `
      <option value="${officer.id}">
      ${officer.name}
      </option>
      `)
    }
    </select>
  `
}