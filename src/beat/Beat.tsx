import "./beat.css"
import {BeatType} from "../beatsGallery/BeatsGallery";
import SoundPads from "../soundPads/SoundPads";

export default function Beat(props:{beat:BeatType}){

    console.log(props.beat);
    return(
        <>
            <h2 className={"beat-title"}>{props.beat.name}</h2>
            <div className="track">
                <div className="sound-pads">
                    {props.beat.soundList.map((sound,index) => {
                        return(
                            <div>
                                <p>{sound.name}</p>
                                <SoundPads key={index} sound={sound} />
                            </div>
                        )})}
                </div>
            </div>
        </>
    )
}