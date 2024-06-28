const { 
  Renderer, 
  Stave, 
  StaveNote, 
  Voice, 
  Formatter,
} = Vex.Flow;

const div = document.getElementById("output");
const renderer = new Renderer(div, Renderer.Backends.SVG);

renderer.resize(500, 260);
const context = renderer.getContext();
context.setViewBox(45, 10, 110, 110);

const stave = new Stave(0, 0, 200);
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
