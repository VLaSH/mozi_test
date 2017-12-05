export class JWT {
  public static getAuthToken() {
    let access_token = localStorage.getItem('access_token');
    
    if (access_token) {
      return access_token;
    }
  }
}