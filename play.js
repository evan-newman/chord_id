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

/******************************************/
const allKeys = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']
const whiteKeys = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

const majorTriadChordAlg    = [0, 4, 7];
const minorTriadChordAlg    = [0, 3, 7];
const augTriadChordAlg      = [0, 4, 8];
const dimTriadChordAlg      = [0, 3, 6];
const dominant7thChordAlg   = majorTriadChordAlg.concat(10);
const major7thChordAlg      = majorTriadChordAlg.concat(11);
const minor7thChordAlg      = minorTriadChordAlg.concat(10);
const halfDim7thChordAlg    = dimTriadChordAlg.concat(10);
const dim7thChordAlg        = dimTriadChordAlg.concat(9);
const minorMajor7thChordAlg = minorTriadChordAlg.concat(11);
const augMajor7thChordAlg   = augTriadChordAlg.concat(11);
const aug7thChordAlg        = augTriadChordAlg.concat(10);

function constructGeneralChord(totalNotes, rootNoteIdx) {
  let generalChord = [];
  for (let steps = 0; steps < totalNotes; steps++) {
    let interval = steps * 2;
    let intervalIdx = rootNoteIdx + interval;

    if (intervalIdx >= whiteKeys.length) {
      intervalIdx -= whiteKeys.length;
    }

    generalChord.push(whiteKeys[intervalIdx]);
  }

  return generalChord;
}

function findPitch(rootNote) {
  let range = 3;
  let shift = 3;
  if (rootNote === 'c' || rootNote === 'd') {
    range = 2;
    shift = 4;
  } else if (rootNote === 'a' || rootNote === 'b') {
    range = 2;
    shift = 3;
  }
  let pitch = Math.floor(Math.random() * range) + shift;

  return pitch;
}

function constructChord(chordAlg, generalChord, rootNote, pitch) {
  let chord = [];
  let halfSteps = 0;
  let halfStepsIdx = allKeys.findIndex(x => x == rootNote);
  for (let i = 0; i < generalChord.length; i++) {
    const generalNote = generalChord[i];
    const chordHalfSteps = chordAlg[i];

    while (allKeys[halfStepsIdx] !== generalNote) {
      halfSteps++;
      halfStepsIdx++;
      if (halfStepsIdx >= allKeys.length) {
        halfStepsIdx = 0;
        pitch++;
      }
    }

    let distance = halfSteps - chordHalfSteps;
    let note = generalNote;
    while (distance != 0) {
      if (distance < 0) {
        note += '#';
        distance++;
      } else {
        note += 'b';
        distance--;
      }
    }

    note += '/' + pitch;
    chord.push(note);
  }

  return chord;
}

/******************************************/

function drawChord() {
  let rootNoteIdx = Math.floor(Math.random() * whiteKeys.length);
  let rootNote = whiteKeys[rootNoteIdx];
  let chordAlg = dominant7thChordAlg;
  let generalChord = constructGeneralChord(chordAlg.length, rootNoteIdx);
  let pitch = findPitch(rootNote);
  const chord = constructChord(chordAlg, generalChord, rootNote, pitch);
  console.log(chord);

  let madeStave = new StaveNote({
    keys: chord,
    duration: 'w'
  })
  for (let i = 0; i < chord.length; i++) {
    const str = chord[i].split('/')[0];
    if (str.length > 1) {
      const accidentStr = str.slice(1);
      madeStave.addModifier(new Accidental(accidentStr), i);
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
