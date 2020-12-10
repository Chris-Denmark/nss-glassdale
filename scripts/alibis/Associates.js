let knownAssociates = []

const contentTarget = document.querySelector(".associateButton")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id.startsWith === "associates--") {
    const [prefix, chosenCriminal] = clickEvent.target.id.split("--")
    const customEvent = new CustomEvent("associateButtonClicked", {
      detail: {
        criminalId: chosenCriminal
      }
    })
    eventHub.dispatchEvent(customEvent)
  }
})

