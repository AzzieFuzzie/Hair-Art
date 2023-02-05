import GSAP from "gsap";
import Animation from "../classes/Animation";

export default class Navigation extends Animation {
  constructor(element, elements) {
    super({ element, elements });
  }

  animateIn() {
    const navigationButton = document.querySelector("button");

    navigationButton.addEventListener("click", function () {
      let tl = GSAP.timeline();
      tl.to(".navigation", {
        display: "grid",
        opacity: "1",
        duration: 2,
        ease: "linear",
      });

      // .to(".navigation__bar", { duration: 2, opacity: 0 }, "-=0.1");
      // .to(".close", { duration: 2, display: "block", opacity: 1 }, "-=0.1");
    });
  }
}
