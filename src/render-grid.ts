// import initArray from './init-array'

export default function renderGrid(container: HTMLElement, size: number, data: number[][] | null): number {
  const grid: HTMLElement | null = container.querySelector('.field')
  const gridData = data
  if (gridData === null || grid === null) return 0
  let liveCells = 0
  const cells = Array.from(container.querySelectorAll('.cell')).reduce((acc: HTMLElement[][], el, i, arr) => {
    if (i % Math.sqrt(arr.length) === 0) {
      acc.push([el as HTMLElement])
    } else {
      acc[acc.length - 1].push(el as HTMLElement)
    }
    return acc
  }, [])

  if (cells.length === size) {
    gridData?.forEach((row, i) => {
      row.forEach((cellData, j) => {
        const cell = cells[i][j]
        cell.setAttribute('data-state', cellData.toString())
        cell.style.cssText = `width: calc(100% / ${size}); height: calc(100% / ${size});`
        liveCells += gridData[i][j]
      })
    })
  } else if (cells.length > size) {
    cells.forEach((row, i) => {
      if (i < size) {
        row.forEach((cell, j) => {
          if (j < size) {
            cell.setAttribute('data-state', gridData[i][j].toString())
            cell.style.cssText = `width: calc(100% / ${size}); height: calc(100% / ${size});`
            liveCells += gridData[i][j]
          } else {
            cell.remove()
          }
        })
      } else {
        const rowEl = row[0].parentElement
        rowEl?.remove()
      }
    })
  } else {
    const oldSize = cells.length
    gridData?.forEach((rowData, i) => {
      let row: HTMLElement | null
      if (i >= oldSize) {
        row = document.createElement('tr')
        row.className = 'row'
        grid.appendChild(row)
      } else {
        row = cells[i][0].parentElement
      }
      rowData.forEach((cellData, j) => {
        let cell: HTMLElement
        if (i >= oldSize || j >= oldSize) {
          cell = document.createElement('td')
          row?.append(cell)

          cell.setAttribute('data-x', i.toString())
          cell.setAttribute('data-y', j.toString())
          cell.classList.add('cell')
        } else {
          cell = cells[i][j]
        }
        cell.setAttribute('data-state', cellData.toString())
        cell.style.cssText = `width: calc(100% / ${size}); height: calc(100% / ${size});`
        liveCells += gridData[i][j]
      })
    })
  }

  return liveCells
}
