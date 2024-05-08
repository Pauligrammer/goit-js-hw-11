import { page, photos, gallery, pixabayImg, renderPhotos } from './pixabay-api';
import Notiflix from 'notiflix';

const form = document.querySelector('form.search-form');
let searchQuery;

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    searchQuery = ev.currentTarget.elements.searchQuery.value;
    console.log("Searching:" + searchQuery);
    gallery.innerHTML = '';
    page = 1;
    try {
        const response = await pixabayImg(searchQuery, page);
        photos = response.hits;
        if (response.totalHits === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            console.log('Sorry, there are no images matching your search query. Please try again.')
        }
        else if (response.totalHits < 40) {
            renderPhotos(photos);
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        }
        else {
            renderPhotos(photos);
            Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
        }
    }
    catch (error) {
        Notiflix.Notify.failure('Error! Please try again.');
    }
});

//--------SMOOTH SCROLL--------------
// function smoothScroll() {
//     const { height: cardHeight } = document
//         .querySelector(".gallery")
//         .firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//         top: cardHeight * 2,
//         behavior: "smooth",
//     });
// }


