function Canvas(id) {
    this.element = document.getElementById(id);
    this.context = this.element.getContext("2d");
}
