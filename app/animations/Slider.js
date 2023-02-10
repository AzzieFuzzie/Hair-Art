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
    const spClass = document.querySelector(".sp");

    const washSection = document.querySelector(".treatments__wash");
    const massageSection = document.querySelector(".treatments__massage");
    const homeSection = document.querySelector(".treatments__home");
    const facialSection = document.querySelector(".treatments__facial");
    const beardSection = document.querySelector(".treatments__beard");
    const hairCutsSection = document.querySelector(".treatments__hairCuts");

    const nextTag = document.querySelector(".next__arrow");
    const backTag = document.querySelector(".back__arrow");

    const images = [
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
        text: hairCutsSection,
        title: "Hair Cuts",
      },
      // {
      //   src: image05,
      //   text: hairCutSection,
      //   title: "Hair Cuts",
      // },
    ];

    let index = 0;
    const next = function () {
      index = index + 1;

      if (index > images.length - 1) {
        index = 0;
      }
      update();
    };

    const back = function () {
      index = index - 1;
      if (index < 0) {
        index = images.length - 1;
      }
      update();
    };

    const update = function () {
      titleTag.innerHTML = images[index].title;
      titleTag.classList.add("reveal");
      animateOut();
      spClass.innerHTML = images[index].text;
      // images[index].text.classList.add("flex__active");
      imageTag.setAttribute("src", images[index].src);
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

      GSAP.set(".reveal", {
        transformOrigin: "center center -100px",
        duration: 2,
        backfaceVisibility: "hidden",
      });

      GSAP.to(".reveal", {
        rotationX: "360",
        stagger: 0.1,
      });
    };
  }
}
