import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Play.css";
import Vex from "vexflow";

export default function Play(props) {
    const { 
        Renderer, 
        Stave, 
        StaveNote, 
        Voice, 
        Formatter,
        Accidental,
    } = Vex.Flow;

    let answer = React.useRef(null)
    let group = React.useRef(null)
    let context = React.useRef(null)
    const allChordTypes = props.chordTypes;

    React.useEffect(() => {
        const div = document.getElementById("output");
        const renderer = new Renderer(div, Renderer.Backends.SVG);

        renderer.resize(500, 300);
        context.current = renderer.getContext();
        context.current.setViewBox(25, -10, 145, 145);

        group.current = context.current.openGroup();
        answer.current = drawChord(context.current, allChordTypes);
        console.log("Working here");
        ref.current.focus();
    })

    // /******************************************/
    const allKeys = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']
    const whiteKeys = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

    // const keySignatureSharpAlg = ['f', 'c', 'g', 'd', 'a', 'e', 'b'];
    // const keySignatureFlatAlg = ['b', 'e', 'a', 'd', 'g', 'c', 'f'];

    function chordTypesToPick(allChordTypes) {
        let validChordsToPick = [];
        for (let key in allChordTypes) {
            if (allChordTypes[key]["selected"]) {
                validChordsToPick.push(allChordTypes[key]);
            }
        }

        return validChordsToPick;
    }

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
        let halfStepsIdx = allKeys.findIndex(x => x === rootNote);
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
            while (distance !== 0) {
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
        let allowSharpRoots = false;
        let allowFlatRoots = false;

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

    // /******************************************/

    function drawChord(context, allChordTypes) {
        let rootNoteIdx = Math.floor(Math.random() * whiteKeys.length);
        let rootNote = whiteKeys[rootNoteIdx];
        let listOfChordTypesToPick = chordTypesToPick(allChordTypes)
        let pickedChordIdx = Math.floor(Math.random() * listOfChordTypesToPick.length);
        let chordInfo = listOfChordTypesToPick[pickedChordIdx]
        let chordAlg = chordInfo["halfStepAlgorithm"];
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
        let answer = defaultNote.charAt(0).toUpperCase() + defaultNote.slice(1) + chordInfo["inputName"];
        return answer;
    }

    // /*****************************************/

    function handleGuessSubmit(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log(answer.current);
            if (answer.current === event.target.value) {
                context.current.closeGroup();
                context.current.svg.removeChild(group.current);

                event.target.value = "";
                group.current = context.current.openGroup();
                answer.current = drawChord(context.current, allChordTypes);
            } else {
                console.log("Wrong!")
            }
        }
    }


    const ref = React.useRef(null);
    function handleActions(event) {
        ref.current.focus();
    }

    return (
        <div onClick={handleActions}>
            <Link to="/chord_id">
                <button id="home-button">Back</button>
            </Link>
            <div className="play-page">
                <div className="answer-box">
                    <form action="#">
                        <input id='text-box' ref={ref} type="text" autoComplete="off" onKeyDown={handleGuessSubmit} />
                    </form>
                </div>
                <div id="output"></div>
            </div>
        </div>
    )
};