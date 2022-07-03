class domNode {
  constructor(identifier) {
    this.node = document.querySelector(identifier);
    this.event = (eventType, customFunction) => {
      this.node.addEventListener(eventType, customFunction);
    };
    this.text = (text) => {
      this.node.textContent = text;
    };
    this.HTML = (HTML) => {
      this.node.innerHTML = HTML;
    };
    this.addClass = (className) => {
      this.node.classList.add(className);
    };
    this.removeClass = (className) => {
      this.node.classList.remove(className);
    };
    this.toggleClass = (className) => {
      this.node.classList.toggle(className);
    };
  }
}
