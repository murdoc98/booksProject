// Utilities
import { defineStore } from 'pinia'

export interface IBookReaded {
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

export interface IBookToRead {
  name: string
  _id?: string
  external_id: string
}

export const useBookStore = defineStore('books', {
  state: () => ({
    _booksReaded: [] as IBookReaded[],
    _booksToRead: [] as IBookToRead[],
  }),
  getters: {
    booksReaded: state => state._booksReaded,
    booksToRead: state => state._booksToRead,
    avgRating: state => {
      if(state._booksReaded.length == 0) {
        return 0;
      }
      const pagesSum = state._booksReaded.reduce((a, b: IBookReaded) => a + b.score, 0)
      const average = pagesSum / state._booksReaded.length
      return average.toFixed(1)
    },
    pagesReaded: state => {
      return state._booksReaded.reduce((a, b:IBookReaded) => a + b.pages, 0)
    }
  },
  actions: {
    setBooksReaded(books: IBookReaded[]) {
      this._booksReaded = books
    },
    setBooksToRead(books: IBookToRead[]) {
      this._booksToRead = books
    }
  }
});