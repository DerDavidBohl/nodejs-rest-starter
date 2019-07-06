import { RestApp } from "./utils/rest-app";

const app = new RestApp(3000, []);
app.start();