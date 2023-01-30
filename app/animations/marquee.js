import GSAP from "gsap";
import Animation from "../classes/Animation";

export default class Marquee extends Animation {
  constructor({ element, elements }) {
    super({ element, elements });

    this.animateIn();
    this.animateOut();
  }

  animateIn() {
    console.log(this.element);
    GSAP.to(this.element, {
      autoAlpha: 1,
      duration: 5,
      delay: 2,
    });
  }

  animateOut() {
    console.log(this.element);
    GSAP.set(this.element, {
      autoAlpha: 0,
    });
  }
}
