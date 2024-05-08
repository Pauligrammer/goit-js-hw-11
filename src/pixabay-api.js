import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export let page = 1;
export let photos;
export const gallery = document.getElementById("gallery");

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

export function renderPhotos(photos) {
    photos = response.hits;
    const photoCard = (photos
        .map(photo => {
            `<div class="photo-card">
            <a href="${photo.largeImageURL}">
            <img src="${photo.webformatUrl}" alt="${photo.tags}" loading="lazy"/></a>
            <div class="info">
                <p class="info-item">
                <b>Likes</b>
                ${photo.likes}
                </p>
                <p class="info-item">
                <b>Views</b>
                ${photo.views}
                </p>
                <p class="info-item">
                <b>Comments</b>
                ${photo.comments}
                </p>
                <p class="info-item">
                <b>Downloads</b>
                ${photo.downloads}
                </p>
            </div>
        </div>`
        })
        .join(""))
    
    gallery.insertAdjacentHTML('beforeend', photoCard);
    const lightbox = new SimpleLightbox(`.gallery a`, {
    captions: true,
    captionSelector: "img",
    captionsData: "alt",
    captionPosition: "bottom",
    captionDelay: 250,
  });
  lightbox.open();
}