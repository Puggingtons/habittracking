import AccessTokenHandler from "./AccessTokenHandler";

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

  private static authHeader(): { Authorization: string } | undefined {
    const access_token = AccessTokenHandler.getAccessToken();

    if (access_token) {
      console.log(access_token);
      return { Authorization: `Bearer ${access_token}` };
    }
  }

  private async get(endpoint: string) {
    return await fetch(Api.API_PATH + endpoint, {
      method: "GET",
      headers: Api.authHeader(),
    });
  }

  private async post(endpoint: string, data: Object) {
    console.log(JSON.stringify(data));

    return await fetch(Api.API_PATH + endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json", ...Api.authHeader() },
    });
  }

  public static async login(username: string, password: string): Promise<any> {
    return await Api.getInstance()
      .post("auth/login", { username, password })
      .then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          console.log("successfully logged in");

          AccessTokenHandler.writeAccessToken((await res.json()).access_token);
        } else {
          throw new Error("login not successfull");
        }
      });
  }

  public static async register(username: string, password: string) {
    return await Api.getInstance()
      .post("auth/register", { username, password })
      .then(async (res) => {
        // on successfull registration, directly login the user
        if (res.status >= 200 && res.status < 300) {
          return await this.login(username, password);
        } else {
          throw new Error("registration not successfull");
        }
      });
  }

  public static logout() {
    // TODO make api call to auth/logout
    AccessTokenHandler.removeAccessToken();
  }

  public static async getHabits() {
    return await this.getInstance().get("habits");
  }
}
