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
    console.log(beats)
    useEffect(() => {
        (async () => {
            const response = await axios.get("/api/beats");
            console.log(response);
            setBeats(response.data);
        })();
    }, []);

    const indexBack = (padIndex : number, soundName: string, beatName : string, padsState: boolean[]) => {

        const beatState:BeatType[] = beats.map(beat => beat.name === beatName ? {
            ...beat,
            soundList: beat.soundList.map(sound => sound.name === soundName ? {
               ...sound,
                pads: sound.pads = padsState
            } : sound)
        } : beat);

    /*
    pads: sound.pads.map((pad, index) => index === padIndex
                    ? !pad
                    : pad
     */
        setBeats(beatState);
    }

    return (
        <>
            {beats.map(beat =>  <Beat key={beat.id} beat={beat}  indexBack={indexBack}/> )}
        </>
    )
}