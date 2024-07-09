const { 
  Renderer, 
  Stave, 
  StaveNote, 
  Voice, 
  Formatter,
  Accidental,
} = Vex.Flow;

const div = document.getElementById("output");
const renderer = new Renderer(div, Renderer.Backends.SVG);

renderer.resize(500, 260);
const context = renderer.getContext();
context.setViewBox(45, 10, 110, 110);

const stave = new Stave(0, 0, 200);
stave.addClef("treble").addKeySignature('C');

stave.setContext(context).draw();

let group = context.openGroup();
const allKeys = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']
const pickKey = ['e/3', 'f/3', 'g/3', 'a/3', 'b/3', 'c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5', 'd/5', 'e/5', 'f/5', 'g/5', 'a/5', 'b/5'];
const rootNotes = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
let madeChord = constructMajorChord();

function constructMajorChord() {
  let pickRoot = Math.floor(Math.random() * rootNotes.length);
  let range = 3;
  let shift = 3;
  if (pickRoot <= 1) {
    range = 2;
    shift = 4;
  } else if (pickRoot >= 5) {
    range = 2;
    shift = 3;
  }
  let pitch = Math.floor(Math.random() * range) + shift;
  let noteIdx = allKeys.findIndex(x => x == rootNotes[pickRoot]);

  let chord = [];
  let majorChordAlg = [0, 4, 3];
  for (const halfSteps of majorChordAlg) {
    noteIdx += halfSteps;
    if (noteIdx >= allKeys.length) {
      noteIdx -= allKeys.length;
      pitch++;
    }

    const note = allKeys[noteIdx] + '/' + pitch;
    chord.push(note);
  }

  return chord;
}

/******************************************/

function drawChord() {
  const chord = constructMajorChord();
  console.log(chord);

  let madeStave = new StaveNote({
    keys: chord,
    duration: 'w'
  })
  for (let i = 0; i < chord.length; i++) {
    const str = chord[i];
    if (str.includes("#")) {
      madeStave.addModifier(new Accidental("#"), i);
    }
  }
  const notes = [madeStave];

  const voices = [
    new Voice({
      num_beats: 4,
      beat_value: 4
    }).addTickables(notes),
  ]

  new Formatter().joinVoices(voices).format(voices, 300);

  notes[0].getTickContext().setX(50);


  voices.forEach(function(v) {
    v.draw(context, stave);
  });

  return chord[0].split('/')[0];
}

/*****************************************/
let chordRoot = drawChord()

const input = document.getElementById('text-box');
input.focus();
input.select();

document.addEventListener("keydown", function() {
  input.focus();
});

document.addEventListener("click", function() {
  input.focus();
});

function handle(e) {
  if(e.keyCode === 13){
    console.log(input.value);
    console.log(chordRoot)
    if (input.value.toLowerCase() === chordRoot) {
      context.closeGroup();
      context.svg.removeChild(group);

      input.value = "";

      group = context.openGroup();
      chordRoot = drawChord()
    } else {
      console.log('Wrong!')
    }
  }
}
