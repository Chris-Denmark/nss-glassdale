import { getCriminals, useCriminals } from "../criminals/CriminalDataProvider.js"

import { CriminalList } from "../criminals/CriminalList.js"

import { alibiHTML } from "./Alibi.js"

CriminalList()

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".alibiList")

const render = () => {

}

eventHub.addEventListener("associateButtonClicked", event => {
  const criminals = useCriminals()
  const criminal = criminals.find( (criminal) => criminal.id === parseInt(event.detail.criminalId))

  render(criminal)
})