import each from "lodash/each";
import Canvas from "components/Canvas/index.js";
import Detection from "classes/Detection";

import Home from "pages/Home/index.js";
import About from "pages/About/index.js";
import Contact from "pages/Contact/index.js";
import Treatments from "pages/Treatments/index.js";
import Navigation from "./components/Navigation";

class App {
  constructor() {
    this.createContent();

    // this.createCanvas();
    this.createNavigation();
    this.createPages();

    this.onResize();

    this.detect();

    this.addEventListeners();
  }

  detect() {
    console.log(Detection.isMobile());
    const mobile = Detection.isMobile()
      ? console.log("Mobile detection")
      : this.update();
  }

  createNavigation() {
    this.navigation = new Navigation();
  }

  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  createCanvas() {
    this.canvas = new Canvas();
  }
  createPages() {
    this.pages = {
      home: new Home(),
      about: new About(),
      contact: new Contact(),
      treatments: new Treatments(),
    };

    this.page = this.pages[this.template];
    this.page.create();
    this.page.show();
  }

  async onChange(url) {
    await this.page.hide();

    const res = await window.fetch(url);

    if (res.status === 200) {
      const html = await res.text();

      const div = document.createElement("div");
      div.innerHTML = html;

      const divContent = div.querySelector(".content");
      this.content.innerHTML = divContent.innerHTML;

      this.template = divContent.getAttribute("data-template");
      this.content.setAttribute("data-template", this.template);

      this.page = this.pages[this.template];
      this.page.create();
      this.page.show();
    } else {
      console.error(`response status: ${res.status}`);
    }
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }

    if (this.canvas && this.canvas.onResize) {
      this.canvas.onResize();
    }
  }

  /*
   *  Loop
   */

  update() {
    if (this.page && this.page.update) {
      this.page.update();
    }
    if (this.canvas && this.canvas.onResize) {
      this.canvas.onResize();
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }

  /*
   * Listeners
   */

  addEventListeners() {
    // window.addEventListener("mousewheel", this.onWheel.bind(this));
    // window.addEventListener("mousedown", this.onTouchDown.bind(this));
    // window.addEventListener("mousemove", this.onTouchMove.bind(this));
    // window.addEventListener("mouseup", this.onTouchUp.bind(this));
    // window.addEventListener("touchstart", this.onTouchDown.bind(this));
    // window.addEventListener("touchmove", this.onTouchMove.bind(this));
    // window.addEventListener("touchend", this.onTouchUp.bind(this));
    // window.addEventListener("resize", this.onResize.bind(this));
  }

  addLinkListeners() {
    const links = document.querySelectorAll("a");

    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault();

        const { href } = link;
        this.onChange({ url: href });
      };
    });
  }
}

new App();
