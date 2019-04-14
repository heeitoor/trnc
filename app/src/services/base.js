import axios from "axios";
import config from "../config";

export default class ServiceBase {
  constructor() {
    this.instance = axios.create({
      baseURL: config.endpoint
    });
  }

  async get(path) {
    const { data } = await this.instance.get(path);
    return data;
  }

  async post(path, model) {
    const { data } = await this.instance.post(path, model);
    return data;
  }
}
