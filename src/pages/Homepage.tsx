import React, {useEffect, useState} from "react";
import axios from "axios";
import {BeatType} from "../beatsGallery/BeatsGallery";
import "./homepage.css";
import {Link} from "react-router-dom";

export default function Homepage() {

    const [beats, setBeats] = useState<BeatType[]>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/beats");
            console.log(response)
            setBeats(response.data);
        })();
    }, []);

    return (
        <div className={"homepage"}>
            <div className={"homepage-header"}>
                <h1>Beats By Us</h1>
                <Link to={"/new"} className={"homepage-new-btn"}>Neuen Beat erstellen</Link>
            </div>
            <div className={"homepage-saved-beats"}>
                <h2>Gespeicherte Beats</h2>
                {beats.map(beat => {
                    return (
                        <Link to={"/gallery"} className={"homepage-beat-link"} id={beat.id}>
                            <span>&#10132; </span>
                            {beat.name}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}