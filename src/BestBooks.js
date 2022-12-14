import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import photo from './img/photo.jpg';
import BookFormModal from './BookFormModal';
import UpdateForm from './UpdateForm';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      showUpdate: false,
      currentBook: {},
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
  
  
  openUpDate = (book) => {
    this.setState({showUpdate: true});
    this.setState({
      currentBook: book,
    })
  }

  closeUpDate = () => {
    this.setState({showUpdate: false});
  }


  createNewBook = async (bookInfo) => {
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

  createNewUpdate = async (bookInfo) => {
    try {
      console.log('hey', bookInfo);
      let response = await axios.put(`${process.env.REACT_APP_SERVER}/books/${bookInfo._id}`,bookInfo);
      console.log('response.data', response.data);
      let newBookArray = this.state.books.map(existingBook => {
        return existingBook._id === bookInfo._id
        ? response.data : existingBook
      });
      this.setState({
        books: newBookArray,
      });
    } catch (error) {
      console.log('error updating book ', error.response);
    }
  }

  handleUpdate = (e) => {
    e.preventDefault();
    this.createNewUpdate({
      title: e.target.formTitle.value || this.state.currentBook.title,
      description: e.target.formDescription.value || this.state.currentBook.description,
      status: e.target.formStatus.checked|| this.state.currentBook.status,
      _id: this.state.currentBook._id,
      __v: this.state.currentBook.__v,
    })
  }

  deleteBook = async (bookToDelete) => {
    try {
      let response = await axios.delete(`${process.env.REACT_APP_SERVER}/books/${bookToDelete._id}`);
      console.log(response.status);
      let filteredBooks = this.state.books.filter( book => {
        return book._id !== bookToDelete._id;
      });
      this.setState({ books: filteredBooks });
    } catch (error) {
      console.log('error deleting book ', error.response);
    }
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
          <button onClick={() => this.deleteBook(book)}>Delete</button>
          <button onClick={() => this.openUpDate(book)}>Update</button>
          <UpdateForm handleUpdate={this.handleUpdate}
                        show={this.state.showUpdate}
                        open={this.openUpDate}
                        close={this.closeUpDate}
                        book={this.state.currentBook}/>
        {console.log(book.title)}
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
        <BookFormModal handleSubmit={this.handleSubmit} 
                       show={this.state.showModal}
                       open={this.openPopUp}
                       close={this.closePopUp}/>
        <button onClick={this.openPopUp}>Add Book</button>
      </>
    )
  }
}

export default BestBooks;
