import "./beat.css"
import {BeatType} from "../BeatsGallery/BeatsGallery";
import SoundPads from "../soundPads/SoundPads";

export default function Beat(props:{beat:BeatType, indexBack:Function}){

    const sound = require("./Kick.wav");
    const htmlaudio: HTMLAudioElement = new Audio(sound);
    htmlaudio.play();


    console.log(props.beat);

    let tempoIndex = 0;
    let bpm = 40;

    const repeat = () => {
        let step = tempoIndex % 8;
        /*
        const activeBars = document.querySelectorAll(`.b${step}`);
        console.log(activeBars);

         */

        const sounds = props.beat.soundList;

        let counter = 0;

        for(const sound of sounds) {
            console.log(counter++)
            for(const pad of sound.pads){
                console.log(pad)
            }
        }

        //for(const pad of props.beat.soundList.)

        //props.beat.soundList.forEach(sound => sound.pads.forEach((pad, index)=> index ===)

        //tempoIndex++;

        //console.log("Repeat Index",index)
    }

    function start () {
        const tempo = (60/bpm)*1000;
        setInterval(() => {
            repeat();
        },tempo)
    }

    const beatName= props.beat.name;

    const callBackIndex = (index:number, soundName:string, padsState :boolean[]) => {
        props.indexBack(index, soundName, beatName, padsState);
    }

    function makeSound() {

    }

    return(
        <>
            <h2 className={"beat-title"}>{props.beat.name}</h2>
            <div className="track">
                <div className="sound-pads">
                    <button className={"startButtonForBeat"} onClick={makeSound} >Play</button>
                    <button className={"startButtonForBeat"} onClick={start} >start</button>
                    {props.beat.soundList.map((sound,index) => {
                        return(
                            <div>
                                <p>{sound.name}</p>
                                <SoundPads key={index} sound={sound} index={callBackIndex} />
                                <audio className={"sound"} src={"allSounds/"+sound.name+".wav"} > </audio>
                            </div>
                        )})}
                </div>
            </div>
        </>
    )
}