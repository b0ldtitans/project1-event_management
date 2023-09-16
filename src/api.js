import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://my-json-server.typicode.com/b0ldtitans/project1-event_management/",
});

export default instance;
