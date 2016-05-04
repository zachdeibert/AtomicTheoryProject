Oxygen.prototype = new Molecule();
Oxygen.prototype.constructor = Oxygen;
function Oxygen() {
    var o1 = new Atom();
    var o2 = new Atom();
    o1.size = o2.size *= 2;
    o1.color = o2.color = "#00FFFF";
    var angle = Math.random() * Math.PI * 2;
    o2.x = (o1.size + o2.size) * Math.cos(angle);
    o2.y = (o1.size + o2.size) * Math.sin(angle);
    this.atoms = [
        o1, o2
    ];
}
