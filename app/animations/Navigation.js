import GSAP from "gsap";
import Animation from "../classes/Animation";

export default class Navigation {
  constructor() {
    this.animateIn();
    // this.animateOut();
  }

  animateIn() {
    const navigationButton = document.querySelector(".navigation__bar__button");
    const closeButton = document.querySelector(".navigation__close");
    const body = document.querySelector("body");

    let tl = GSAP.timeline({ paused: true });

    tl.to(".navigation", {
      display: "grid",
      opacity: "1",
      ease: "expo.out",
    });

    function open() {
      tl.play();

      body.classList.add("hide");
    }

    function close() {
      tl.reverse();

      body.classList.remove("hide");
    }
    navigationButton.addEventListener("click", open);
    closeButton.addEventListener("click", close);
  }
  animateOut() {
    const navigationLinks = document.querySelectorAll(
      ".navigation__list__link span"
    );
    navigationLinks.forEach((link) => {
      let hover = GSAP.timeline();

      hover.set(link, {
        transformOrigin: "center center -100px",

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
