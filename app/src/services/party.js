import ServiceBase from "./base";

export default class PartyService extends ServiceBase {
  constructor() {
    super();
    this.path = "/party";
  }

  post(data) {
    return super.post(this.path, data);
  }
}
