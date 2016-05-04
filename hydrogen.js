Hydrogen.prototype = new Molecule();
Hydrogen.prototype.constructor = Hydrogen;
function Hydrogen() {
    var h1 = new Atom();
    var h2 = new Atom();
    var angle = Math.random() * Math.PI * 2;
    h2.x = (h1.size + h2.size) * Math.cos(angle);
    h2.y = (h1.size + h2.size) * Math.sin(angle);
    this.atoms = [
        h1, h2
    ];
}
