// src/plugins/vuetify.js
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Vuetify styles
import "vuetify/styles";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
  },
});
