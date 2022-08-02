
const API_BASE_URL = "http://localhost:4000/api/posts";

export async function addNewPost(post) {
    try {
        const postResp = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        if(postResp.status >= 400) {
            return Promise.reject(postResp.body);
        }
        return postResp.json();
    } catch(err) {
        return Promise.reject(err);
    }
}

  
  
  
  
  
 
  export async function deleteThePost(post) {
      try {
          const postResp = await fetch(`${API_BASE_URL}/${post.id}`, {
              method: 'DELETE',
          });
          if(postResp.status >= 400) {
              return Promise.reject(postResp.body);
          }
          return postResp.json();
      } catch(err) {
          return Promise.reject(err);
      }
  }
export async function getAllPosts() {
    try {
        const postsResp = await fetch(API_BASE_URL);
        if(postsResp.status >= 400) {
            return Promise.reject(postsResp.body);
        }
        return postsResp.json();
    } catch(err) {
        return Promise.reject(err);
    }
}