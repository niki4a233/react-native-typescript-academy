

async function init(){
    try {
     const resultsElem = document.getElementById(`results`);
     const usersResp = await fetch("users.json")
     const users = await usersResp.json();
     const gitUsers= await Promise.all(
          users.map(async user =>{
            const gitUserResp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=react+native&maxResults=15`);
              return gitUserResp.json();
          }))
        
        
        console.log(gitUsers);
        const images = gitUsers.map((gitUser) => {
          const img = new Image();
          img.src = gitUser.avatar_url;
          // resultsElem.appendChild(img);
          resultsElem.insertAdjacentElement(`beforeend`, img);
          return img;
        });
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 10000);
        });
        images.forEach((img) => resultsElem.removeChild(img));
     } catch (err){
            console.log(`Error`,err);
        }finally{ 
             console.log(`Demo finished`);
  }
}

  
  init();
