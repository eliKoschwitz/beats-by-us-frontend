import "./beat.css"
import {BeatType} from "../beatsGallery/BeatsGallery";
import SoundPads from "../soundPads/SoundPads";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Beat(props:{beat:BeatType}){

    const navigate = useNavigate()

    async function deleteItem() {
        const response = await axios.delete("/api/beats/" + props.beat.id);
        console.log(response.status)
        response.status === 200 && window.location.reload();
    }

    console.log(props.beat);
    return(
        <>
            <div className={"item-container"}>
                <h2 className={"beat-title"}>{props.beat.name}</h2>
                <button className={"button"} onClick={() => {deleteItem(); navigate("/")}}
                >Delete
                </button>
            </div>
            <div className="track">
                <div className="sound-pads">
                    {props.beat.soundList.map((sound,index) => {
                        return(
                            <div>
                                <p>{sound.name}</p>
                                <SoundPads key={index} sound={sound}/>
                            </div>
                        )})}
                </div>
            </div>

        </>
    )
}