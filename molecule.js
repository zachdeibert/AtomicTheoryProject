function Molecule() {
    this.render = function(canvas, molecules, mid) {
        var angle = this.angle;
        var x = this.x;
        var y = this.y;
        for ( var i = 0; i < this.atoms.length; i++ ) {
            var atom = this.atoms[i];
            atom.x += x;
            atom.y += y;
            atom.render(canvas);
            atom.x -= x;
            atom.y -= y;
        }
        this.angle += Math.random() - 0.5;
        while ( this.angle < 0 ) {
            this.angle += Math.PI * 2;
        }
        while ( this.angle > Math.PI * 2 ) {
            this.angle -= Math.PI * 2;
        }
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        var borderAngle = 0;
        var borderCollided = false;
        for ( var i = 0; i < this.atoms.length; i++ ) {
            var h = this.atoms[i].x + this.x;
            var w = this.atoms[i].y + this.y;
            if ( h + this.atoms[i].size / 2 < 0 ) {
                borderAngle += Math.PI / 2;
                x += 10 + Math.random() * 5;
                borderCollided = true;
            }
            if ( h - this.atoms[i].size / 2 > 400 ) {
                borderAngle += Math.PI / 2;
                x -= 10 + Math.random() * 5;
                borderCollided = true;
            }
            if ( w + this.atoms[i].size / 2 < 0 ) {
                borderAngle += 0;
                y += 10 + Math.random() * 5;
                borderCollided = true;
            }
            if ( w - this.atoms[i].size / 2 > 300 ) {
                borderAngle += 0;
                y -= 10 + Math.random() * 5;
                borderCollided = true;
            }
        }
        if ( borderCollided ) {
            this.x = x;
            this.y = y;
            this.angle = 2 * borderAngle - angle;
        } else {
            for ( var i = 0; i < molecules.length; i++ ) {
                if ( i != mid ) {
                    var done = false;
                    for ( var j = 0; j < this.atoms.length; j++ ) {
                        for ( var k = 0; k < molecules[i].atoms.length; k++ ) {
                            var a = this.atoms[j];
                            var b = molecules[i].atoms[k];
                            var dx = a.x + this.x - b.x - molecules[i].x;
                            var dy = a.y + this.y - b.y - molecules[i].y;
                            if ( Math.sqrt(dx * dx + dy * dy) < (a.size + b.size) / 2 ) {
                                var tmp = this.angle;
                                this.angle = molecules[i].angle;
                                molecules[i].angle = tmp;
                                this.x = x;
                                this.y = y;
                                done = true;
                                break;
                            }
                        }
                        if ( done ) {
                            break;
                        }
                    }
                }
            }
        }
        if ( this.lastx == this.x && this.lasty == this.y && this.speed > 0 ) {
            if ( Math.random() > 0.7 ) {
                var i = 200 - x;
                var j = 150 - y;
                this.angle = Math.tan(j / i) + Math.random() - 0.5;
            } else if ( Math.random() > 0.8 ) {
                this.x += Math.random() * 20 - 10;
                this.y += Math.random() * 20 - 10;
            }
        }
        this.lastx = this.x;
        this.lasty = this.y;
    };

    this.x = 0;
    this.y = 0;
    this.lastx = 0;
    this.lasty = 0;
    this.angle = Math.random() * Math.PI * 2;
    this.atoms = [];
    this.speed = 8;
    this.angle = 0;
}
Molecule.prototype.clone = function() {
    var clone = new Molecule();
    clone.x = this.x;
    clone.y = this.y;
    clone.lastx = this.lastx;
    clone.lasty = this.lasty;
    clone.angle = this.angle;
    clone.atoms = [];
    for ( var i = 0; i < this.atoms.length; i++ ) {
        clone.atoms.push(this.atoms[i].clone());
    }
    clone.speed = this.speed;
    clone.angle = this.angle;
    return clone;
}
