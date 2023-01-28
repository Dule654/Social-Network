if(localStorage.length > 0){
    window.location.href = 'hexa.html';
}

const url = 'https://6377b3810992902a250f31d7.mockapi.io/';

document.querySelector('#SignUpBtn').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'block';
});

document.querySelector('#SingUpBtnTwo').addEventListener('click', () => {
    let usernameInput = document.querySelector('.inputOneModal').value;
    let emailInput = document.querySelector('.inputTwoModal').value;
    let passwordInput = document.querySelector('.inputThreeModal').value;
    let numm = true;
    

    let unos = {
        'username' : usernameInput,
        'password' : passwordInput,
        'email' : emailInput
    }

    unos = JSON.stringify(unos);

    const funkcijaZaUnos =  async () => {
        await fetch(url + 'users', {
             method : 'POST',
             headers : {'Content-Type' : 'application/json'},
             body : unos
         })
         .then(res => res.json())
         .then(podaci => {
            localStorage.setItem('userId', podaci.id);
         })
         window.location.href = 'hexa.html'
        }

        fetch(url + 'users')
            .then(res => res.json())
            .then(data => {
                
                    if (data == '') {
                       funkcijaZaUnos();
                       
                    }else{
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].username === usernameInput) {
                              alert('The name already exist')
                              numm = false;
                            }
                            if (data[i].email === emailInput) {
                                alert('The email already exist')
                                numm = false;
                              }
                        
                    }
                    if(numm === true){
                        funkcijaZaUnos();
                }   
            }
        })
    }
            
);  

document.querySelector('#indexLoginBtn').addEventListener('click', () => {
    let loginEmailInput = document.querySelector('#LoginEmail').value;
    let loginPasswordInput = document.querySelector('#LoginPassword').value;
    
    fetch(url + 'users')
        .then(res => res.json())
        .then(data => {
            let nummTwo = true;
            for (let i = 0; i < data.length; i++){
                if(data[i].email === loginEmailInput && data[i].password === loginPasswordInput){
                    localStorage.setItem('userId',  data[i].id)
                    nummTwo = false;
                    window.location.href = 'hexa.html'
                }  
            }
            if(nummTwo === true){
                alert('Takav korisnik nije registrovan')
            }
        })
        
});
        
        
