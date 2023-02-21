import GSAP from "gsap";
import Prefix from "prefix";

import each from "lodash/each";

import Marquee from "../animations/marquee.js";
import Slider from "../animations/Slider.js";

export default class Page {
  constructor({ element, elements, id }) {
    this.selector = element;
    this.selectorChildren = {
      ...elements,
      animationGallery: '[data-animation="gallery"]',
      navigation: '[data-animation="navigation"]',
      cylinderRotation: '[data-animation="rotation"]',
    };

    this.id = id;

    this.transformPrefix = Prefix("transform");

    this.onMouseWheelEvent = this.onMouseWheel.bind(this);
    this.onMouseWheelEvent = this.onMouseWheel.bind(this);

    this.navigationListener();
  }

  create() {
    this.element = document.querySelector(this.selector);

    this.elements = {};

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
    };

    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    });
    this.createAnimations();
  }

  createAnimations() {
    // this.animationGallery = map(this.elements.animationGallery, (element) => {
    //   return new Marquee({
    //     element,
    //   });
    // });

    this.marquee = new Marquee();
    this.slider = new Slider();
  }

  show() {
    return new Promise((resolve) => {
      this.animationIn = GSAP.timeline();

      this.animationIn.fromTo(
        this.element,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
        }
      );

      this.animationIn.call((_) => {
        this.addEventListeners();

        resolve();
      });
    });
  }

  hide() {
    return new Promise((resolve) => {
      this.removeEventListeners();

      this.animationIn = GSAP.timeline();

      this.animationIn.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      });
    });
  }

  onMouseWheel(e) {
    const { deltaY } = e;

    this.scroll.target += deltaY;
  }

  onResize() {
    this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight;
  }

  update() {
    const navigationWrapper = document.querySelector(".navigation__wrapper");
    const navigationButton = document.querySelector(".navigation__bar__button");
    const closeButton = document.querySelector(".navigation__close");

    navigationButton.onclick = function () {
      this.scroll.limit = navigationWrapper.clientHeight;
      console.log(navigationWrapper.clientHeight);
    };

    closeButton.onclick = this.onResize();

    this.onResize();
    this.scroll.target = GSAP.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    );

    this.scroll.current = GSAP.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.1
    );

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }

    if (this.elements.wrapper) {
      this.elements.wrapper.style[
        this.transformPrefix
      ] = `translateY(-${this.scroll.current}px)`;
    }
  }

  addEventListeners() {
    window.addEventListener("mousewheel", this.onMouseWheelEvent);

    // window.addEventListener("touchstart", this.onTouchDown.bind(this));
    // window.addEventListener("touchmove", this.onTouchMove.bind(this));
    // window.addEventListener("touchend", this.onTouchUp.bind(this));
  }

  removeEventListeners() {
    window.removeEventListener("mousewheel", this.onMouseWheelEvent);
  }

  navigationListener() {
    const navigationButton = document.querySelector(".navigation__bar__button");
    navigationButton.addEventListener("click", () => {
      window.removeEventListener("mousewheel", this.onMouseWheelEvent);
    });

    const closeButton = document.querySelector(".navigation__close");
    closeButton.addEventListener("click", () => {
      window.addEventListener("mousewheel", this.onMouseWheelEvent);
    });
  }
}
