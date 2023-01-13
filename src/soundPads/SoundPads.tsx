import "./sound-pads.css";
import {Sound} from "../BeatsGallery/BeatsGallery";


export default function SoundPads({sound, indexFunc}:{key: number, sound:Sound, indexFunc:Function}){

    const soundName: string = sound.name;

    const handleBoxClick = (index:number) => {
        const padsState : boolean[] = sound.pads.map((pad, padIndex) => padIndex === index
            ? !pad
            : pad
        );
        indexFunc(index, soundName, padsState);
    }

    return(
        <div>
            {sound.pads.map((pad,index2) => pad
                ? <div key={index2} className= {"pad sound-pad active b"+ index2.toString()} onClick={() => handleBoxClick(index2)} > </div>
                : <div key={index2} className= {"pad sound-pad b"+ index2.toString()} onClick={() => handleBoxClick(index2)} ></div>)}
        </div>
    )
}