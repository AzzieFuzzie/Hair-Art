import Component from "../classes/Component";

export default class Animation extends Component {
  constructor({ element, elements }) {
    super({ element, elements });

    // this.createObserver;
    this.animateIn();
    this.animateOut();
  }

  // createObserver() {
  //   this.observer = new window.IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (!this.isVisible && entry.isIntersecting) {
  //         this.animateIn();
  //       } else {
  //         this.animateOut();
  //       }
  //     });
  //   }).observe(this.target);
  // }
  navigation() {}
  animateIn() {}
  animateOut() {}
}
