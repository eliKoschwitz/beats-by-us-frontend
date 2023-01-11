import {useEffect, useState} from "react";
import axios from "axios";
import {BeatType} from "../beatsGallery/BeatsGallery";
import "./homepage.css";

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
                <button className={"homepage-new-btn"}>Neuen Beat erstellen</button>

            </div>
            <div className={"homepage-saved-beats"}>
                <h2>Gespeicherte Beats</h2>
                {beats.map(beat => {
                    return <div className={"homepage-beat-link"}>
                        <span>&#10132; </span>
                        {beat.name}</div>
                })}

            </div>
        </div>
    )
}