import { gallery, pixabayImg, renderPhotos } from './pixabay-api';
import Notiflix from 'notiflix';

const form = document.querySelector('form.search-form');
const fetchImagesBtn = document.querySelector('button.load-more');
let searchQuery;
let page = 1;

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    searchQuery = ev.currentTarget.elements.searchQuery.value;
    console.log("Searching:" + searchQuery);
    gallery.innerHTML = '';
    fetchImagesBtn;
    try {
        const response = await pixabayImg(searchQuery, page);
        const images = response.hits;
        if (response.totalHits === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            console.log('Sorry, there are no images matching your search query. Please try again.')
        }
        else if (response.totalHits < 40) {
            renderPhotos(images);
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        }
        else {
            renderPhotos(images);
            Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
            fetchImagesBtn.classList.remove('hidden');
        }
    }
    catch (error) {
        Notiflix.Notify.failure('Error! Please try again.');
    }
});


fetchImagesBtn.addEventListener('click', async ev => {
    fetchImagesBtn.classList.add('hidden');
    page += 1;
  try {
      const response = await pixabayImg(searchQuery, page);
      const images = response.hits;
      const pages = Math.ceil(response.totalHits / 40);
      console.log("Pages:" + pages);
      renderPhotos(images);
      console.log("Page:" + page);
      if (page === pages) {
          fetchImagesBtn.classList.add('hidden');
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      }
      else {
        fetchImagesBtn.classList.remove('hidden');
      }
  } catch (error) {
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


