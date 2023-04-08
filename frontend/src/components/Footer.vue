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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin congue
        eros vitae purus tincidunt commodo. Mauris in nulla a quam dignissim
        laoreet consequat vitae libero. In hac habitasse platea dictumst.
        Phasellus eget congue augue, quis ornare turpis. Etiam tristique
        tincidunt arcu, elementum convallis eros mattis ut. Cras venenatis,
        neque eget rhoncus molestie, lacus enim efficitur libero, nec vehicula
        velit mi sit amet nulla. Proin tincidunt magna quis odio mollis,
        fermentum tempor nulla elementum.
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
