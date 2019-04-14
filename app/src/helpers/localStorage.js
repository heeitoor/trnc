export default class LocalStorageHelper {
  static getSettings() {
    let stage = localStorage.getItem("settings");

    if (stage) {
      return JSON.parse(stage);
    }

    return {};
  }

  static setSettings(settings) {
    localStorage.setItem("settings", JSON.stringify(settings));
  }
}
