<template>
  <v-container :class='envMode != "production" ? "envMode": ""'>
    <h1>Welcome reader #{{ userId }}</h1>
    <v-row>
      <v-col cols="12" sm="9">
        <div class="content">
          <div class="content-title">
            <h2>Readed</h2>
            <v-btn
              @click="currentModal = 'addBookReaded'"
              class="colored-outline"
              icon
            >
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
            <span class="clear"></span>
          </div>
          <div class="content-body">
            <p v-if="booksReaded.length == 0" class="non-content">
              You don't have books readed!
            </p>
            <div v-else>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  v-for="item in booksReaded"
                  :key="item._id"
                >
                  <v-card>
                    <v-card-text>
                      <div>Rating: {{ item.score }} / 5</div>
                      <p class="text-h4 text--primary">{{ item.name }}</p>
                      <p>
                        <b>Publisher: </b>{{ item.publisher }}
                      </p>
                      <p>
                        <b>Publish year: </b>{{ item.year }},
                        <b>total pages: </b>{{ item.pages }}
                      </p>
                      <p>
                        <b>Start date: </b
                        >{{
                          new Date(item.startDate).toLocaleDateString("en-US")
                        }}, <b>end date: </b
                        >{{
                          new Date(item.endDate).toLocaleDateString("en-US")
                        }}
                      </p>
                      <div class="text--primary">
                        <b>Review: </b>{{ item.review }}
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        @click="
                          currentModal = 'confirmDelete';
                          selectedBook = item;
                        "
                        class="colored-outline"
                        icon
                      >
                        <v-icon> mdi-delete-circle-outline</v-icon>
                      </v-btn>
                      <v-btn
                        @click="
                          currentModal = 'editBookReaded';
                          selectedBook = item;
                        "
                        class="colored-outline"
                        icon
                      >
                        <v-icon> mdi-update</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="3">
        <div class="content">
          <div class="content-title">
            <h2>My stats</h2>
            <span class="clear"></span>
          </div>
          <div class="content-body">
            <p class="custom-label">
              <b>Books readed: </b>{{ booksReaded.length }}
            </p>
            <p class="custom-label">
              <b>Books to read: </b>{{ booksToRead.length }}
            </p>
            <p class="custom-label"><b>Av. rating: </b>{{ avgRating }}</p>
            <p class="custom-label">
              <b>Pages read: </b>{{ pagesReaded }}
            </p>
          </div>
        </div>
        <div class="content">
          <div class="content-title">
            <h2>To read</h2>
            <v-btn
              @click="currentModal = 'addBookToRead'"
              class="colored-outline"
              icon
            >
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
            <span class="clear"></span>
          </div>
          <div class="content-body">
            <p v-if="booksToRead.length == 0" class="non-content">
              You don't have books to read!
            </p>
            <div v-else>
              <v-table class="content-table">
                <thead>
                  <tr>
                    <th class="text-center">Title</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in booksToRead" :key="item.name">
                    <td style="width: 70%" class="text-center">
                      {{ item.name }}
                    </td>
                    <td class="text-center">
                      <v-btn
                        @click="
                          currentModal = 'confirmDelete';
                          selectedBook = item;
                        "
                        class="colored-outline"
                        icon
                      >
                        <v-icon> mdi-delete-circle-outline</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <AddBookToRead
      :currentModal="currentModal"
      @closeModal="closeModal"
      @reloadUser="reloadUser"
    ></AddBookToRead>
    <AddBookReaded
      :currentModal="currentModal"
      @closeModal="closeModal"
      @reloadUser="reloadUser"
    ></AddBookReaded>
    <EditBookReaded
      :currentModal="currentModal"
      :selectedBook="selectedBook"
      @closeModal="closeModal"
      @reloadUser="reloadUser"
    ></EditBookReaded>
    <ConfirmDelete
      :currentModal="currentModal"
      :selectedBook="selectedBook"
      @closeModal="closeModal"
      @reloadUser="reloadUser"
    ></ConfirmDelete>
  </v-container>
</template>
<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import BookService from "../services/books.service";

// Store
import { useBookStore } from '@/store/books.store';
import { useUserStore } from '@/store/user.store';
import { useAppStore } from '@/store/app.store';

// Components
import AddBookReaded from "../components/AddBookReaded.vue";
import AddBookToRead from "../components/AddBookToRead.vue";
import EditBookReaded from "../components/EditBookReaded.vue";
import ConfirmDelete from "../components/ConfirmDelete.vue";

const userStore = useUserStore();
const { userId } = storeToRefs(userStore);

const booksStore = useBookStore();
const { booksReaded, booksToRead, avgRating, pagesReaded } = storeToRefs(booksStore);

const appStore = useAppStore()
const { envMode } = storeToRefs(appStore)

const bookService = new BookService();

const selectedBook = ref({});
const currentModal = ref('disabled');

const reloadUser = async() => {
  await bookService.GetCurrentUser();
  await bookService.GetBooksReaded();
  await bookService.GetBooksToRead();
}

const closeModal = () => {
  currentModal.value = 'disabled'
}

onMounted(async() => {
  await reloadUser();
});
</script>
