import {USE_IMAGE_PLACEHOLDERS} from "./constants/paths";

export const getAssetPath = (url, size) => {
    if(USE_IMAGE_PLACEHOLDERS) {
        return `https://via.placeholder.com/${size}.png`;
    }

    return url;
};

export function convertDate(isoDateString) {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}


