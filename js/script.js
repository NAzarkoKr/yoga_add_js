window.addEventListener('DOMContentLoaded', function() {

//TABS
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),//class with tabs
        info = document.querySelector('.info-header'),//tag block 
        tabContent = document.querySelectorAll('.info-tabcontent');//content in tab
    
    function hideTabContent(a) {
        for (let i = a; i< tabContent.length; i++) {
            //for hide element from page
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');

        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            //for show content from page
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');

        }
    }
    //check ckick on element 
    info.addEventListener('click', function(event){
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++){
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });





//TIMER

    let deadline = '2020-3-21';//END DAY 

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000)%60),
        minutes = Math.floor((t/1000/60)%60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    //add value to timer, use ID
    function setClock(id, endtime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        //update timer 1second
        function updateClock(){
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            //stop timer
            if(t.total<=0) {
               clearInterval(timeInterval); 
            }
        }
    }

    setClock('timer', deadline);

//ADD MODAL WiNDOW
    let more = document.querySelector('.more'),
        overlay =  document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        //can`t scroll page content with modal window
        document.body.style.overflow = 'hidden';
    });

    //close window
    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';

    });

    //Form send data to server
    let message = {
        loading: 'Loading...',
        success: 'Thank you!',
        failure: 'Error=('
    };

    let form = document.querySelector('.main-form'),
        input  = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        //stop refresh page
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        //to JSON
        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);
        
        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
    });

//SLIDER

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');
    
    showSlides(slideIndex);

    function showSlides(n) {
        
        //if slids end go to 1st
        if(n > slides.length) {
            slideIndex = 1;
        }
        //in other side go to last 
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        //for(let i = 0; i < slides.length; i++) {
          //  slides[i].style.display = 'none';
        //}
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        //for dots active
        dots[slideIndex - 1].classList.add('dot-active');
    }

    //slideIndex++
    function plusSlides(n){
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    //prev arrow slide
    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function(){
        plusSlides(1);
    });

    //delegation on dots
    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });



//CALCULATE
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        //Info in 2 input must have. Check
        persons.addEventListener('change', function() {
           personsSum = +this.value;
           total = (daysSum + personsSum)*4000;

           if(restDays.value == '' || persons.value == '') {
               totalValue.innerHTML = 0;
           } else {
               totalValue.innerHTML = total;
           }

        });

        restDays.addEventListener('change', function() {
            daysSum = +this.value;
            total = (daysSum + personsSum)*4000;
 
            if(persons.value == '' || restDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
 
         });

         place.addEventListener('change', function() {
             if (persons.value == '' || restDays.value == '') {
                totalValue.innerHTML = 0;
             } else {
                 let a = total;
                 totalValue.innerHTML = a * this.options[this.selectedIndex].value;
             }

         });
});


