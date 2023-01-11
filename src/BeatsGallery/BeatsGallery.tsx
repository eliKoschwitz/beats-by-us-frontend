import "./beats-gallery.css";
import {useEffect, useState} from "react";
import axios from "axios";
import Beat from "../beat/Beat";

export type BeatType = {
    "id": string;
    "name": string;
    "tempo": number;
    "soundList": Sound[];
}

export type Sound = {
    "name": string;
    "pads": boolean[];
}

export default function BeatsGallery() {

    const [beats, setBeats] = useState<BeatType[]>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/beats");
            console.log(response);
            setBeats(response.data);
        })();
    }, []);

    return (
        <>
            {beats.map(beat =>  <Beat key={beat.id} beat={beat} /> )}
        </>
    )
}