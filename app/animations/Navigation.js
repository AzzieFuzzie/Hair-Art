import GSAP from "gsap";
import Animation from "../classes/Animation";

export default class Navigation {
  constructor() {
    this.animateIn();
    // this.animateOut();
  }

  animateIn() {
    const navigationButton = document.querySelector(".navigation__bar__button");

    navigationButton.addEventListener("click", function () {
      let tl = GSAP.timeline();
      tl.to(".navigation", {
        display: "grid",
        opacity: "1",
        duration: 1,
        ease: "expo.out",
      });
    });
  }
  animateOut() {
    const navigationLinks = document.querySelectorAll(
      ".navigation__list__link span"
    );
    navigationLinks.forEach((link) => {
      let hover = GSAP.timeline();

      hover.set(link, {
        transformOrigin: "center center -100px",
        duration: 2,
        backfaceVisibility: "hidden",
      });

      hover.to(link, {
        rotationX: "360",
        stagger: 0.1,
      });

      // link.addEventListener("mouseenter", () => hover.play());
      // link.addEventListener("mouseenter", () => {
      //   hover.play();
      //   console.log("enter");
      // });
      link.addEventListener("mouseleave", () => {
        hover.reverse();
        console.log("enter");
      });
    });
  }
}
