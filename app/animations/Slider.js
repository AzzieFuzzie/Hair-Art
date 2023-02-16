import GSAP from "gsap";

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
    const titleTag = document.querySelector(".treatments__title");
    const imageTag = document.querySelector(".treatments__image");

    const washSection = document.querySelector(".treatments__wash");
    const massageSection = document.querySelector(".treatments__massage");
    const homeSection = document.querySelector(".treatments__home");
    const facialSection = document.querySelector(".treatments__facials");
    const beardSection = document.querySelector(".treatments__beard");
    const hairCutsSection = document.querySelector(".treatments__hairCuts");

    const button = document.querySelector(".next__arrow");
    const backTag = document.querySelector(".back__arrow");

    const content = [
      {
        src: image04,
        text: washSection,
        title: "Wash & Blow Dry",
      },
      {
        src: image04,
        text: massageSection,
        title: "Massage",
      },
      {
        src: image04,
        text: homeSection,
        title: "Home Service",
      },
      {
        src: image04,
        text: beardSection,
        title: "Beard",
      },
      {
        src: image04,
        text: hairCutsSection,
        title: "Hair Cuts",
      },
      {
        src: image04,
        text: facialSection,
        title: "Facials",
      },
    ];

    const buttons = document.querySelectorAll("[data-carousel-button]");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = document
          .querySelector("[data-carousel]")
          .querySelector("[data-slides]");

        const activeSlide = slides.querySelector("[data-active]");

        let newIndex = [...slides.children].indexOf(activeSlide) + offset;

        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].dataset.active = true;
        imageTag.setAttribute("src", content[newIndex].src);
        titleTag.innerHTML = content[newIndex].title;

        GSAP.set("[data-active]", {
          transformOrigin: "center center -100px",
          duration: 2,
          backfaceVisibility: "hidden",
        });

        GSAP.to("[data-active]", {
          rotationX: "360",
          opacity: 1,
          stagger: 0.5,
          ease: "expo.out",
        });

        delete activeSlide.dataset.active;
      });
    });
  }
}
