export const ADD_IMAGE = "ADD_IMAGE";


export const addImage = (imageData) => {
    return {
        type: ADD_IMAGE,
        payload: imageData,
    };
};