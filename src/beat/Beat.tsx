import "./beat.css"
import {BeatType} from "../BeatsGallery/BeatsGallery";
import SoundPads from "../soundPads/SoundPads";

export default function Beat(props:{beat:BeatType}){

    console.log(props.beat);

    //const pads = document.querySelectorAll(".pad");
    //const audio = document.querySelector(props.sound.name+"-sound")
    let index = 0;
    let bpm = 40;

    const repeat = () => {
        let step = index % 8;
        //console.log(step)
        //const activeBars = document.querySelectorAll(`.props.beat.name${step}`)
        const activeBars = document.querySelectorAll(`.b${step}`);
        console.log(activeBars);
        index++;
    }

    // video 4 Time 4:38
    function start () {
        const interval = (60/bpm)*1000;
        setInterval(() => {
            repeat();
        },interval)
    }

    return(
        <>
            <h2 className={"beat-title"}>{props.beat.name}</h2>
            <div className="track">
                <div className="sound-pads">
                    <button className={"startButtonForBeat"} onClick={start} >start</button>
                    {props.beat.soundList.map((sound,index) => {
                        return(
                            <div>
                                <p>{sound.name}</p>
                                <SoundPads key={index} sound={sound} />
                                <audio className={sound.name+"-sound"} src={"allSounds/"+sound.name+".wav"} > </audio>
                            </div>
                        )})}
                </div>
            </div>
        </>
    )
}