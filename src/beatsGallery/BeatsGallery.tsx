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
            setBeats(response.data);
        })();
    }, []);

    async function updateBeat(updateBeat: BeatType) {

        let updatedBeats: BeatType[];

        axios.post("/api/beats", updateBeat)
            .then(response => response.data)
            .then((data) => {
                updatedBeats = beats.map(beat => {
                        if (beat.name === data.name) {
                            return {...beat, pads: data.pads}
                        } else {
                            return beat
                        }
                    }
                )
                setBeats(updatedBeats)
            })
            .catch(e => console.error(e));
    }

    const indexBack = (soundName: string, beatName: string, padsState: boolean[]) => {

        const beatState: BeatType[] = beats.map(beat => beat.name === beatName ? {
            ...beat,
            soundList: beat.soundList.map(sound => sound.name === soundName ? {
                ...sound,
                pads: sound.pads = padsState
            } : sound)
        } : beat);

        setBeats(beatState);
    }

    return (
        <>
            {beats.map(beat => <Beat key={beat.id} beat={beat} indexBack={indexBack} updateBeat={updateBeat}/>)}
        </>
    )
}