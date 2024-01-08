import initArray from './init-array'

export default function renderGrid(container: HTMLElement, size: number, data: number[][] | null): number {
  const grid: HTMLElement | null = container.querySelector('.field')
  let gridData: number[][]
  if (data !== null) {
    gridData = data
  } else {
    gridData = initArray(size)
  }
  let liveCells = 0
  if (grid !== null) {
    // TODO: refactor optimize removing and adding only new cells
    grid.innerHTML = ''
    for (let i = 0; i < size; i += 1) {
      const row = document.createElement('tr')
      row.className = 'row'
      for (let j = 0; j < size; j += 1) {
        const cell = document.createElement('td')
        cell.setAttribute('data-x', i.toString())
        cell.setAttribute('data-y', j.toString())
        cell.setAttribute('data-state', gridData[i][j].toString())
        cell.classList.add('cell')
        cell.style.cssText = `width: calc(100% / ${size}); height: calc(100% / ${size});`
        row.appendChild(cell)

        liveCells += gridData[i][j]
      }
      grid.appendChild(row)
    }
  }
  return liveCells
}
