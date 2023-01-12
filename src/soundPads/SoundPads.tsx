import "./sound-pads.css";
import {Sound} from "../BeatsGallery/BeatsGallery";


export default function SoundPads(props:{key: number, sound:Sound, index:Function}){

    const soundName: string = props.sound.name;

    const handleBoxClick = (index2:number,soundName:string) => {
        const padsState : boolean[] = props.sound.pads.map((pad, index) => index === index2 ? !pad : pad);
        props.index(index2, soundName, padsState);
    }

    return(
        <div>
            {props.sound.pads.map((pad,index) => pad === true
                ? <div key={index} className= {"pad sound-pad active b"+ index.toString()} onClick={() =>handleBoxClick(index, soundName)} > </div>
                : <div key={index} className= {"pad sound-pad b"+ index.toString()} onClick={() => handleBoxClick(index, soundName)} ></div>)}
        </div>
    )
}