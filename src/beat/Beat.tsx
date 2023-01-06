import "./beat.css"
import {BeatType} from "../BeatsGallery/BeatsGallery";
import SoundPads from "../soundPads/SoundPads";

export default function Beat(props:{beat:BeatType}){

    console.log(props.beat);
    return(
        <>
            <h2>{props.beat.name}</h2>
            <div className="kick-track">
                <div className="kick">
                    {props.beat.soundList.map((sound,index) => {
                        return(
                            <>
                                <p>{sound.name}</p>
                                <SoundPads key={index} sound={sound} />
                            </>
                        )})}
                </div>
            </div>

        </>
    )
}