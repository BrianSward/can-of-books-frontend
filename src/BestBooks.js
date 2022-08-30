import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import photo from './img/photo.jpg';
import BookFormModal from './BookFormModal';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
    }
  }
  
  getBooks = async() => {
    try {
      let bookData = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      console.log(bookData.data);
      this.setState({
        books: bookData.data
      })
      
    } catch (error) {
      console.log('we have an error: ', error.response);
    }
  }

  openPopUp = () => {
    this.setState({showModal: true});
  }

  closePopUp = () => {
    this.setState({showModal: false});
  }

  createNewBook = async (bookInfo) => {
    console.log(bookInfo);
    try {
      let response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, bookInfo);
      let newBook = response.data;
      this.setState({
        books: [...this.state.books, newBook],
      });
    } catch (error) {
      console.log('error posting book ', error.response);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.createNewBook({
      title: event.target.formTitle.value,
      description: event.target.formDescription.value,
      status: event.target.formStatus.checked,
    })
  }
  
  componentDidMount() {
    this.getBooks();
  }
  
  render() {
    let carouselItems = this.state.books.map((book) => (
      <Carousel.Item key={book._id}>
        <img
          className="d-block w-100"
          src={photo}
          alt={book.description}
        />
        <Carousel.Caption>
          <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>
            {book.title}
          </h3>
          <p>{book.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
           <Carousel activeIndex={this.state.books._id} >
           {carouselItems}
          
         </Carousel>
          
          ) : (
            <h3>No Books Found :(</h3>
            )}
        <BookFormModal handleSubmit={this.handleSubmit} show={this.state.showModal} open={this.openPopUp}
                       close={this.closePopUp}/>
        <button onClick={this.openPopUp}>Add Book</button>
      </>
    )
  }
}

export default BestBooks;
