import "./sound-pads.css";
import {Sound} from "../beatsGallery/BeatsGallery";
import {useEffect, useState} from "react";

export default function SoundPads({ sound, soundName, updatePads}: {
    sound: Sound,
    soundName?: string,
    updatePads?: (pads: boolean[], name: string) => void
}) {

    const [pads, setPads] = useState<boolean[]>(sound.pads);

    useEffect(() => {
        updatePads && soundName && updatePads(pads, soundName)
    }, [pads]);

    function togglePad(index: number) {
        const changedPads: boolean[] = pads.map((pad, i) => i === index  ? !pad : pad);
        setPads(changedPads);
    }

    return (
        <>
            {pads.map((pad, index) => pad
                ? <div key={index} className="pad sound-pad active" onClick={() => togglePad(index)}></div>
                : <div key={index} className="pad sound-pad" onClick={() => togglePad(index)}></div>)}
        </>
    )
}