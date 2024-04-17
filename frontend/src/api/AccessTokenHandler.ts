import Api from "./Api";

export default class AccessTokenHandler {
  private static readonly ACCESS_TOKEN = "access_token";

  private constructor() {}

  public static writeAccessToken(access_token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, access_token);
  }

  public static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  public static removeAccessToken() {
    localStorage.removeItem(this.ACCESS_TOKEN);
  }

  public static async isLoggedIn() {
    return this.getAccessToken() != null && await Api.checkLogin();
  }
}
