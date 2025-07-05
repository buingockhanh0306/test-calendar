import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

const app = createApp(App);

if (import.meta.env.MODE === "development") {
  app.config.devtools = true;
}

app.use(vuetify);
app.mount("#app");
