
if(localStorage.length == 0){
    window.location.href = 'index.html';
}

const url = 'https://6377b3810992902a250f31d7.mockapi.io/';

let userId = localStorage.getItem('userId');

let personalName = document.querySelector('#username');
let personalEmail = document.querySelector('#email');

const fillInfo =  () => {
    fetch(url + 'users')
        .then(res => res.json())
        .then(data => {
            personalName.innerText = data[userId - 1].username;
            personalEmail.innerText = data[userId - 1].email;
            let changedUser = document.querySelector('#hexaModalInputOne').value = personalName.innerText;
            let changedPassword = document.querySelector('#hexaModalInputTwo').value = data[userId - 1].password; 
        })
       

    fetch('https://6377b3810992902a250f31d7.mockapi.io' + '/posts')
    .then(res => res.json())
    .then(data => {
        
        data.forEach((post) => {
            fetch(url + 'users')
            .then(res => res.json())
            .then(data => {                  
              let postAuthor = data[post.user_id - 1].username;
              
                console.log(post.user_id)

            let newElement  = document.createElement('div');
                newElement.classList.add("mystyle");
            newElement.innerHTML = `
            <div class="commentDisplay">
                        
                        <div class="commentWrapper">
                            <p>${post.content}</p>
                        </div>
                        <hr>
                        <div class="commentInterface">
                            <label>
                            <h3>Author: ${postAuthor}</h3>
                            </label><div class="buttonsWrapper"><span><label>0 likes</label>        <button><i class="fa fa-thumbs-up" aria-hidden="true"></i></button></span><span><button id = "cmntButtonSmall"><i class="fa fa-comment" aria-hidden="true"></i></button></span><span><button id="deleteButtonSmall">Delete</button></span></div>
                        </div>
                        <div  class="inputCommentOnPost" style="display: none;">
                            <input class="cmnInput" placeholder="Make a comment on this post" type="text">
                            <button id="cmnOnPost">Comment</button>
                        </div>
                        <div class="commentOnPostWrapper" style="display: none;">
                        
                        </div>
                    </div>
                    
                </div>
               
            `
            document.querySelector('.commentSection').appendChild(newElement);

            fetch('https://6377b3810992902a250f31d7.mockapi.io' + '/comments')
            .then(res => res.json())
            .then(podaci => {
                
                for(let i = 0; i < podaci.length; i++){
                   
                    if(post.id == podaci[i].post_id){
                        
                        let dile  = document.createElement('div')
                        dile.classList.add("mystyle");
                         dile.innerHTML += `
                         
                         <div class="commentOnPostTwo" style="margin-top: 2%;border: 2px solid orangered;display: block; display: flex; justify-content: space-between; " >
                            <p style="display: inline; font-weight: bold ; margin-right: 2%;">${podaci[i].user_id}</p>
                            <p style="display: inline; text-align: left;text-align: left;">${podaci[i].content}</p>
                        </div>`;
                         
                         newElement.querySelector('.commentOnPostWrapper').appendChild(dile);

                          if(personalName.innerText == podaci[i].user_id){
                            newElement.querySelector('#deleteButtonSmall').style.display = 'none';
                            console.log('kk')
                          }
                    }
                    
                }
            })

           newElement.querySelector('#cmnOnPost').addEventListener('click', () => {
            let inputOnComment = newElement.querySelector('.cmnInput').value; 

            

            let objectt = {
                'user_id':   personalName.innerText,
                'post_id':  post.user_id,
                'content':  inputOnComment
            }
                fetch('https://6377b3810992902a250f31d7.mockapi.io' + '/comments',{
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(objectt)
                })
                .then(res => res.json())
                .then(data => {
                let newElementTwo  = document.createElement('div');
                newElementTwo.innerHTML = ` 
                <div class="commentOnPost" style="margin-top: 2%;border: 2px solid orangered;display: flex;justify-content: space-between">
                    <p style="display: inline; font-weight: bold ; margin-right: 2%;">${data.user_id}</p>
                    <p style="display: inline; text-align: left;text-align: left;">${inputOnComment}</p>
                </div>`;
            newElement.querySelector('.commentOnPostWrapper').appendChild(newElementTwo);
            newElement.querySelector('.inputCommentOnPost').style.display = 'none';
            newElement.querySelector('.cmnInput').value = '';
        })
           
          })
          newElement.querySelector('#cmntButtonSmall').addEventListener('click', () => {
            newElement.querySelector('.inputCommentOnPost').style.display = 'block';
            newElement.querySelector('.commentOnPostWrapper').style.display = 'block';
        })
            newElement.querySelector('#deleteButtonSmall').style.display = 'none';
              newElement.querySelector('#deleteButtonSmall').addEventListener('click', () => {
                newElement.style.display = 'none';
            });
           
        })   
     })
  })
}
const logOutFun = () => {
    localStorage.clear();
    window.location.href = 'index.html';

}
const changeInfo = () => {
    document.querySelector('.popUpChangeModal').style.display = 'block';
    
    
}
const closeModal = () => {
    document.querySelector('.popUpChangeModal').style.display = 'none';
}
const confirmChangeInfo = () => {
    let changedUser = document.querySelector('#hexaModalInputOne').value;
    let changedPassword = document.querySelector('#hexaModalInputTwo').value;

    let newInfo = {
        'password': changedPassword,
        'username' : changedUser
    }

    newInfo = JSON.stringify(newInfo)

     fetch(url + 'users/' + userId, {
        method : 'PUT',
        headers : {'Content-Type' : 'application/json'},
        body : newInfo
    })
        .then(res => res.json())
        .then(data => {
            window.location.href = 'hexa.html'
        })
        
}
const confirmDeleteInfo = () => {
    fetch(url + 'users/' + userId, {
        method : 'DELETE',
        headers : {'Content-Type' : 'application/json'}
    })
        .then(res => res.json())
        .then(data => {
            logOutFun(); 
        })
    
}
const publishPost = () => {
    let postContext = document.querySelector('#userTextArea').value;
    let newElement  = document.createElement('div');

    let postValues = {
        'user_id' : userId,
        'content' : postContext,
        'likes' : 0
    }

    fetch('https://6377b3810992902a250f31d7.mockapi.io' + '/posts', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(postValues)
    })
        .then(res => res.json())
        .then(data => {
            newElement.innerHTML = `
            <div class="commentDisplay">
                        
                        <div class="commentWrapper">
                            <p>${postContext}</p>
                        </div>
                        <hr>
                        <div class="commentInterface">
                            <label><h3>Author: ${personalName.innerText}</h3></label>
                            <div class="buttonsWrapper">
                            <span><button><i class="fa fa-thumbs-up" aria-hidden="true"></i></button></span>
                            <span><button id="cmntButtonSmall"><i class="fa fa-comment" aria-hidden="true"></i></button></span>
                            <span><button id="deleteButtonSmall">Delete</button></span></div>
                        </div>
                        <div class="inputCommentOnPost" style="display: none;">
                            <input class="cmnInput" placeholder="Make a comment on this post" type="text">
                            <button id="cmnOnPost">Comment</button>
                        </div>
                        <div class="commentOnPostWrapper" style="display: block;">
                   
                    </div>
                    </div>
                    
                </div>
              
            `
       window.location.href = 'hexa.html'
    })    
    
}
window.addEventListener('load', fillInfo);
document.querySelector('#logOutBtn').addEventListener('click', logOutFun);
document.querySelector('#changeUserInfoBtn').addEventListener('click', changeInfo);
document.querySelector('.x-button').addEventListener('click', closeModal);
document.querySelector('.changeBtm').addEventListener('click', confirmChangeInfo);
document.querySelector('.deleteBtm').addEventListener('click', confirmDeleteInfo);
document.querySelector('#submitPost').addEventListener('click', publishPost);

