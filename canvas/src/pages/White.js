function White(props) {
    const image = props.image;
    const text = props.imageText;
    const imageAlt = props.imageAlt;
    const mode = props.mode;

    return (
        <div className="imageBox">
            {image === "" ? null : (
                <div className={`white canvas ${mode === "1" ? "canvasMode23" : ""}`}>
                    <img src={image} alt={imageAlt} className={`${mode === "1" ? "mode23" : ""}`} />
                    <div className={`imgText ${mode === "1" ? "imgText23" : ""}`}>{text}</div>
                </div>
            )}
        </div>
    )
}

export default White;