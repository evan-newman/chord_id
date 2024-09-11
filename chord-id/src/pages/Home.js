import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {

    return (
        <div className="intro-page">
            <h1 className="title-name">Chord Identifier</h1>
            <div className="buttons-container">
                <Link to="/settings">
                    <button className="intro-button">Settings</button>
                </Link>
                <Link to="/play">
                    <button className="intro-button">Start</button>
                </Link>
            </div>
        </div>
    )
};