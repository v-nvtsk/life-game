function appendWithElement(container: HTMLElement, tag: string, className = '', innerHTML = ''): HTMLElement {
  const element = document.createElement(tag)
  element.innerHTML = innerHTML
  element.className = className
  container.append(element)
  return element
}

export default appendWithElement
