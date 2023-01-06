import "./beats-gallery.css";
import {useEffect, useState} from "react";
import axios from "axios";

type Beat = {
    "id": string;
    "name": string;
    "tempo": number;
    "beatList": BeatList[];
}

type BeatList = {
    "name": string;
    "beats": boolean[];
}

export default function BeatsGallery() {

    const [beats, setBeats] = useState<Beat[]>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/beats");
            console.log(response)
            setBeats(response.data);
        })();
    }, []);

    return (
        <>
            {beats.map(beat => {
                return (
                    <div className="sequencer">
                        <h2>{beat.name}</h2>
                        <div className="kick-track">
                            <div className="controls">
                                {beat.beatList.map(sound => <p>{sound.name}</p>)}
                            </div>
                            <div className="kick">
                                <div className="pad kick-pad b0"></div>
                                <div className="pad kick-pad b1"></div>
                                <div className="pad kick-pad b2"></div>
                                <div className="pad kick-pad b3"></div>
                                <div className="pad kick-pad b4"></div>
                                <div className="pad kick-pad b5"></div>
                                <div className="pad kick-pad b6"></div>
                                <div className="pad kick-pad b7"></div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}