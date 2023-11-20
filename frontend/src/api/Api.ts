export default class Api {
  public static instance: Api;

  public static readonly API_PATH = "http://localhost:3001/";

  private constructor() {}

  public static getInstance(): Api {
    if (!this.instance) {
      this.instance = new Api();
    }

    return this.instance;
  }

  private async get(endpoint: string) {
    return await fetch(Api.API_PATH + endpoint, { method: "GET" });
  }

  private async post(endpoint: string, data: Object) {
    console.log(JSON.stringify(data));

    return await fetch(Api.API_PATH + endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  }

  public static login(username: string, password: string) {
    return Api.getInstance().post("auth/login", { username, password });
  }

  public static register(username: string, password: string) {
    return Api.getInstance().post("auth/register", { username, password });
  }
}
