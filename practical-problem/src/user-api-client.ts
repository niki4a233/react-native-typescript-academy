import { IdType, UserCreatedTo } from "./shared-types.js";
import { User } from "./users.js";

const API_BASE_URL = "http://localhost:4000/api/users";

export interface BlogsApiClient {
  getAllUsers(): Promise<User[]>;
  getUserById(id: IdType): Promise<User>;
  addNewUser(User: UserCreatedTo): Promise<User>;
  updateUser(User: User): Promise<User>;
  deleteUserById(id: IdType): Promise<User>;
}

class BlogApiClientImpl implements BlogsApiClient {
  async getAllUsers(): Promise<User[]> {
    return this.handleRequest(API_BASE_URL);
  }

  async getUserById(id: number): Promise<User> {
    return this.handleRequest(`${API_BASE_URL}/${id}`);
  }

  async addNewUser(User: UserCreatedTo): Promise<User> {
    return this.handleRequest(API_BASE_URL, {
      method: "User",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(User),
    });
  }

  async updateUser(User: User): Promise<User> {
    return this.handleRequest(`${API_BASE_URL}/${User.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(User),
    });
  }

  async deleteUserById(id: number): Promise<User> {
    return this.handleRequest(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
  }

  private async handleRequest(url: string, options?: RequestInit) {
    try {
      const UsersResp = await fetch(url, options);
      if (UsersResp.status >= 400) {
        return Promise.reject(UsersResp.body);
      }
      return UsersResp.json();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export const BlogsAPI: BlogsApiClient = new BlogApiClientImpl();
