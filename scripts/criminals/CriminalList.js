import { getCriminals, useCriminals } from "./CriminalDataProvider.js"
import { Criminal } from "./Criminal.js"

const criminalElement = document.querySelector(".criminalsContainer")
let criminalCards = []

export const CriminalList = () => {
  getCriminals().then( () => {
    let perps = useCriminals()

    for (const perp of perps) {
      criminalCards.push(Criminal(perp))
    }
    criminalElement.innerHTML = criminalCards.join("")
  })
}