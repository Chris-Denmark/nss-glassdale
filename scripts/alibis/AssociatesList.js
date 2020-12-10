import { useCriminals } from "../criminals/CriminalDataProvider.js"

import { CriminalList } from "../criminals/CriminalList.js"

import { alibiHTML } from "./Alibi.js"

CriminalList()

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".alibiList")

const render = (criminalObj) => {
  let knownAssociates = []
  let associates = criminalObj.known_associates
  for (const associate of associates) {
    knownAssociates.push(alibiHTML(associate))
  }
  contentTarget.innerHTML = knownAssociates.join("")
}

eventHub.addEventListener("associateButtonClicked", event => {
  const criminals = useCriminals()
  const criminal = criminals.find( (criminal) => criminal.id === parseInt(event.detail.criminalId))

  render(criminal)
})
