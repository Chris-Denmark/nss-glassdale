export const alibiHTML = (criminal) => {
return `
  <h2>Known Associates: ${criminal.known_associates.name}</h2>
  <div>Alibi: ${criminal.known_associates.alibi}</div>
`
}