<template>
  <v-dialog v-model="isOpen" persistent content-class="modal">
    <v-card>
      <v-card-title
        ><p>Update book readed</p>
        <v-btn icon @click="$emit('closeModal')" class="colored-solid" size="x-small">
          <v-icon> mdi-close-circle-outline</v-icon>
        </v-btn></v-card-title
      >
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-form>
              <v-row>
                <v-col cols="2">
                  <p class="custom-label">Start date:</p>
                </v-col>
                <v-col cols="3">
                  <Datepicker
                    v-model="book.startDate"
                    @submit.prevent
                  ></Datepicker>
                </v-col>
                <v-col cols="2">
                  <p class="custom-label">End date:</p>
                </v-col>
                <v-col cols="3">
                  <Datepicker
                    v-model="book.endDate"
                    @submit.prevent
                  ></Datepicker>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="book.name"
                    label="Complete title"
                    :disabled="true"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="book.publisher"
                    label="Publisher"
                    :disabled="true"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="book.pages"
                    label="Number of pages"
                    :disabled="true"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="book.year"
                    label="First publish year"
                    :disabled="true"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-select
                    :items="items"
                    v-model="book.score"
                    label="Score"
                    hide-details="auto"
                    return-object
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Type here your book's review"
                    v-model="book.review"
                    hide-details="auto"
                    :disabled="true"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-btn block @click="putBR()" class="colored-solid">
                    Update&nbsp;
                    <v-icon>mdi-autorenew</v-icon>
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
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import BookService from '../services/books.service';
export default {
  name: "cEditBookReaded",
  components: { Datepicker },
  props: {
    currentModal: { type: String, required: false },
    selectedBook: { type: Object, required: true }
  },
  setup(props, { emit }) {
    const bookService = new BookService();
    const items = ["Really good", "Good", "Meh", "Bad", "Really bad"];
    const isOpen = ref(false);
    const state = reactive({
      response: [],
    });
    const { currentModal: modal, selectedBook: book } = toRefs(props);
    const clear = () => {
    };
    const putBR = async() => {
      if(book.value.score == 'Really good') book.value.score = 5
      else if(book.value.score == 'Good') book.value.score = 4
      else if(book.value.score == 'Meh') book.value.score = 3
      else if(book.value.score == 'Bad') book.value.score = 2
      else book.value.score = 1
      await bookService.PutBookReaded(book.value)
      emit('reloadUser')
      emit('closeModal')
    }
    return {
      isOpen,
      modal,
      state,
      clear,
      items,
      putBR,
      book
    };
  },
  watch: {
    modal(value) {
      this.isOpen = value == "editBookReaded";
      this.state.response = [];
      this.searchText = "";
      this.searchLength = 0;
    },
  },
}
</script>
