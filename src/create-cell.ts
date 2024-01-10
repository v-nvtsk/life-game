export function createCell(x: number, y: number): HTMLElement {
  const cell = document.createElement('td')
  cell.className = 'cell'
  cell.dataset.x = x.toString()
  cell.dataset.y = y.toString()
  cell.dataset.state = '0'
  return cell
}
