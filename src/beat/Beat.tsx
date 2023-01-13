import "./beat.css"
import {BeatType} from "../beatsGallery/BeatsGallery";
import SoundPads from "../soundPads/SoundPads";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Track from "../track/Track";
import TempoSlider from "../temposlider/TempoSlider";
import React from "react";

export default function Beat({beat, indexBack, updateBeat}: {
    beat: BeatType,
    indexBack: Function,
    updateBeat: (beat: BeatType) => void
}) {

    const navigate = useNavigate()
    const beatName = beat.name;

    async function deleteBeat() {
        const response = await axios.delete("/api/beats/" + beat.id);
        console.log(response.status)
        response.status === 200 && window.location.reload();
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;

        updateBeat({
            ...beat, [targetName]: targetValue
        });
        console.log(beat)
    }

    const callBackIndex = (soundName: string, padsState: boolean[]) => {
        indexBack(soundName, beatName, padsState);
    }

    return (
        <>
            <div className={"header new-header"}>
                <h1 className={"beat-title"}>{beat.name}</h1>
                <div className={"item-container"}>
                    <div className={"button-container"}>
                        <button className={"beat-button"} onClick={() => {
                            deleteBeat();
                            navigate("/")
                        }}
                        >Beat löschen
                        </button>

                        <button className={"beat-button"} onClick={() => {
                            updateBeat(beat)
                        }}
                        >Änderungen speichern
                        </button>
                    </div>
                </div>
            </div>
            <div className="track">
                <div className="sound-pads">
                    <div className={"sound-controls"}>
                        <Track soundList={beat.soundList} bpm={beat.tempo}/>
                        <TempoSlider bpm={beat.tempo} onChange={onChange}/>
                    </div>
                    <div className={"sound-pads-container"}>
                        {beat.soundList.map((sound, index) => {
                            return (
                                <div key={sound.name}>
                                    <p>{sound.name}</p>
                                    <SoundPads key={index} sound={sound} indexFunction={callBackIndex}/>
                                    <audio
                                        data-name={sound.name}
                                        className={"sound"}
                                        src={"/" + sound.name + ".wav"}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}