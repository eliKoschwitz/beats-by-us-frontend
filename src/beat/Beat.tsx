import "./beat.css"
import {BeatType} from "../BeatsGallery/BeatsGallery";
import SoundPads from "../soundPads/SoundPads";

export default function Beat(props: { beat: BeatType, indexBack: Function }) {

    const htmlAudioKick: HTMLAudioElement = new Audio(require("./Kick.wav"));
    const htmlAudioHiHat: HTMLAudioElement = new Audio(require("./hihat.wav"));
    const htmlAudioSnare: HTMLAudioElement = new Audio(require("./snare.wav"));

    let tempoIndex = 0;
    let bpm = 40;

    const repeat = () => {
        let step = tempoIndex % 8;
        props.beat.soundList.map(sound => {
            sound.pads.map(pad => {
                if (pad === true) {
                    switch (sound.name) {
                        case "Hihat":
                            console.log("Sound wurde abgespielt");
                            return htmlAudioHiHat.play();
                        case "Kick":
                            console.log("Sound wurde abgespielt");
                            return htmlAudioKick.play();
                        case "Snare":
                            console.log("Sound wurde abgespielt");
                            return htmlAudioSnare.play();
                        default:
                            return null
                    }
                }
            })
        })
    }

        function start() {
            const tempo = (60 / bpm) * 1000;
            setInterval(() => {
                repeat();
            }, tempo)
        }

        const beatName = props.beat.name;

        const callBackIndex = (index: number, soundName: string, padsState: boolean[]) => {
            props.indexBack(index, soundName, beatName, padsState);
        }

        return (
            <>
                <h2 className={"beat-title"}>{props.beat.name}</h2>
                <div className="track">
                    <div className="sound-pads">
                        <button className={"startButtonForBeat"} onClick={start}>start</button>
                        {props.beat.soundList.map((sound, index) => {
                            return (
                                <div>
                                    <p>{sound.name}</p>
                                    <SoundPads key={index} sound={sound} index={callBackIndex}/>
                                    <audio className={"sound"} src={"allSounds/" + sound.name + ".wav"}></audio>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }