const { 
  Renderer, 
  Stave, 
  StaveNote, 
  Voice, 
  Formatter,
} = Vex.Flow;

const div = document.getElementById("output");
const renderer = new Renderer(div, Renderer.Backends.SVG);

renderer.resize(225, 200);
const context = renderer.getContext();

const stave = new Stave(10, 40, 200);
stave.addClef("treble");

stave.setContext(context).draw();

let group = context.openGroup();
const pickKey = ['e/3', 'f/3', 'g/3', 'a/3', 'b/3', 'c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5', 'd/5', 'e/5', 'f/5', 'g/5', 'a/5', 'b/5'];

/******************************************/

function drawChord() {
  let pickRoot = Math.floor(Math.random() * (pickKey.length - 4));
  const chord = [pickKey[pickRoot], pickKey[pickRoot + 2], pickKey[pickRoot + 4]];

  const notes = [
    new StaveNote({
      keys: chord,
      duration: 'w'
    })
  ]

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
  return pickKey[pickRoot][0]
}

/*****************************************/
let chordRoot = drawChord()

const input = document.getElementById('text-box');
input.focus();
input.select();

// document.addEventListener("click", function() {
//   input.focus();
// });

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

/*
// const vf = new Factory({
//     renderer: { elementId: 'output', width: 225, height: 200 },
// });

const score = vf.EasyScore();
const system = vf.System();

const notes = ['E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];

function createStaff() {
  let pickRoot = Math.floor(Math.random() * (notes.length - 4));
  let constructChord = new String("");
  for (let i = pickRoot; i <= pickRoot + 4; i += 2) {
      constructChord += notes[i] + " ";
  }
  const fullChord = "(" + constructChord + ")/w";
  console.log(fullChord);

  system
  .addStave({
      voices: [
          score.voice(score.notes(fullChord))
      ],
  })
  .addClef('treble');

  vf.draw();

  return pickRoot;
}

let root = createStaff();

const input = document.getElementById('text-box');
input.focus();
input.select();

document.addEventListener("click", function() {
  input.focus();
});

function handle(e) {
  if(e.keyCode === 13){
    console.log(input.value);
    console.log(notes[root][0])
    if (input.value === notes[root][0]) {
      const canvas = document.getElementById('output');
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      root = createStaff();
    } else {
      console.log('Wrong!')
    }
  }
}
*/