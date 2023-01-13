import "./sound-pads.css";
import {Sound} from "../beatsGallery/BeatsGallery";

export default function SoundPads({sound, soundName, updatePads, key, index}: {
    sound: Sound,
    soundName?: string,
    updatePads?: (pads: boolean[], name: string) => void,
    key: number,
    index: Function
}) {

    const handleBoxClick = (index: number) => {
        const padsState: boolean[] = sound.pads.map((pad, padIndex) => padIndex === index
            ? !pad
            : pad
        );
        index(index, soundName, padsState);
    }

    function togglePad(index: number) {
        const changedPads: boolean[] = sound.pads.map((pad, i) => i === index ? !pad : pad);
        updatePads && soundName && updatePads(changedPads, soundName);
    }

    return (
        <>
            {sound.pads.map((pad, index) =>
                <div key={index} className={pad ? "pad sound-pad active" : "pad sound-pad"}
                     onClick={() => togglePad(index)}></div>)}
        </>
    )
}