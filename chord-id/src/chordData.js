const majorTriadChord    = {"name": "Major Triad", "halfStepAlgorithm": [0, 4, 7],                                     "inputName": '',     "selected": true};
const minorTriadChord    = {"name": "Minor Triad", "halfStepAlgorithm": [0, 3, 7],                                     "inputName": 'm',    "selected": false};
const augTriadChord      = {"name": "Augmented Triad", "halfStepAlgorithm": [0, 4, 8],                                     "inputName": 'aug',  "selected": false};
const dimTriadChord      = {"name": "Diminished Triad", "halfStepAlgorithm": [0, 3, 6],                                     "inputName": 'dim',  "selected": false};
const dominant7thChord   = {"name": "Dominant 7th", "halfStepAlgorithm": majorTriadChord.halfStepAlgorithm.concat(10),  "inputName": '7',    "selected": false};
const major7thChord      = {"name": "Major 7th", "halfStepAlgorithm": majorTriadChord.halfStepAlgorithm.concat(11),  "inputName": 'M7',   "selected": false};
const minor7thChord      = {"name": "Minor 7th", "halfStepAlgorithm": minorTriadChord.halfStepAlgorithm.concat(10),  "inputName": 'm7',   "selected": false};
const halfDim7thChord    = {"name": "Half Diminished 7th", "halfStepAlgorithm": dimTriadChord.halfStepAlgorithm.concat(10),    "inputName": 'o/7',  "selected": false};
const dim7thChord        = {"name": "Diminished 7th", "halfStepAlgorithm": dimTriadChord.halfStepAlgorithm.concat(9),     "inputName": 'o7',   "selected": false};
const minorMajor7thChord = {"name": "Minor-Major 7th", "halfStepAlgorithm": minorTriadChord.halfStepAlgorithm.concat(11),  "inputName": 'mM7',  "selected": false};
const augMajor7thChord   = {"name": "Augmented-Major 7th", "halfStepAlgorithm": augTriadChord.halfStepAlgorithm.concat(11),    "inputName": '+M7',  "selected": false};
const aug7thChord        = {"name": "Augmented 7th", "halfStepAlgorithm": augTriadChord.halfStepAlgorithm.concat(10),    "inputName": '+7',   "selected": false};

let ob = {
            "allChordTypes": {
                "MajorTriad": majorTriadChord,
                "MinorTriad": minorTriadChord,
                "AugTriad": augTriadChord,
                "DimTriad": dimTriadChord,
                "Dom7th": dominant7thChord,
                "Major7th": major7thChord,
                "Minor7th": minor7thChord,
                "HalfDim7th": halfDim7thChord,
                "Dim7th": dim7thChord,
                "MinorMajor7th": minorMajor7thChord,
                "AugMajor7th": augMajor7thChord,
                "Aug7th": aug7thChord
            }

}

export default ob;