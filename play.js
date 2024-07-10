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


let group = context.openGroup();

/******************************************/
const allKeys = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']
const whiteKeys = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

const keySignatureSharpAlg = ['f', 'c', 'g', 'd', 'a', 'e', 'b'];
const keySignatureFlatAlg = ['b', 'e', 'a', 'd', 'g', 'c', 'f'];

const majorTriadChord    = [[0, 4, 7], ''];
const minorTriadChord    = [[0, 3, 7], 'm'];
const augTriadChord      = [[0, 4, 8], 'aug'];
const dimTriadChord      = [[0, 3, 6], 'dim'];
const dominant7thChord   = [majorTriadChord[0].concat(10), '7'];
const major7thChord      = [majorTriadChord[0].concat(11), 'M7'];
const minor7thChord      = [minorTriadChord[0].concat(10), 'm7'];
const halfDim7thChord    = [dimTriadChord[0].concat(10), 'o/7'];
const dim7thChord        = [dimTriadChord[0].concat(9), 'o7'];
const minorMajor7thChord = [minorTriadChord[0].concat(11), 'mM7'];
const augMajor7thChord   = [augTriadChord[0].concat(11), '+M7'];
const aug7thChord        = [augTriadChord[0].concat(10), '+7'];

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

function constructChord(chordAlg, generalChord, rootNote, accidentalAdjuster, pitch) {
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

    let distance = halfSteps - chordHalfSteps + accidentalAdjuster;
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

function adjustmentForAccidentalRoots() {
  // NOTE: change here for buttons selected in settings instead of hard coded values
  let allowNaturualRoots = true;
  let allowSharpRoots = true;
  let allowFlatRoots = true;

  let rootTypes = []
  if (allowNaturualRoots) {
    rootTypes.push(0);
  }
  if (allowSharpRoots) {
    rootTypes.push(-1);
  }
  if (allowFlatRoots) {
    rootTypes.push(1);
  }
  let accidentalAdjuster = rootTypes[Math.floor(Math.random() * rootTypes.length)];

  return accidentalAdjuster;
}

/******************************************/

function drawChord() {
  let rootNoteIdx = Math.floor(Math.random() * whiteKeys.length);
  let rootNote = whiteKeys[rootNoteIdx];
  let chordInfo = minorMajor7thChord;
  let chordAlg = chordInfo[0];
  let generalChord = constructGeneralChord(chordAlg.length, rootNoteIdx);
  let accidentalAdjuster = adjustmentForAccidentalRoots();
  let pitch = findPitch(rootNote);
  const chord = constructChord(chordAlg, generalChord, rootNote, accidentalAdjuster, pitch);
  console.log(chord);

  const stave = new Stave(0, 0, 200);
  let keySignatureOptions = ['C'];
  let keySignatureStr = keySignatureOptions[Math.floor(Math.random() * keySignatureOptions.length)];
  stave.addClef("treble").addKeySignature(keySignatureStr);
  stave.setContext(context).draw();

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
  ];

  new Formatter().joinVoices(voices).format(voices, 300);

  notes[0].getTickContext().setX(50);

  voices.forEach(function(v) {
    v.draw(context, stave);
  });

  let defaultNote = chord[0].split('/')[0];
  let answer = defaultNote.charAt(0).toUpperCase() + defaultNote.slice(1) + chordInfo[1];
  return answer;
}

/*****************************************/
let answer = drawChord()

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
    console.log(answer)
    if (input.value === answer) {
      context.closeGroup();
      context.svg.removeChild(group);

      input.value = "";

      group = context.openGroup();
      answer = drawChord()
    } else {
      console.log('Wrong!')
    }
  }
}
