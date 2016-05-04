function AtomicCanvas(canvas) {
    var self = this;
    function render() {
        canvas.context.clearRect(0, 0, 400, 300);
        for ( var i = 0; i < self.molecules.length; i++ ) {
            self.molecules[i].render(canvas, self.molecules, i);
        }
    }

    this.resume = function() {
        this.renderid = setInterval(render, 33);
    };

    this.pause = function() {
        clearInterval(this.renderid);
        this.renderid = -1;
    };

    this.resume();
    this.molecules = [];
}
