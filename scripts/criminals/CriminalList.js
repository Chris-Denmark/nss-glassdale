import { getCriminals, useCriminals } from "./CriminalDataProvider.js"
import { Criminal } from "./Criminal.js"
import { useConvictions } from "../convictions/ConvictionProvider.js"
import { useOfficers } from "../officers/OfficerProvider.js"

const criminalElement = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

const render = (criminals) => {
  let criminalCards = []
  for (const perp of criminals) {
    criminalCards.push(Criminal(perp))
  }
  criminalElement.innerHTML = criminalCards.join("")
}

eventHub.addEventListener('crimeChosen', event => {
  if(event.detail.crimeThatWasChosen !== "0") {
    const crimes = useConvictions()
    const crime = crimes.find( (crime) => crime.id === parseInt(event.detail.crimeThatWasChosen) )
    
    const criminals = useCriminals()
    const matchingCriminals = criminals.filter( (criminal) => criminal.conviction === crime.name)
      
    render(matchingCriminals)
  }
})

export const CriminalList = () => {
  getCriminals().then( () => {
    let perps = useCriminals()
    render(perps)                 
  })
}

eventHub.addEventListener("officerChosen", event => {
  const officers = useOfficers()
  const officerId = parseInt(event.detail.officerThatWasChosen)
  const foundOfficer = officers.find( (officer) => officer.id === officerId)

  const criminals = useCriminals()
  const matchingCriminals = criminals.filter(criminalObject => criminalObject.arrestingOfficer === foundOfficer.name) 

  render(matchingCriminals)
})