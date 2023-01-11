import "./sound-pads.css";
import {Sound} from "../BeatsGallery/BeatsGallery";
import React, {useState} from "react";

export default function SoundPads(props:{key: number, sound:Sound}){


    const [pads, setPads] = useState(props.sound.pads);

    const handleBoxClick = (index2:number) => {
        const padsState : boolean[] = pads.map((pad, index) => index === index2 ? !pad : pad);
        setPads(padsState);
    }

    return(
        <div>
            {pads.map((pad,index) => pad === true
                ? <div key={index} className= {"pad sound-pad active b"+ index.toString()} onClick={() => handleBoxClick(index)} > </div>
                : <div key={index} className= {"pad sound-pad b"+ index.toString()} onClick={() => handleBoxClick(index)} ></div>)}

        </div>
    )
}