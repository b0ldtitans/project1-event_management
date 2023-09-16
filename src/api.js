import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://my-json-server.typicode.com/b0ldtitans/mini_project_event-management",
});

export default instance;
