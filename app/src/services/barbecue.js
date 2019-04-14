import ServiceBase from "./base";

export default class BarbecueService extends ServiceBase {
  constructor() {
    super();
    this.path = "/barbecue";
  }

  get() {
    return super.get(this.path);
  }

  post() {
    return super.post(this.path);
  }
}
