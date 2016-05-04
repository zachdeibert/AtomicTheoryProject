var correctBefore;
var correctAfter;
var incorrectBefore;
var incorrectAfter;
var canvases;

function load() {
    correctBefore = new AtomicCanvas(new Canvas("correct-before"));
    correctAfter = new AtomicCanvas(new Canvas("correct-after"));
    incorrectBefore = new AtomicCanvas(new Canvas("incorrect-before"));
    incorrectAfter = new AtomicCanvas(new Canvas("incorrect-after"));
    canvases = [
        correctBefore,
        correctAfter,
        incorrectBefore,
        incorrectAfter
    ];
    for ( var i = 0; i < canvases.length; i++ ) {
        for ( var j = 0; j < waterMolecules; j++ ) {
            var molecule = new Water();
            molecule.x = Math.random() * 360 + 20;
            molecule.y = Math.random() * 260 + 20;
            canvases[i].molecules.push(molecule);
        }
    }
}
