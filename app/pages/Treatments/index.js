import Page from "classes/Page.js";

export default class Treatments extends Page {
  constructor() {
    super({
      id: "treatments",
      element: ".treatments",
      elements: {
        wrapper: ".treatments__wrapper",

        // navigation: document.querySelector(".navigation"),
      },
    });
  }

  create() {
    super.create();
  }
}
