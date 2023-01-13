import "./beat.css"
import {BeatType} from "../beatsGallery/BeatsGallery";
import SoundPads from "../soundPads/SoundPads";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Track from "../track/Track";

export default function Beat({beat, indexBack}: { beat: BeatType, indexBack: Function }) {

    const navigate = useNavigate()
    const beatName = beat.name;

    let bpm = 80;

    async function deleteItem() {
        const response = await axios.delete("/api/beats/" + beat.id);
        console.log(response.status)
        response.status === 200 && window.location.reload();
    }

    const callBackIndex = (soundName: string, padsState: boolean[]) => {
        indexBack(soundName, beatName, padsState);
    }

    return (
        <>
            <div className={"item-container"}>
                <h2 className={"beat-title"}>{beat.name}</h2>
                <button className={"button"} onClick={() => {
                    deleteItem();
                    navigate("/")
                }}
                >Delete
                </button>
            </div>
            <div className="track">
                <div className="sound-pads">
                    <Track soundList={beat.soundList} bpm={bpm}/>

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
        </>
    )
}