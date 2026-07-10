'use strict'

let habbits = [];
const HABBIT_KEY = 'HABBIT_KEY'

const page = {
    menu: document.querySelector('.menu'),
    header: {
        h: document.querySelector('.name'),
        prog_days: document.querySelector('.prog_days')
    },
    content: {
        days_box: document.querySelector('#days_box'),
        next_day: document.querySelector('.day_next')
    }
}

function loadData() {
    const habbitString = localStorage.getItem(HABBIT_KEY);
    const habbitArr = JSON.parse(habbitString);
    if (Array.isArray(habbitArr)) {
        habbits = habbitArr;
    }
}

function saveData() {
    localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits))
}

function rerenderMenu(activeHabbit) {
    for(const habbit of habbits) {
        const existed = document.querySelector(`[habbit_id="${habbit.id}"]`)
        if(!existed){
            const el = document.createElement('button');
            el.setAttribute('habbit_id', habbit.id);
            el.classList.add('menu_butt');
            el.classList.add('habbit_butt');
            el.addEventListener('click', () => rerender(habbit.id));
            el.innerHTML = '<img src="./img/Star.svg" alt="">';
            if(activeHabbit.id === habbit.id){
                el.classList.add('menu_butt_active');
            }
            page.menu.appendChild(el);
            continue;
        }

        if(activeHabbit.id === habbit.id){
            existed.classList.add('menu_butt_active');
        } else {
            existed.classList.remove('menu_butt_active');
        }
    }
}

function renderHead(activeHabbit) {
    page.header.h.innerText = activeHabbit.name;
    page.header.prog_days.innerText = `${activeHabbit.days.length} из ${activeHabbit.target}`;
}

function rerenderDays(activeHabbit) {
    page.content.days_box.innerHTML = '';

    for(const day in activeHabbit.days){
        const el = document.createElement('div');
        el.classList.add('day');
        el.innerHTML = `<div class="day_h">
                    <h3>День ${Number(day) + 1}</h3>
                    <button class="del_butt">
                        <img src="./img/delete.svg" alt="">
                    </button>
                </div>
                <hr>
                <div class="day_comm">
                    ${activeHabbit.days[day].comment}
                </div>`;
        
        page.content.days_box.appendChild(el);
    }
    
    const el = document.createElement('div');
    el.classList.add('day');
    el.innerHTML = `<div class="day_h">
                    <h3 class="next_day">День ${activeHabbit.days.length + 1}</h3>
                    <button class="del_butt">
                        <img src="./img/delete.svg" alt="">
                    </button>
                </div>
                <hr>
                <div class="day_comm">
                    <textarea name="comment" id="comm" placeholder="..." maxlength="250"></textarea>
                    <button id="add_day">Добавить день</button>
                </div>`;
    
    page.content.days_box.appendChild(el);

}

function rerender(activeHabbitId) {
    const activeHabbit = habbits.find(habbit => habbit.id === activeHabbitId);
    if(!activeHabbit) return;

    rerenderMenu(activeHabbit);
    renderHead(activeHabbit);
    rerenderDays(activeHabbit);
}

(() => {
    loadData();
    rerender(habbits[0].id)
})();