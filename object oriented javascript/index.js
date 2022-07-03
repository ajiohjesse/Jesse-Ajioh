const circle = {
  radius: 1,
  location: {
    x: 1,
    y: 1,
  },
  draw: function () {
    console.log("draw");
  },
};

function createCircle(radius) {
  return {
    radius,
    draw: () => {
      console.log("draw");
    },
  };
}

const circle1 = createCircle(1);

//constructor

class Circle2 {
  constructor(radius) {
    this.radius = radius;
    this.draw = () => {
      console.log("draw");
    };
  }
}

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

const head = new domNode(".head");

const btnOBJ = new domNode("#btn");
const btn = btnOBJ.node;

btnOBJ.event("click", btnColor);

head.event("click", logToConsole);

function btnColor(e) {
  e.target.style.background = "red";
}

function logToConsole() {
  console.log("call back function");
  head.toggleClass("bold");
}
