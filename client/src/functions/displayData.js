import axios from "axios";
export const displayData = async (dispatch, addImage) => {
    await axios.get('http://localhost:5000/api/images')
    .then(res => {
      const result = res.data.map((singleImage) => {
        const uint8Array = new Uint8Array(singleImage.image.data.data);
        const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
        return URL.createObjectURL(blob);
      });
      dispatch(addImage(result));
    })
    .catch(err => {
      console.log(err);
    });
}