import {Sound} from "../beatsGallery/BeatsGallery";
import {MutableRefObject, useRef} from "react";

export default function Track({soundList, bpm}: { soundList: Sound[], bpm: number }) {

    const soundPadsContainer: MutableRefObject<any> = useRef();
    let intervalID: NodeJS.Timer;

    const playTrack = (soundPadsContainer: MutableRefObject<any>, soundList: Sound[], bpm: number) => {
        let i: number = 0;
        let padLength: number = soundList[0].pads.length;
        const tempo = (60 / bpm) * 1000;
        intervalID = setInterval(() => {
            soundList.forEach(sound => {
                if (sound.pads[i]) {
                    soundPadsContainer.current.querySelector(`audio[data-name="${sound.name}"]`).play();
                    console.log("playTrack-padIndex",i);
                }
            });
            i++;

            if (i === padLength) {
                i = 0;
            }


        }, tempo);
    };

    return (
        <>
            <div className="sound-pads" ref={soundPadsContainer}>
                <button
                    className={"startButtonForBeat"}
                    onClick={() => playTrack(soundPadsContainer, soundList, bpm)}
                >start
                </button>
                <button className={"startButtonForBeat"} onClick={() => clearInterval(intervalID)}>Stop</button>
                {soundList.map((sound) =>
                    <div key={sound.name}>
                        <audio
                            data-name={sound.name}
                            className={"sound"}
                            src={"/" + sound.name + ".wav"}
                        />
                    </div>
                )}
            </div>
        </>
    )
}