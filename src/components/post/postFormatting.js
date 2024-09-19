import DOMPurify from "dompurify";
import React from "react";

export function makeClickableLinks (text) {
    const cleanedText = text.replace(/[\[\]\(\)\*]/g, '');
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const html = cleanedText.replace(urlRegex, (url) => {
        return ` <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a> `;
    });
    return DOMPurify.sanitize(html)
};



export const determineSelfText = (selftext) => {
    console.log(selftext)
    if (selftext !== '') {
        const sanitizedText = makeClickableLinks(selftext)
        console.log(sanitizedText)
        return <p dangerouslySetInnerHTML={{ __html: sanitizedText}} className="text" ></p>;
    } 
    return null;
}
