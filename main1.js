const loginid= document.querySelector('#loginid');
const pass= document.querySelector('#pass');
const users = localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[];



    function log(){
        const userinfo=users.find(e=> e.id=== loginid.value);
        if(loginid.value==='Akshit' && pass.value==='admin'){
            window.location = './calender.html';
        }
        if(loginid.value === userinfo.id.value && pass.value === userinfo.password.value){
            window.location = './calender.html';
        }
        else{
            alert('Please fill all the credential Correctly');
        }
    }
    function newid(){
        window.location = './signup.html';
    }

    
    function buttonsoncall(){
        document.querySelector('#newuser').addEventListener('click' , newid);
        document.querySelector('#nextpage').addEventListener('click' , log);
        

    }
buttonsoncall();