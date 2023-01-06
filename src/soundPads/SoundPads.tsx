import "./sound-pads.css";
import {Sound} from "../BeatsGallery/BeatsGallery";

export default function SoundPads(props:{sound:Sound}){

    return(
        <div>
            {props.sound.pads.map((pad,index) => pad === true
                ? <div key={index} className= "pad sound-pad active" > </div>
                : <div key={index} className= "pad sound-pad" ></div>)}
        </div>
    )
}