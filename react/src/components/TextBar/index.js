import "./styles.css";
import { useState} from "react";
import Button from "../../common/Button";
import { uploadFile } from "../../functions/upload";

function TextBar({setInputText}) {
    let [text, setText] = useState("");
    const handleClick = () => {
        setInputText(text);
        setText("");
    }
    return (
        <div className="file-uploader">
            <input class="input" onChange={(e)=> setText(e.target.value)} />
            <button className="add-btn" onClick={handleClick} >Add</button>
        </div>
    );
}

export default TextBar;