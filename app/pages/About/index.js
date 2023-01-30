import Page from "classes/Page.js";

export default class About extends Page {
  constructor() {
    super({
      id: "about",
      element: ".about",
      elements: {
        wrapper: ".about__wrapper",

        // navigation: document.querySelector(".navigation"),
      },
    });
  }

  create() {
    super.create();
  }
}
