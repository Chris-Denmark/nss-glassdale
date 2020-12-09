import { getCriminals, useCriminals } from "../criminals/CriminalDataProvider.js"

let knownAssociates = []

const contentTarget = document.querySelector(".associateButton")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.class === "associateButton") {
    const customEvent = new CustomEvent("associateButtonClicked", {
      detail: {
        criminalAssociates: clickEvent.target.id
      }
    })
    eventHub.dispatchEvent(customEvent)
  }
})

