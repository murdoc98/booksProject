import { ObjectId } from 'bson';
import { useBookStore } from '@/store/books.store';
import { useUserStore } from '@/store/user.store';
import AxiosInstance from './axios.service';

interface IBookReaded {
  endDate: Date
  startDate: Date
  name: string
  pages: number
  publisher: string
  review: string
  score: number
  year: number,
  _id?: string
}

interface IBookToRead {
  name: string
  _id?: string
  external_id: string
}

export default class BookService extends AxiosInstance {
  private bookStore
  private userStore
  private envMode
  // private env: string;

  constructor() {
    super()
    this.bookStore = useBookStore()
    this.userStore = useUserStore()
    this.envMode = this.appStore.envMode == 'production' ? true : false
  }

  get storageBooksReaded() {
    const storage = localStorage.getItem('bpBooksReaded')
    return storage == null ? [] : JSON.parse(storage) as IBookReaded[]
  }

  set storageBooksReaded(books: IBookReaded[]) {
    localStorage.setItem('bpBooksReaded', JSON.stringify(books))
  }

  get storageBooksToRead() {
    const storage = localStorage.getItem('bpBooksToReaded')
    return storage == null ? [] : JSON.parse(storage) as IBookToRead[]
  }

  set storageBooksToRead(books: IBookToRead[]) {
    localStorage.setItem('bpBooksToReaded', JSON.stringify(books))
  }

  get generateId() {
    return (new ObjectId()).toString()
  }

  async GetCurrentUser() {
    if(this.envMode) {
      const response = await this.axios!.get('/currentUser')
      this.userStore.setUserId(response.data._id)
    } else {
      this.userStore.setUserId('Browser mode')
    }
  }


  // BOOK READED CONTROLLER
  async GetBooksReaded() {
    if(this.envMode) {
      const response = await this.axios!.get('/booksReaded')
      this.bookStore.setBooksReaded(response.data)
    } else {
      this.bookStore.setBooksReaded(this.storageBooksReaded)
    }
  }

  async PostBookReaded(book: IBookReaded) {
    if(this.envMode) {
      await this.axios!.post('/bookreaded', book)
    } else {
      const records = this.storageBooksReaded;
      records.push({ _id: this.generateId, ...book })
      this.storageBooksReaded = records;
    }
  }

  async PutBookReaded(book: IBookReaded) {
    if(this.envMode) {
      await this.axios!.put(`/bookreaded/${book._id}`, book)
    } else {
      const recordIndex = this.storageBooksReaded.findIndex(e => e._id == book._id)
      const records = this.storageBooksReaded
      records[recordIndex] = book
      this.storageBooksReaded = records
    }
  }

  async DeleteBookReaded(bookId: string) {
    if(this.envMode) {
      await this.axios!.delete(`/bookreaded/${bookId}`)
    } else {
      const recordIndex = this.storageBooksReaded.findIndex(e => e._id == bookId)
      const records = this.storageBooksReaded
      records.splice(recordIndex, 1)
      this.storageBooksReaded = records
    }
  }

  // BOOK TO READ CONTROLLER
  async GetBooksToRead() {
    if(this.envMode) {
      const response = await this.axios!.get('/booksToRead')
      this.bookStore.setBooksToRead(response.data)
    } else {
      this.bookStore.setBooksToRead(this.storageBooksToRead)
    }
  }

  async PostBookToRead(rawBook: any) {
    const book: IBookToRead = {
      _id: this.generateId,
      name: rawBook.title,
      external_id: rawBook.key
    }
    if(this.envMode) {
      await this.axios!.post('/bookToRead', book)
    } else {
      const records = this.storageBooksToRead
      records.push(book)
      this.storageBooksToRead = records
    }
  }

  async PutBookToRead(book: IBookToRead) {
    if(this.envMode) {
      await this.axios!.post('/bookreaded', book)
    } else {
      const recordIndex = this.storageBooksToRead.findIndex(e => e._id == book._id)
      const records = this.storageBooksToRead
      records[recordIndex] = book
      this.storageBooksToRead = records
    }
  }

  async DeleteBookToRead(bookId: string) {
    if(this.envMode) {
      await this.axios!.delete(`/bookToRead/${bookId}`)
    } else {
      const recordIndex = this.storageBooksToRead.findIndex(e => e._id == bookId)
      const records = this.storageBooksToRead
      records.splice(recordIndex, 1)
      this.storageBooksToRead = records
    }
  }
}
