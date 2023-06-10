import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

class App extends React.Component {
  state = {
    query: '',
    galleryItems: [],
    page: 1,
    modalOn: false,
    modalUrl: '',
    modalAlt: '',
    status: 'idle',
    scroll: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({
        status: 'pending',
      });
      this.fetchFun(this.state.query, this.state.page);
    }
  }

  onFormSubmit = query => {
    this.setState(prevState => {
      if (prevState.query !== query) {
        return { query, page: 1, galleryItems: [] };
      }
    });
  };

  fetchFun = (query, page) => {
    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=6707322-7bfef4d2355bcd2c21033e4e5&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(data => {
        console.log('query=' + query, 'page=' + page);
        this.setState(prevState => {
          return {
            galleryItems: [...prevState.galleryItems, ...data.hits],
            status: 'resolved',
          };
        });
      })
      .then(() => this.scrolling())
      .catch(error => {
        this.setState({
          status: 'rejected',
        });
        console.log(error);
        alert('Nothing was found.Try again.');
      });
  };

  toggleModal = () => {
    this.underBackdropScrollHandler();
    this.setState(prevState => {
      return { modalOn: !this.state.modalOn };
    });
  };

  underBackdropScrollHandler = () => {
    // Preventing scrolling under backdrop and margin-left issue
    if (!this.state.modalOn) {
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
      window.scrollTo(0, this.state.scroll);
    }
  };

  scrolling() {
    setTimeout(() => {
      const { height: cardHeight } = document
        .querySelector('.ImageGallery')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 4,
        behavior: 'smooth',
      });
    }, 300);
  }

  modalHandler = ({ dataset, alt }) => {
    document.body.style.top = `-${window.scrollY}px`;
    this.setState({
      modalUrl: dataset.url,
      modalAlt: alt,
      scroll: window.scrollY,
    });
    this.toggleModal();
  };

  btnClickHandler = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
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
        {this.state.modalOn && (
          <Modal
            url={this.state.modalUrl}
            alt={this.state.alt}
            toggleModal={this.toggleModal}
          />
        )}
        <Searchbar onSubmit={this.onFormSubmit} />

        <ImageGallery
          galleryItems={this.state.galleryItems}
          toggleModal={this.toggleModal}
          modalHandler={this.modalHandler}
        />

        {this.state.status === 'pending' && <Loader />}
        {this.state.galleryItems.length > 0 && (
          <Button btnClickHandler={this.btnClickHandler} />
        )}
      </div>
    );
  }
}

export default App;
