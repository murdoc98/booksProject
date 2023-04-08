<template>
  <v-dialog
    v-model="isOpen"
    @click:outside="$emit('closeModal')"
    content-class="modal"
  >
    <v-card id="form">
      <v-card-title>Book to read<v-spacer /></v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="9">
            <v-text-field
              v-on:keyup.enter="search"
              v-model="searchText"
              label="Name of the book"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn @click="search" block class="colored-solid search" :loading="loading">
              Search&nbsp;
              <v-icon> mdi-search-web</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" v-if="searchLength > 0">
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
                  <td>{{ item.author_name.join(', ') }}</td>
                  <td>{{ item.publisher.join(', ') }}</td>
                  <td>

                  <v-btn @click="postBTR(item)" size="small" class="colored-solid" block>
                    Select&nbsp;
                    <v-icon> mdi-search-web</v-icon>
                  </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
        </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { ref, toRefs, reactive } from "vue";
import axios from "axios";
import BookService from '@/services/books.service';

export default {
  name: "cAddBookToRead",
  props: {
    currentModal: { type: String, required: false },
  },
  setup(props, { emit }) {
    const bookService = new BookService();
    const isOpen = ref(false);
    const loading = ref(false);
    const searchText = ref('');
    const searchLength = ref(0);
    const state = reactive({
      response: [],
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
      docs.forEach(book => {
        if(!book.author_name) book.author_name = ['None'];
        if(!book.publisher) book.publisher = ['None'];
        book.author_name = book.author_name.slice(0, 1);
        book.publisher = book.publisher.slice(0, 1);
      });
      searchLength.value = docs.length;
      loading.value = false;
      return docs;
    };
    const postBTR = async(book) => {
      await bookService.PostBookToRead(book);
      emit('reloadUser');
      emit('closeModal');
    }
    return {
      isOpen,
      modal,
      search,
      searchText,
      searchLength,
      state,
      postBTR,
      loading
    };
  },
  watch: {
    modal(value) {
      this.isOpen = value == "addBookToRead";
      this.state.response = [];
      this.searchText = '';
      this.searchLength = 0;
    },
  },
};
</script>
