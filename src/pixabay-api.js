import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export let page = 1;
export const gallery = document.querySelector('div.gallery');

export async function pixabayImg (searchQuery, page) {
        const param = new URLSearchParams({
            q: `${searchQuery}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: 40,
        });
        const response = await axios.get(`https://pixabay.com/api/?key=43782622-1f93097b215e528bacdf16430&${param}`);
        console.log(response);
        return response.data;
        
}

export function renderPhotos(images) {
    const photoCard = images
        .map(image => {
            return `<div class="photo-card"><a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/></a><div class="info"><p class="info-item">
                <b>Likes</b>
                ${image.likes}
                </p>
                <p class="info-item">
                <b>Views</b>
                ${image.views}
                </p>
                <p class="info-item">
                <b>Comments</b>
                ${image.comments}
                </p>
                <p class="info-item">
                <b>Downloads</b>
                ${image.downloads}
                </p></div></div>`;
        })
        .join("");
    console.log(gallery);
    gallery.innerHTML += photoCard;
    const lightbox = new SimpleLightbox(`.gallery a`)
}