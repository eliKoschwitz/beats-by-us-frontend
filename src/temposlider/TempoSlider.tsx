import "./tempo-slider.css";

export default function TempoSlider({bpm, onChange}: {
    bpm: number,
    onChange: Function
}) {

    return (
        <div className="tempo">
            <input
                type={"range"}
                className={"tempo-slider"}
                name={"tempo"}
                max={300}
                min={40}
                defaultValue={bpm}
                onChange={(e) => {
                    onChange(e);
                }}
            />
            <p>BPM: <span className="tempo-nr">{bpm}</span></p>
        </div>
    )
}
