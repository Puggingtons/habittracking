import AccessTokenHandler from "./AccessTokenHandler";

export default class Api {
  private static instance: Api;

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

  private async put(endpoint: string, data: Object) {
    return await fetch(Api.API_PATH + endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json", ...Api.authHeader() },
    });
  }

  private async delete(endpoint: string) {
    return await fetch(Api.API_PATH + endpoint, {
      method: "DELETE",
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
          console.log(`Error on login: ${(await res.json()).message}`);
          throw new Error("login not successful");
        }
      });
  }

  public static async checkLogin(): Promise<boolean> {
    return await Api.getInstance()
      .get("auth/profile")
      .then((res) => {
        if (res.status !== 200) return false;
        return true;
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
          console.log(`Error on registration: ${(await res.json()).message}`);
          throw new Error("registration not successful");
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

  public static async deleteHabit(id: number) {
    return await this.getInstance().delete(`habits/${id}`);
  }

  public static async postHabit(habit: {
    name: string;
    interval: number;
    description: string;
  }) {
    return await this.getInstance().post("habits", habit);
  }

  public static async putHabit(
    id: number,
    habit: { name?: string; interval?: number; description?: string }
  ) {
    return await this.getInstance().put(`habits/${id}`, habit);
  }

  public static async postHabitEntry(habitId: number, timestamp?: Date) {
    return await this.getInstance().post(`habits/${habitId}/entry`, {
      timestamp,
    });
  }

  public static async getHabit(habitId: number) {
    return await this.getInstance().get(`habits/${habitId}`);
  }

  public static async getDueHabits() {
    return await this.getInstance().get("habits/due");
  }
}
