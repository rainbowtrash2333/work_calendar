import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueHashCalendar from "vue3-hash-calendar";
import "vue3-hash-calendar/es/index.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import router from "./router";

const app = createApp(App);
app.use(ElementPlus);
app.use(VueHashCalendar);
app.use(router);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
