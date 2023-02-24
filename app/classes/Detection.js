class Detection {
  isMobile() {
    if (this.isMobileChecked) {
      this.isMobileChecked = true;

      this.isMobileCheck =
        document.documentElement.classList.contains("mobile");
    }

    return this.isMobileCheck;
  }

  isDesktop() {
    if (this.DesktopChecked) {
      this.DesktopChecked = true;

      this.DesktopCheck =
        document.documentElement.classList.contains("desktop");
    }

    return this.DesktopCheck;
  }

  isTablet() {
    if (this.TabletChecked) {
      this.TabletChecked = true;

      this.TabletCheck = document.documentElement.classList.contains("tablet");
    }

    return this.TabletCheck;
  }
}

const DetectionManager = new Detection();

export default DetectionManager;
