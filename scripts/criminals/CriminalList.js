import { getCriminals, useCriminals } from "./CriminalDataProvider.js"
import { Criminal } from "./Criminal.js"
import { useConvictions } from "../convictions/ConvictionProvider.js"
import { useOfficers } from "../officers/OfficerProvider.js"
import { getFacilities, useFacilities } from "../facilities/FacilityProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "../facilities/CriminalFacilityProvider.js"

const criminalElement = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

let criminals = []
let facilities = []
let crimFac = []

const render = (criminalList) => {
  criminalElement.innerHTML = criminalList.map(
      (criminalObject) => {
          const facilityRelationshipsForThisCriminal = crimFac.filter(cf => cf.criminalId === criminalObject.id)

          const matchingFacilities = facilityRelationshipsForThisCriminal.map(cf => {
              const matchingFacilityObject = facilities.find(facility => facility.id === cf.facilityId)
              return matchingFacilityObject
          })

          return Criminal(criminalObject, matchingFacilities)
      }
  ).join("")
}

eventHub.addEventListener('crimeChosen', event => {
  if(event.detail.crimeThatWasChosen !== "0") {
    const crimes = useConvictions()
    const crime = crimes.find( (crime) => crime.id === parseInt(event.detail.crimeThatWasChosen) )
    
    const criminalsToFilter = criminals.slice()
    const matchingCriminals = criminalsToFilter.filter( (criminal) => criminal.conviction === crime.name)
      
    render(matchingCriminals) 
  }
})

export const CriminalList = () => {
  getCriminals()
  .then(getFacilities)
  .then(getCriminalFacilities)
  .then(
      () => {
        facilities = useFacilities()
        crimFac = useCriminalFacilities()
        criminals = useCriminals()

          render(criminals)                
  })
}

eventHub.addEventListener("officerChosen", event => {
  const officers = useOfficers()
  const officerId = parseInt(event.detail.officerThatWasChosen)
  const foundOfficer = officers.find( (officer) => officer.id === officerId)

  const criminalsToFilter = criminals.slice()
  const matchingCriminals = criminalsToFilter.filter(criminalObject => criminalObject.arrestingOfficer === foundOfficer.name) 

  render(matchingCriminals)
})