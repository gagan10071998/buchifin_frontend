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


export const maskAadhar = (aadhar) => {
    if (aadhar.length === 12) {
        return aadhar.slice(-4).padStart(12, 'X').replace(/(.{4})/g, '$1-').slice(0, -1);
    } else {
        return aadhar; // Return as is if not 12 digits
    }
};

export const maskPAN = (pan) => {
    if (pan.length === 10) {
        return pan.slice(0, 5) + "XXXX" + pan.slice(9);
    } else {
        return pan; // Return as is if not 10 characters
    }
};
