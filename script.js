let nav =0;
let click = null;
let events = localStorage.getItem('events')?JSON.parse(localStorage.getItem('events')):[];
const weekdays = document.querySelector('.weekdays');
const days = [ 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday' ];
const newModal = document.querySelector('.NewModal');
const cal = document.querySelector('.calender');
const eventTitleInput = document.querySelector('#eventTitleInput');
const modalfollowup= document.querySelector('.modalfollowup');
const deleteEvent= document.querySelector('.deleteEvent');

function openModal(date){
    click=date;

    const eventforDay = events.find(e=> e.date == click);
    if(eventforDay){
       deleteEvent.classList.remove('hide');
       document.querySelector('.eventtext').innerText = eventforDay.title;
    }else{
        newModal.classList.remove('hide');
        modalfollowup.classList.remove('hide');
    }
}


function load(){
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }
    
    const month = dt.getMonth();
    const day = dt.getDate();
    const year = dt.getFullYear();
     
    const firstdayofmonth = new Date(year , month , 1);
    const daysinmonth = new Date(year , month+1 , 0).getDate();

    const datestring = firstdayofmonth.toLocaleDateString('en-in' , {
        weekday : 'long',
        year : 'numeric',
        month : 'numeric',
        day : 'numeric',

    });
    const paddingdays = days.indexOf(datestring.split(', ')[0]);

    document.getElementById('displaymonth').innerText = 
     `${dt.toLocaleDateString('en-in' , {month : 'long'})} ${year}`;

    weekdays.innerHTML = '';
    
    for(var k =1 ; k <= paddingdays + daysinmonth ; k++ ){}
    for(let i =1 ; i <= paddingdays + daysinmonth ; i++){
        const daysquare = document.createElement('div');
        daysquare.classList.add('days');
        if(k >36){
            daysquare.classList.add('days2');
        }
        if(i > paddingdays){
            daysquare.innerHTML = i - paddingdays;
            const eventforDay = events.find(e=> e.date === `${month + 1}/${i - paddingdays}/${year}` );
            const dayevent = document.createElement('div');
            const eventchart = document.createElement('li');
            if(eventforDay){
                dayevent.classList.add('dayevent');
                daysquare.appendChild(dayevent);
                modalfollowup.appendChild(eventchart);
                dayevent.innerText = eventforDay.title;
                eventchart.innerText = 'Date = '+ eventforDay.date + ' ' +'||' + '  Event = ' + ' ' + eventforDay.title;
            }
            if(i - paddingdays === day && nav === 0 ){
                daysquare.id= 'currentday';
            }
            
            daysquare.addEventListener('click' , ()=> openModal(`${month + 1}/${i - paddingdays}/${year}`));
        }else(
            daysquare.classList.add('padding')
        )
        weekdays.appendChild(daysquare);
        
    }
}


function closeModal(){
    
    newModal.classList.add('hide');
    modalfollowup.classList.add('hide');
    eventTitleInput.value = '';
    click = null ; 
    eventTitleInput.classList.remove('error');
    deleteEvent.classList.add('hide');
}


function saveEvent(){
    if(eventTitleInput.value){
        eventTitleInput.classList.remove('error');
        events.push({
            date: click,
            title: eventTitleInput.value,
        })
        localStorage.setItem('events' , JSON.stringify(events));
    }else{
        eventTitleInput.classList.add('error');
    }
    closeModal();
    location.reload();
}


function Eventdelete(){
    deleteEvent.classList.add('hide');
    events =  events.filter(e=> e.date !== click);
    localStorage.setItem('events' , JSON.stringify(events));
    location.reload();
}


function initbutton(){
    document.querySelector('.right').addEventListener('click' , ()=>{
        nav++ ;
        modalfollowup.innerHTML='';
        load();
    })
    document.querySelector('.left').addEventListener('click' , ()=>{
        nav-- ;
        modalfollowup.innerHTML='';
        load();
    })
    document.querySelector('.cancelbutton').addEventListener('click' , closeModal);
    document.querySelector('.savebutton').addEventListener('click' , saveEvent);
    document.querySelector('.deletebutton').addEventListener('click', Eventdelete);
    document.querySelector('.closebutton').addEventListener('click' , closeModal);
}

initbutton();
load();
