import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const page = 1;

export const pixabayImg = async (request, page) => {
    try {
        const param = ({
            key: '43782622-1f93097b215e528bacdf16430',
            q: `${request}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: 40,
        });
        const response = await axios.get(`https://pixabay.com/api/?${param}`);
        console.log(response);
        return response.data;
    }
    catch (error) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
}



