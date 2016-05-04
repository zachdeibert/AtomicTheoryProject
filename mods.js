var paused = false;
var isWater = true;
var waterMolecules = 8;
var lastMod = 0;

function animateChange(correct, incorrect, pxs) {
    correct.style["margin-top"] = pxs + "px";
    incorrect.style["margin-top"] = pxs + "px";
    if ( pxs > 0 ) {
        if ( (pxs -= 33) < 0 ) {
            pxs = 0;
        }
        setTimeout(function() {
            animateChange(correct, incorrect, pxs);
        }, 33);
    }
}
function change(cid) {
    if ( lastMod != cid ) {
        var correct = [];
        var incorrect = [];
        for ( var i = 0; i < correctAfter.molecules.length; i++ ) {
            correct.push(correctAfter.molecules[i].clone());
        }
        for ( var i = 0; i < incorrectAfter.molecules.length; i++ ) {
            incorrect.push(incorrectAfter.molecules[i].clone());
        }
        correctBefore.molecules = correct;
        incorrectBefore.molecules = incorrect;
        correct = document.getElementById("correct-before");
        incorrect = document.getElementById("incorrect-before");
        animateChange(correct, incorrect, correct.clientHeight);
        lastMod = cid;
    }
}
function heat() {
    change(1);
    for ( var i = 0; i < correctAfter.molecules.length; i++ ) {
        correctAfter.molecules[i].speed += 1;
    }
    for ( var i = 0; i < incorrectAfter.molecules.length; i++ ) {
        incorrectAfter.molecules[i].speed += 1;
    }
    if ( incorrectAfter.molecules.length > 1 ) {
        incorrectAfter.molecules.pop();
    }
}
function cool() {
    change(2);
    for ( var i = 0; i < correctAfter.molecules.length; i++ ) {
        if ( (correctAfter.molecules[i].speed -= 1) < 0 ) {
            correctAfter.molecules[i].speed = 0;
            break;
        }
    }
    var duplicate = true;
    for ( var i = 0; i < incorrectAfter.molecules.length; i++ ) {
        if ( (incorrectAfter.molecules[i].speed -= 1) < 0 ) {
            incorrectAfter.molecules[i].speed = 0;
            duplicate = false;
        }
    }
    if ( duplicate ) {
        if ( incorrectAfter.molecules[0].constructor.name == "Water" ) {
            var w = new Water();
            w.x = Math.random() * 360 + 20;
            w.y = Math.random() * 260 + 20;
            w.speed = incorrectAfter.molecules[0].speed;
            incorrectAfter.molecules.push(w);
        } else {
            var h1 = new Hydrogen();
            var h2 = new Hydrogen();
            var o = new Oxygen();
            h1.x = Math.random() * 360 + 20;
            h1.y = Math.random() * 260 + 20;
            h1.speed = incorrectAfter.molecules[0].speed;
            h2.x = Math.random() * 360 + 20;
            h2.y = Math.random() * 260 + 20;
            h2.speed = incorrectAfter.molecules[0].speed;
            o.x = Math.random() * 360 + 20;
            o.y = Math.random() * 260 + 20;
            o.speed = incorrectAfter.molecules[0].speed;
            incorrectAfter.molecules.push(h1, h2, o);
        }
    }
}
function bonds() {
    change(Math.random());
    correctAfter.molecules = [];
    incorrectAfter.molecules = [];
    if ( isWater ) {
        for ( var i = 0; i < waterMolecules; i++ ) {
            var h1 = new Hydrogen();
            var h2 = new Hydrogen();
            var h3 = new Hydrogen();
            h1.x = correctBefore.molecules[i].x;
            h1.y = correctBefore.molecules[i].y;
            h1.angle = correctBefore.molecules[i].angle;
            h1.speed = correctBefore.molecules[i].speed;
            h2.x = incorrectBefore.molecules[i].x;
            h2.y = incorrectBefore.molecules[i].y;
            h2.angle = incorrectBefore.molecules[i].angle;
            h2.speed = incorrectBefore.molecules[i].speed;
            h3.x = incorrectBefore.molecules[i].x;
            h3.y = incorrectBefore.molecules[i].y;
            h3.angle = incorrectBefore.molecules[i].angle;
            h3.speed = incorrectBefore.molecules[i].speed;
            correctAfter.molecules.push(h1);
            incorrectAfter.molecules.push(h2, h3);
            if ( i % 2 == 0 ) {
                var o1 = new Oxygen();
                var o2 = new Oxygen();
                var o3 = new Oxygen();
                o1.x = correctBefore.molecules[i].x;
                o1.y = correctBefore.molecules[i].y;
                o1.angle = correctBefore.molecules[i].angle;
                o1.speed = correctBefore.molecules[i].speed;
                o2.x = incorrectBefore.molecules[i].x;
                o2.y = incorrectBefore.molecules[i].y;
                o2.angle = incorrectBefore.molecules[i].angle;
                o2.speed = incorrectBefore.molecules[i].speed;
                o3.x = incorrectBefore.molecules[i].x;
                o3.y = incorrectBefore.molecules[i].y;
                o3.angle = incorrectBefore.molecules[i].angle;
                o3.speed = incorrectBefore.molecules[i].speed;
                correctAfter.molecules.push(o1);
                incorrectAfter.molecules.push(o2, o3);
            }
        }
    } else {
        for ( var i = 0, j = 0; i < waterMolecules; i++ ) {
            var w1 = new Water();
            w1.x = correctBefore.molecules[j].x;
            w1.y = correctBefore.molecules[j].y;
            w1.angle = correctBefore.molecules[j].angle;
            w1.speed = correctBefore.molecules[j].speed;
            var w2 = new Water();
            w2.x = incorrectBefore.molecules[i * 3 + 2].x;
            w2.y = incorrectBefore.molecules[i * 3 + 2].y;
            w2.angle = incorrectBefore.molecules[i * 3 + 2].angle;
            w2.size = incorrectBefore.molecules[i * 3 + 2].size;
            correctAfter.molecules.push(w1);
            incorrectAfter.molecules.push(w2);
            if ( i % 2 == 0 ) {
                j++;
            } else {
                j += 2;
            }
        }
    }
    isWater = !isWater;
}
function pause() {
    var btnPause = document.getElementById("btn-pause");
    if ( paused ) {
        for ( var i = 0; i < canvases.length; i++ ) {
            canvases[i].resume();
        }
        btnPause.innerHTML = "Pause";
    } else {
        for ( var i = 0; i < canvases.length; i++ ) {
            canvases[i].pause();
        }
        btnPause.innerHTML = "Resume";
    }
    paused = !paused;
}
