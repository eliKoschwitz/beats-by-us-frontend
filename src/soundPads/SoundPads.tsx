import "./sound-pads.css";
import {Sound} from "../BeatsGallery/BeatsGallery";

export default function SoundPads(props:{sound:Sound}){

    return(
        <>
            {props.sound.pads.map((pad,index) => pad === true
                ? <div key={index} className= "pad kick-pad active" > </div>
                : <div key={index} className= "pad kick-pad" ></div>)}
        </>
    )
}