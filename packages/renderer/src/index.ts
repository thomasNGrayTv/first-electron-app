import { createApp } from "vue";
import App from "/@/App.vue";

import "./index.css";
import { router } from "/@/routes/main-routes.js";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");
