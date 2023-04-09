<template>
  <v-footer dark padless>
    <v-card flat tile class="text-center" id="footer">
      <v-card-text>
        <v-btn
          v-for="e in icons"
          :key="e"
          class="mx-4 colored-solid"
          icon
          :href="e.url"
          target="_blank"
        >
          <v-icon size="24px">
            {{ e.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        It began with the forging of the Great Rings. Three were given to the Elves, immortal, wisest and fairest of all beings. Seven to the Dwarf-Lords, great miners and craftsmen of the mountain halls. And nine, nine rings were gifted to the race of Men, who above all else desire power. For within these rings was bound the strength and the will to govern each race. But they were all of them deceived, for another ring was made. Deep in the land of Mordor, in the Fires of Mount Doom, the Dark Lord Sauron forged a master ring, and into this ring he poured his cruelty, his malice and his will to dominate all life.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Murdoc98</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  name: "cFooter",
  components: {},
  data: () => ({
    icons: [
      { icon: "mdi-github", url: "https://github.com/murdoc98" },
      {
        icon: "mdi-linkedin",
        url: "https://www.linkedin.com/in/oscar-martinez-vazquez-889401130/",
      },
    ],
  }),
};
</script>
