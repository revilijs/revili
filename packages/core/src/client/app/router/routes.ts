import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import type { DefineComponent } from "vue";

export const routes: Array<{
  path: string;
  component: DefineComponent;
}> = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];
