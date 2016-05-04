Water.prototype = new Molecule();
Water.prototype.constructor = Water;
function Water() {
    var h1 = new Atom();
    var h2 = new Atom();
    var o = new Atom();
    o.size *= 2;
    o.color = "#00FFFF";
    var a1 = 0;
    var a2 = 0;
    while ( Math.abs(a1 - a2) < 1 || Math.abs(a1 - a2) > Math.PI * 2 - 1 ) {
        a1 = Math.random() * Math.PI * 2;
        a2 = Math.random() * Math.PI * 2;
    }
    h1.x = (o.size + h1.size) * Math.cos(a1);
    h1.y = (o.size + h1.size) * Math.sin(a1);
    h2.x = (o.size + h2.size) * Math.cos(a2);
    h2.y = (o.size + h2.size) * Math.sin(a2);
    this.atoms = [
        h1, h2, o
    ];
}
