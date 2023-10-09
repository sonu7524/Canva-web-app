import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import "./styles.css";

function Sidebar({setIsTexting ,setIsUploading}) {
    
    return (
        <div className='sidebar'>
            <div className='sidebar-menu'>
                <ViewQuiltOutlinedIcon />
                <p>Design</p>
            </div>
            <div onClick={() =>{
                setIsUploading(true);
                setIsTexting(false)}} 
                className='sidebar-menu'>
                <CloudUploadOutlinedIcon />
                <p>Uploads</p>
            </div>
            <div onClick={() =>{
                setIsTexting(true);
                setIsUploading(false);
                }} 
                className='sidebar-menu'>
                <TitleOutlinedIcon />
                <p>Text</p>
            </div>
        </div>
    )
}

export default Sidebar;