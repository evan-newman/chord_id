const { 
  Renderer, 
  Stave, 
  StaveNote, 
  Voice, 
  Formatter,
  TickContext,
} = Vex.Flow;

const div = document.getElementById("output");
const renderer = new Renderer(div, Renderer.Backends.SVG);

renderer.resize(225, 200);
const context = renderer.getContext();

const stave = new Stave(10, 40, 200);
stave.addClef("treble");

stave.setContext(context).draw();

const notes = [
  new StaveNote({
    keys: ['c/4'],
    duration: 'w'
  })
];

const voices = [
  new Voice({
    num_beats: 4,
    beat_value: 4
  }).addTickables(notes)
]

new Formatter().joinVoices(voices).format(voices, 100);

notes[0].getTickContext().setX(50);

const group = context.openGroup();

voices.forEach(function(v) {
  v.draw(context, stave);
});

context.closeGroup();
context.svg.removeChild(group);

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