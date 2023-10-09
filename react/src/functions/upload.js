import axios from "axios";
import { toast } from "react-toastify";
export const uploadFile = async (formData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/upload',
            formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data);
        toast.success('Image uploaded successfully');
    } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Error uploading image');
    }
}