import { ApiBook } from "./google-books-api-types";


const API_BASE_URL = "http://localhost:4000/api/books";

export interface FavoriteBooksApiClient {
  getAllFavorites(): Promise<ApiBook[]>;
  addToFavorite(ApiBook: ApiBook): Promise<ApiBook>;
  getApiBookById(id: string): Promise<ApiBook>;
  updateApiBook(ApiBook: ApiBook): Promise<ApiBook>;
  deleteById(id: string): Promise<ApiBook>;
}

export class FavoriteBooksApiClientImpl implements FavoriteBooksApiClient {

  async getAllFavorites(): Promise<ApiBook[]> {
    return this.handleRequest(API_BASE_URL);
  }
  async addToFavorite(ApiBook: ApiBook): Promise<ApiBook> {
    return this.handleRequest(API_BASE_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ApiBook),
    });
  }
  async getApiBookById(id: string): Promise<ApiBook> {
    return this.handleRequest(`${API_BASE_URL}/${id}`);
  }
  async updateApiBook(ApiBook: ApiBook): Promise<ApiBook> {
    return this.handleRequest(`${API_BASE_URL}/${ApiBook.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ApiBook),
    });
  }
  async deleteById(id: string): Promise<ApiBook> {
    return this.handleRequest(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
  }
  private async handleRequest(URL: string, options?: RequestInit) {
    try {
      const ApiBooksResp = await fetch(URL, options);
      if (ApiBooksResp.status >= 400) {
        return Promise.reject(ApiBooksResp.body);
      }
      return ApiBooksResp.json();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export const favoriteBooksAPI: FavoriteBooksApiClient = new FavoriteBooksApiClientImpl();
