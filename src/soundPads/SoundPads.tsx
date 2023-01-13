import "./sound-pads.css";
import {Sound} from "../beatsGallery/BeatsGallery";

export default function SoundPads({sound, soundName, updatePads, indexFunction}: {
    sound: Sound,
    soundName?: string,
    updatePads?: (pads: boolean[], name: string) => void,
    indexFunction?: Function
}) {

    function togglePad(index: number) {
        const changedPads: boolean[] = sound.pads.map((pad, i) => i === index ? !pad : pad);
        updatePads && soundName && updatePads(changedPads, soundName);
        indexFunction && indexFunction(sound.name, changedPads);
        console.log("SP", changedPads)

    }

    return (
        <>
            {sound.pads.map((pad, index) =>
                <div key={index} className={pad ? "pad sound-pad active" : "pad sound-pad"}
                     onClick={() => togglePad(index)}></div>)}
        </>
    )
}