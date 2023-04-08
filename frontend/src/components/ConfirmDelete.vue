<template>
  <v-dialog
    v-model="isOpen"
    @click:outside="$emit('closeModal')"
    content-class="modal"
  >
    <v-card id="form">
      <v-card-title>Delete item<v-spacer /></v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <h2 style="text-align: center;">{{book.name}} will be deleted definetely, are you sure?</h2>
             <v-img
          :src="sadBookImg"
          class="my-3"
          contain
          height="350"
        />
            <v-btn @click="deleteBook()" block class="colored-solid search">
              Confirm&nbsp;
              <v-icon> mdi-delete-circle-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { ref, toRefs } from "vue";
import BooksService from '@/services/books.service';
export default {
  name: "cConfirmDelete",
  props: {
    currentModal: { type: String, required: false },
    selectedBook: { type: Object, required: true }
  },
  computed: {
    sadBookImg() {
      return new URL('@/assets/books2.png', import.meta.url).href;
    }
  },
  setup(props, { emit }) {
    const { currentModal: modal, selectedBook: book } = toRefs(props)
    const bookService = new BooksService()
    const isOpen = ref(false)
    const deleteBook = async() => {
      if(!book.value.publisher) {
        await bookService.DeleteBookToRead(book.value._id)
      } else {
        await bookService.DeleteBookReaded(book.value._id)
      } 
      emit('reloadUser');
      emit('closeModal');
    }
    return {
      isOpen,
      modal,
      deleteBook, 
      book
    };
  },
  watch: {
    modal(value) {
      this.isOpen = value == "confirmDelete";
    },
  },
};
</script>
