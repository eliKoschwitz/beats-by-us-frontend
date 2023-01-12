import "./sound-pads.css";
import {Sound} from "../beatsGallery/BeatsGallery";

export default function SoundPads({ sound, soundName, updatePads}: {
    sound: Sound,
    soundName?: string,
    updatePads?: (pads: boolean[], name: string) => void
}) {

    function togglePad(index: number) {
        const changedPads: boolean[] = sound.pads.map((pad, i) => i === index  ? !pad : pad);
        updatePads && soundName && updatePads(changedPads, soundName);
    }

    return (
    <>
        {sound.pads.map((pad, index) =>
            <div key={index} className={pad ? "pad sound-pad active" : "pad sound-pad"} onClick={() => togglePad(index)}></div>)}
    </>
    )
}