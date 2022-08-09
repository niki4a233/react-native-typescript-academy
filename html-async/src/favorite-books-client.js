"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteBooksAPI = exports.FavoriteBooksApiClientImpl = void 0;
const API_BASE_URL = "http://localhost:3000/api/books";
class FavoriteBooksApiClientImpl {
    getAllFavorites() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleRequest(API_BASE_URL);
        });
    }
    addToFavorite(ApiBook) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleRequest(API_BASE_URL, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(ApiBook),
            });
        });
    }
    getApiBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleRequest(`${API_BASE_URL}/${id}`);
        });
    }
    updateApiBook(ApiBook) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleRequest(`${API_BASE_URL}/${ApiBook.id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(ApiBook),
            });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleRequest(`${API_BASE_URL}/${id}`, {
                method: "DELETE",
            });
        });
    }
    handleRequest(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ApiBooksResp = yield fetch(url, options);
                if (ApiBooksResp.status >= 400) {
                    return Promise.reject(ApiBooksResp.body);
                }
                return ApiBooksResp.json();
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
}
exports.FavoriteBooksApiClientImpl = FavoriteBooksApiClientImpl;
exports.favoriteBooksAPI = new FavoriteBooksApiClientImpl();
