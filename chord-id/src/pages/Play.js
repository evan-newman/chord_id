import { Link } from 'react-router-dom';
import "./Play.css";

export default function Play() {
    return (
        <div>
            <Link to="/">
                <button id="home-button">Back</button>
            </Link>
            <div className="play-page">
                <div className="answer-box">
                    <form action="#">
                        <input id='text-box' type="text" autocomplete="off" onkeypress="handle(event)" />
                    </form>
                </div>
                <div id="output"></div>
            </div>
        </div>
    )
};