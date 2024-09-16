import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {

    return (
        <div className="intro-page">
            <h1 className="title-name">Chord Identifier</h1>
            <div className="buttons-container">
                <Link to="/chord_id/settings">
                    <button className="intro-button">Settings</button>
                </Link>
                <Link to="/chord_id/play">
                    <button className="intro-button">Start</button>
                </Link>
            </div>
        </div>
    )
};