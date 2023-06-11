import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export default function App() {
  const [query, setQuery] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [page, setPage] = useState(1);
  const [modalOn, setModalOn] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [status, setStatus] = useState('idle');
  const [scroll, setScroll] = useState(0);

  const onFormSubmit = newQuery => {
    if (query !== newQuery) {
      setStatus('pending');
      fetchFun(newQuery, 1);
      setQuery(newQuery);
      setPage(1);
      setGalleryItems([]);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function fetchFun(query, page) {
    if (query === '') {
      setStatus('resolved');
      return;
    }
    console.log('Fetching query=' + query, 'page=' + page);
    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=6707322-7bfef4d2355bcd2c21033e4e5&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(function (data) {
        console.log('images uploaded=', data.hits.length);
        setGalleryItems(prevState => [...prevState, ...data.hits]);
        if (data.hits.length === 0) {
          setStatus('resolved empty');
        } else {
          setStatus('resolved');
        }
      })
      .catch(error => {
        setStatus('rejected');
        console.log(error);
        alert('Nothing was found.Try again.');
      })
      .finally(() => scrolling());
  }

  const toggleModal = () => {
    underBackdropScrollHandler();
    setModalOn(!modalOn);
  };

  const underBackdropScrollHandler = () => {
    // Preventing scrolling under backdrop and margin-left issue
    if (!modalOn) {
      const el = document.querySelector('.ImageGallery');
      const marginLeft = window
        .getComputedStyle(el, null)
        .getPropertyValue('margin-left');

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';

      el.style.marginLeft = marginLeft;
    } else {
      document.body.style.position = 'static';
      document.body.style.overflow = 'visible';
      document.body.style.top = '';
      window.scrollTo(0, scroll);
    }
  };

  function scrolling() {
    setTimeout(() => {
      if (document.querySelector('.ImageGallery').firstElementChild) {
        const { height: cardHeight } = document
          .querySelector('.ImageGallery')
          .firstElementChild.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 4,
          behavior: 'smooth',
        });
      }
    }, 300);
  }

  const modalHandler = ({ dataset, alt }) => {
    document.body.style.top = `-${window.scrollY}px`;
    setModalUrl(dataset.url);
    setModalAlt(alt);
    setScroll(window.scrollY);
    toggleModal();
  };

  const loadMoreClickHandler = async () => {
    setStatus('pending');
    fetchFun(query, page + 1);
    setPage(prevState => prevState + 1);
  };

  return (
    <div
      style={{
        // height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      {modalOn && (
        <Modal url={modalUrl} alt={modalAlt} toggleModal={toggleModal} />
      )}
      <Searchbar onSubmit={onFormSubmit} />

      <ImageGallery
        galleryItems={galleryItems}
        toggleModal={toggleModal}
        modalHandler={modalHandler}
      />

      {status === 'pending' && <Loader />}
      {status === 'resolved empty' && 'Nothing was found. Try something else.'}
      {galleryItems.length > 0 && status !== 'resolved empty' && (
        <Button loadMoreClickHandler={loadMoreClickHandler} />
      )}
    </div>
  );
}
