import SoundPads from "../soundPads/SoundPads";
import React, {useState} from "react";
import {Sound} from "../beatsGallery/BeatsGallery";
import "./beat-form.css"
import axios from "axios";

export type NewBeatType = {
    "name": string;
    "tempo": number;
    "soundList": Sound[];
}

export default function BeatForm() {

    const emptyBeat: NewBeatType = {
        name: "",
        tempo: 0,
        soundList: [
            {
                name: "Hihat",
                pads: [false, false, false, false, false, false, false, false]
            },
            {
                name: "Snare",
                pads: [false, false, false, false, false, false, false, false]
            },
            {
                name: "Kick",
                pads: [false, false, false, false, false, false, false, false]
            }
        ]
    }

    const [newBeat, setNewBeat] = useState<NewBeatType>(emptyBeat);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;

        setNewBeat({
            ...newBeat, [targetName]: targetValue
        });
    }

    const getUpdatedSounds = (pads: boolean[], index: number) => {

        console.log(index)
        const newSoundList = newBeat.soundList.map((sound, i: number) => {
            // console.log(index, i)

            if (i === index) {
                // Change the clicked pads
                return {
                    ...sound, pads: pads
                }
            } else {
                // The rest didn't change
                return sound;
            }
        })

        setNewBeat({
            ...newBeat, soundList: newSoundList
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        axios.post("/api/beats", newBeat)
            .then(response => response.data)
            .catch(e => console.error(e));
        e.preventDefault();
    }

    return (
        <div className={"new-beat"}>
            <div className={"header new-header"}>
                <h2>Neuen Beat erstellen</h2>
            </div>
            <form onSubmit={onSubmit}>
                <div className={"new-input"}>
                    <label htmlFor="title">Name: </label>
                    <input id={"title"} type="text" name={"name"} value={newBeat.name} onChange={onChange}/>
                </div>
                <div className="sound-pads">
                    {newBeat.soundList.map((sound, index) => {
                        return (
                            <div key={index}>
                                <p>{sound.name}</p>
                                <SoundPads sound={sound} updatePads={getUpdatedSounds} soundIndex={index}/>
                            </div>
                        )
                    })}
                </div>
                <button className={"button"} type={"submit"}>Speichern</button>
            </form>
        </div>
    )
}