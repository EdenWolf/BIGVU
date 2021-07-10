function Blue(props) {
    const image = props.image;
    const text = props.imageText;
    const imageAlt = props.imageAlt;
    const mode = props.mode;
    const setCanvas = props.setCanvas;


    return (
        <div className="imageBox">
            <canvas width="640" height="360" id="myCanvas" className="blue" onLoad={() => setCanvas(document.getElementById("myCanvas"))}></canvas>

            {/*image === "" ? null : (
                <div>
                    <img src={image} alt={imageAlt} id="myImage" />
                    <div className={`imgText ${mode === "1" ? "imgText23" : ""}`}>{text}</div>
                </div>
            )*/}
        </div>
    )
}

export default Blue;