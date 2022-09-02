const signupid=document.querySelector('#signupid');
const newpass=document.querySelector('#newpass');
const passwd=document.querySelector('#passwd');
const div=document.querySelector('.div');
const users = localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[];

function savecreds(){
    if(newpass.value===passwd.value){
        users.push({
            id: signupid.value,
            password: newpass.value,
        })
        localStorage.setItem('users' , JSON.stringify(users));
    }
    const newbutton=document.createElement('button');
    div.appendChild(newbutton);
    newbutton.innerText= 'Back';
    newbutton.addEventListener('click' , ()=>{
        window.location = './index.html';
    })
    
}

function goback(){
    signupid.value='';
    window.history.back();
}


function buttonondemand(){
    document.querySelector('#cancel').addEventListener('click' , goback);
    document.querySelector('#save').addEventListener('click' , savecreds);
}

buttonondemand();