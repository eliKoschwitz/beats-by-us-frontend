import "./beat.css"
import {BeatType, Sound} from "../BeatsGallery/BeatsGallery";
import SoundPads from "../soundPads/SoundPads";
import {MutableRefObject, useRef} from "react";

export default function Beat(props: { beat: BeatType, indexBack: Function }) {

    const soundPadsContainer: MutableRefObject<any> = useRef();
    let intervalID: NodeJS.Timer;
    let bpm = 40;

    const playTrack = (
        soundPadsContainer: MutableRefObject<any>,
        soundList: Sound[],
        bpm: number
    ) => {
        let i: number = 0;
        const tempo = (60 / bpm) * 1000;
        intervalID = setInterval(() => {
            soundList.forEach(sound => {
                if (sound.pads[i]) {
                    soundPadsContainer.current.querySelector(`audio[data-name="${sound.name}"]`).play();
                }
            });

            i++;

            if (i > soundList.length - 1) {
                //clearInterval(id);
                i = 0;
            }
        }, tempo);
    };

    const beatName = props.beat.name;

    const callBackIndex = (index: number, soundName: string, padsState: boolean[]) => {
        props.indexBack(index, soundName, beatName, padsState);
    }

    return (
        <>
            <h2 className={"beat-title"}>{props.beat.name}</h2>
            <div className="track">
                <div className="sound-pads" ref={soundPadsContainer}>
                    <button
                        className={"startButtonForBeat"}
                        onClick={() => playTrack(soundPadsContainer, props.beat.soundList, bpm)}
                    >start
                    </button>
                    <button className={"startButtonForBeat"} onClick={() => clearInterval(intervalID)}>Stop</button>

                    {props.beat.soundList.map((sound, index) => {
                        return (
                            <div key={sound.name}>
                                <p>{sound.name}</p>
                                <SoundPads key={index} sound={sound} index={callBackIndex}/>
                                <audio
                                    data-name={sound.name}
                                    className={"sound"}
                                    src={"/" + sound.name + ".wav"}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}