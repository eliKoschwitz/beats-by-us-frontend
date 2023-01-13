import "./sound-pads.css";
import {Sound} from "../BeatsGallery/BeatsGallery";


export default function SoundPads(props:{key: number, sound:Sound, index:Function}){

    const soundName: string = props.sound.name;

    const handleBoxClick = (index:number) => {
        const padsState : boolean[] = props.sound.pads.map((pad, padIndex) => padIndex === index
            ? !pad
            : pad
        );
        props.index(index, soundName, padsState);
    }

    return(
        <div>
            {props.sound.pads.map((pad,index) => pad
                ? <div key={index} className= {"pad sound-pad active b"+ index.toString()} onClick={() =>handleBoxClick(index)} > </div>
                : <div key={index} className= {"pad sound-pad b"+ index.toString()} onClick={() => handleBoxClick(index)} ></div>)}
        </div>
    )
}