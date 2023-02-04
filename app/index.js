import each from "lodash/each";
import Canvas from "components/Canvas/index.js";

import Home from "pages/Home/index.js";
import About from "pages/About/index.js";
import Contact from "pages/Contact/index.js";

class App {
  constructor() {
    this.createContent();

    this.createCanvas();
    this.createPages();

    this.onResize();

    this.addEventListeners();
    this.update();
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
  }

  /*
   *  Loop
   */

  update() {
    if (this.page && this.page.update) {
      this.page.update();
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }

  /*
   * Listeners
   */

  addEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  addLinkListeners() {
    const links = document.querySelectorAll("a");

    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault();

        const { href } = link;
        console.log(href);
        this.onChange(href);
      };
    });
  }
}

new App();
