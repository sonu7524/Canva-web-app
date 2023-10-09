import { useSelector } from "react-redux";
import Button from "../Button";
import "./styles.css";

function DownloadBar({downloadFunc}) {
    const images = useSelector((state) => state.images);
    console.log(images);
    return (
        <div className="download-bar">
            <label className="download-label">Export Your Design</label>
            <button onClick={()=> downloadFunc()} className="download-btn">Download</button >
        </div>
    )
}

export default DownloadBar;