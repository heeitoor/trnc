import ServiceBase from "./base";
const _ = require("lodash");

export default class SettingsService extends ServiceBase {
  constructor() {
    super();
    this.path = "/settings";
  }

  get() {    
    return super.get(this.path);
  }

  format(data) {
    let settings = {};
    for (const item of data) {
      settings[item.key] = item.value;
    }
    return settings;
  }
}
