import {Sound} from "../BeatsGallery/BeatsGallery";
import {useEffect, useState} from "react";

export default function Track ({
    soundList,
    bpm
}: {
    soundList: Sound[],
    bpm: number
}) {
    const [playIndex, setPlayIndex] = useState(0);
    console.log()
    useEffect(() => {
        const id = setInterval(() => {
            setPlayIndex((playIndex) => playIndex > soundList.length - 1 ? 0 : playIndex + 1)
        },600000/bpm);

        return () => {
            clearInterval(id);
        };
    },[soundList, bpm]);
    
    return (
        <>
            {soundList.map(sound => sound.pads[playIndex]
                ? <audio autoPlay={true} src={"/" + sound.name + ".wav"} loop={true}/>
                : null)}
        </>
    )
}