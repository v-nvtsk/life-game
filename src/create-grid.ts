export default function createGrid(size: number): HTMLTableElement {
  const field = document.createElement('table')
  field.className = 'field'
  for (let i = 0; i < size; i += 1) {
    const row = document.createElement('tr')
    row.className = 'row'
    for (let j = 0; j < size; j += 1) {
      const cell = document.createElement('td')
      cell.setAttribute('data-x', i.toString())
      cell.setAttribute('data-y', j.toString())
      cell.setAttribute('data-state', '0')
      cell.classList.add('cell')
      cell.style.cssText = `width: calc(100% / ${size}); height: calc(100% / ${size});`
      row.appendChild(cell)
    }
    field.appendChild(row)
  }

  return field
}
