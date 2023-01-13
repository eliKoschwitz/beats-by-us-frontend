import SoundPads from "../soundPads/SoundPads";
import React, {useState} from "react";
import {Sound} from "../beatsGallery/BeatsGallery";
import "./beat-form.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import TempoSlider from "../temposlider/TempoSlider";

export type NewBeatType = {
    "name": string;
    "tempo": number;
    "soundList": Sound[];
}

export default function BeatForm() {

    const navigate = useNavigate()
    const notify = () => toast.success("Speicherung war erfolgreich")

    const emptyBeat: NewBeatType = {
        name: "",
        tempo: 150,
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
        console.log(newBeat)
    }

    const getUpdatedSounds = (pads: boolean[], name: string) => {
        const newSoundList: Sound[] = newBeat.soundList.map(
            sound => sound.name === name ? {...sound, pads: pads} : sound);

        setNewBeat({
            ...newBeat, soundList: newSoundList
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        axios.post("/api/beats", newBeat)
            .then(response => {
                if (response.status === 200){
                    notify()
                }
            })
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
                    <input id={"title"} type="text" name={"name"} required={true} value={newBeat.name} onChange={onChange}/>
                </div>
                <TempoSlider bpm={newBeat.tempo} onChange={onChange}/>
                <div className="sound-pads">
                    {newBeat.soundList.map((sound, index) => {
                        return (
                            <div key={index}>
                                <p>{sound.name}</p>
                                <SoundPads sound={sound} updatePads={getUpdatedSounds} soundName={sound.name}/>
                            </div>
                        )
                    })}
                </div>
                <button className={"button"} type={"submit"}>Speichern</button>
                <button className={"button"} onClick={() => navigate("/")}>Beat Übersicht</button>
            </form>
            <ToastContainer position={"bottom-right"}/>
        </div>
    )
}