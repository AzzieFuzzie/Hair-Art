import GSAP from "gsap";
import Animation from "../classes/Animation";

// import splt from "spltjs";

import image01 from "../images/image01.jpg";
import image02 from "../images/image02.jpg";
import image03 from "../images/image03.jpg";
import image04 from "../images/image04.jpg";
import image05 from "../images/image05.jpg";

export default class Slider {
  constructor() {
    this.animateIn();
  }

  animateIn() {
    const imageTag = document.querySelector(".treatments__image");
    const titleTag = document.querySelector(".treatments__title");
    const active = document.querySelector(".active");

    const washSection = document.querySelector(".treatments__wash");
    const massageSection = document.querySelector(".treatments__massage");
    const homeSection = document.querySelector(".treatments__home");
    const facialSection = document.querySelector(".treatments__facials");
    const beardSection = document.querySelector(".treatments__beard");
    const hairCutsSection = document.querySelector(".treatments__hairCuts");

    const nextTag = document.querySelector(".next__arrow");
    const backTag = document.querySelector(".back__arrow");

    const content = [
      {
        src: image01,
        text: washSection,
        title: "Wash & Blow Dry",
      },
      {
        src: image02,
        text: massageSection,
        title: "Massage",
      },
      {
        src: image03,
        text: homeSection,
        title: "Home Service",
      },
      {
        src: image04,
        text: beardSection,
        title: "Beard",
      },
      {
        src: image05,
        text: hairCutsSection,
        title: "Hair Cuts",
      },
      {
        src: image05,
        text: facialSection,
        title: "Facials",
      },
    ];

    let index = 0;
    const next = function () {
      index = index + 1;

      if (index > content.length - 1) {
        index = 0;
      }
      update();
    };

    const back = function () {
      index = index - 1;
      if (index < 0) {
        index = content.length - 1;
      }
      update();
    };

    const update = function () {
      titleTag.innerHTML = content[index].title;
      titleTag.classList.replace("inactive", "active");

      active.innerHTML = content[index].text;
      content[index].text.classList.replace("inactive", "active");

      imageTag.setAttribute("src", content[index].src);
      animateOut();
    };
    if (nextTag) {
      nextTag.addEventListener("click", (event) => {
        event.preventDefault();
        next();
      });
    }

    if (backTag) {
      backTag.addEventListener("click", (event) => {
        event.preventDefault();
        back();
      });
    }
    const animateOut = function () {
      // splt({
      //   reveal: true,
      // });

      GSAP.set("[reveal]", {
        transformOrigin: "center center -100px",
        duration: 2,
        backfaceVisibility: "hidden",
      });

      GSAP.to("[reveal]", {
        rotationX: "360",
        stagger: 0.1,
        ease: "expo.out",
      });

      GSAP.set(".active", {
        transformOrigin: "center center -100px",
        duration: 2,
        backfaceVisibility: "hidden",
      });

      GSAP.to(".active", {
        rotationX: "360",
        stagger: 0.1,
        ease: "expo.out",
      });
    };
  }
}
