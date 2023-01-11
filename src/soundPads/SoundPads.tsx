import "./sound-pads.css";
import {Sound} from "../beatsGallery/BeatsGallery";
import {useEffect, useState} from "react";

export default function SoundPads({ sound, soundIndex, updatePads}: {
    sound: Sound,
    soundIndex?: number,
    updatePads?: (pads: boolean[], index: number) => void
}) {

    const [pads, setPads] = useState<boolean[]>(sound.pads);

    useEffect(() => {
        updatePads && soundIndex && updatePads(pads, soundIndex)
    }, [pads]);

    function togglePad(index: number) {
        const changedPads: boolean[] = pads.map((pad, i) => {
            if (i === index) {
                // Toggle the clicked pad
                return !pad;
            } else {
                // The rest didn't change
                return pad;
            }
        });
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