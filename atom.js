function Atom() {
    this.render = function(canvas) {
        canvas.context.fillStyle = this.color;
        canvas.context.beginPath();
        canvas.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        canvas.context.fill();
    };

    this.x = 0;
    this.y = 0;
    this.size = 8;
    this.color = "#FF0000";
}
Atom.prototype.clone = function() {
    var clone = new Atom();
    clone.x = this.x;
    clone.y = this.y;
    clone.size = this.size;
    clone.color = this.color;
    return clone;
}
