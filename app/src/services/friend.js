import ServiceBase from "./base";

export default class FriendService extends ServiceBase {
  constructor() {
    super();
    this.path = "/friend";
  }

  get() {
    return super.get(this.path);
  }

  post() {
    return super.post(this.path);
  }
}
