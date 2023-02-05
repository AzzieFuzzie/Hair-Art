import GSAP from "gsap";
import Animation from "../classes/Animation";

export default class Marquee extends Animation {
  constructor({ element, elements }) {
    super({ element, elements });
  }

  animateIn() {
    console.log(this.element);
    GSAP.to(this.element, {
      x: this.element.parentElement.clientWidth * -1,
      duration: 10,
      // delay: 2,
      ease: "linear",
      repeat: -1,
    });
  }

  animateOut() {
    console.log(this.element);
    GSAP.set(this.element, {
      x: 0,
    });
  }
}
