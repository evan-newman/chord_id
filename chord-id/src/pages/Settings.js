import React from "react";
import { Link } from "react-router-dom";
import "./Settings.css";

export default function Settings(props) {
    let { chordTypes, setChordTypes } = props;

    function handleChange(event) {
        const {id, checked} = event.target;
        if (!checked && countChecked === 1) {
            return;
        }

        countChecked += checked ? 1 : -1;
        let chordTouched = chordTypes[id];
        chordTouched["selected"] = checked;
        setChordTypes(
            {...chordTypes},
            chordTouched
        )
    }

    let countChecked = 0;
    let triads = []
    let sevenths = []
    let augSevenths = []
    for (let key in chordTypes) {
        const makeCheckbox = createCheckbox(key, chordTypes[key])
        countChecked += chordTypes[key]["selected"] ? 1 : 0;
        if (key.includes("Triad")) {
            triads.push(makeCheckbox)
        } else if (key.includes("7th") && !key.includes("Aug")) {
            sevenths.push(makeCheckbox)
        } else {
            augSevenths.push(makeCheckbox)
        }
    }

    function createCheckbox(key, val) {
        return (
            <div key={key} className={val["selected"] ? "selectedBox" : "nonSelectedBox"}>
                <input type="checkbox" id={key} name="checkboxChord" checked={val["selected"]} onChange={handleChange} />
                <label htmlFor={key}>{val["name"]}</label>
            </div>
        )
    }

    return (
        <div>
            <Link to="/">
                <button id="back-button">Back</button>
            </Link>
            <div className="settings-page">
                <div className="checkbox-group">
                    {triads}
                </div>

                <div className="checkbox-group">
                    {sevenths}
                </div>

                <div className="checkbox-group">
                    {augSevenths}
                </div>
            </div>
        </div>
    )
};