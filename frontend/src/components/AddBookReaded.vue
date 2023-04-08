<template>
  <v-dialog v-model="isOpen" persistent content-class="modal">
    <v-card id="book-readed">
      <v-card-title
        ><p>Book readed</p>
        <v-btn icon @click="$emit('closeModal'); clear()" class="colored-solid" size="x-small">
          <v-icon> mdi-close-circle-outline</v-icon>
        </v-btn></v-card-title
      >
      <v-card-text>
        <v-row>
          <v-col cols="9">
            <v-text-field
              v-on:keyup.enter="search"
              v-model="searchText"
              label="Name of the book"
              hide-details="auto"
              :disabled="state.selectedItem"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn
              @click="search"
              block
              id="search-bar"
              v-if="!state.selectedItem"
              class="colored-solid search"
              :loading="loading"
            >
              Search&nbsp;
              <v-icon> mdi-search-web</v-icon>
            </v-btn>
            <v-btn
              @click="clear"
              block
              id="search-bar"
              v-if="state.selectedItem"
              class="colored-solid search"
            >
              Clear&nbsp;
              <v-icon> mdi-autorenew</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" v-if="searchLength > 0 && !state.selectedItem">
            <v-table>
              <thead>
                <tr>
                  <th class="text-center">Title</th>
                  <th class="text-center">Author</th>
                  <th class="text-center">Publisher</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in state.response" :key="item.title">
                  <td>{{ item.title }}</td>
                  <td>{{ item.author_name }}</td>
                  <td>{{ item.publisher }}</td>
                  <td>
                    <v-btn @click="getItem(item)" size="small" class="colored-solid" block>
                      Select&nbsp;
                      <v-icon> mdi-search-web</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
          <v-col cols="12">
            <v-form v-if="state.selectedItem">
              <v-row>
                <v-col cols="12">
                  <h2>Complete the data</h2>
                </v-col>
                <v-col cols="2">
                  <p class="custom-label">Start date:</p>
                </v-col>
                <v-col cols="3">
                  <Datepicker
                    v-model="state.book.startDate"
                    @submit.prevent
                  ></Datepicker>
                </v-col>
                <v-col cols="2">
                  <p class="custom-label">End date:</p>
                </v-col>
                <v-col cols="3">
                  <Datepicker
                    v-model="state.book.endDate"
                    @submit.prevent
                  ></Datepicker>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="state.book.name"
                    label="Complete title"
                    :disabled="true"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="state.book.publisher"
                    label="Publisher"
                    :disabled="true"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="state.book.pages"
                    label="Number of pages"
                    :disabled="true"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="state.book.year"
                    label="First publish year"
                    :disabled="true"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-select
                    :items="items"
                    v-model="state.book.score"
                    label="Score"
                    hide-details="auto"
                    return-object
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Type here your book's review"
                    v-model="state.book.review"
                    hide-details="auto"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-btn block @click="postBR()" class="colored-solid search">
                    Save&nbsp;
                    <v-icon>mdi-content-save-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { ref, toRefs, reactive } from "vue";
import axios from "axios";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import BookService from "../services/books.service";
export default {
  name: "cAddBookReaded",
  components: { Datepicker },
  props: {
    currentModal: { type: String, required: false },
  },
  setup(props, { emit }) {
    const bookService = new BookService();
    const items = ["Really good", "Good", "Meh", "Bad", "Really bad"];
    const isOpen = ref(false);
    const loading = ref(false);
    const searchText = ref("");
    const searchLength = ref(0);
    const state = reactive({
      response: [],
      selectedItem: false,
      book: {
        name: "",
        pages: 0,
        year: 0,
        score: "",
        publisher: "",
        startDate: null,
        endDate: null,
        review: "",
      },
    });
    const { currentModal: modal } = toRefs(props);
    const search = async () => {
      const title = searchText.value.toLowerCase().replace(/ /g, "+");
      state.response = await getBooks(title);
    };
    const getBooks = async (bookName) => {
      const url = `https://openlibrary.org/search.json?q=${bookName}`;
      loading.value = true;
      const {
        data: { docs },
      } = await axios.get(url, {
        params: {
          mode: "eboks",
          limit: 10,
        },
      });
      docs.forEach((book) => {
        if (!book.author_name) book.author_name = ["None"];
        if (!book.publisher) book.publisher = ["None"];
        book.author_name = book.author_name.slice(0, 1).join(", ");
        book.publisher = book.publisher.slice(0, 1).join(", ");
      });
      searchLength.value = docs.length;
      loading.value = false;
      return docs;
    };
    const getItem = (book) => {
      state.selectedItem = true;
      state.book.name = book.title;
      state.book.pages = book.number_of_pages_median || 0;
      state.book.year = book.first_publish_year || 2005;
      state.book.publisher = book.publisher;
    };
    const clear = () => {
      state.selectedItem = false;
      state.book.name = "";
      state.book.pages = 0;
      state.book.year = 0;
      state.book.publisher = "";
      state.book.score = ''
      state.book.review = ''
      state.book.startDate = null
      state.book.endDate = null
    };
    const postBR = async () => {
      if (state.book.score == "Really good") state.book.score = 5;
      else if (state.book.score == "Good") state.book.score = 4;
      else if (state.book.score == "Meh") state.book.score = 3;
      else if (state.book.score == "Bad") state.book.score = 2;
      else state.book.score = 1;
      await bookService.PostBookReaded(state.book);
      emit("reloadUser");
      emit("closeModal");
    };
    return {
      isOpen,
      modal,
      search,
      searchText,
      searchLength,
      state,
      getItem,
      clear,
      items,
      postBR,
      loading
    };
  },
  watch: {
    modal(value) {
      this.isOpen = value == "addBookReaded";
      this.state.response = [];
      this.searchText = "";
      this.searchLength = 0;
    },
  },
};
</script>
