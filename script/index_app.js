'use strict'

let habbits = [];
const HABBIT_KEY = 'HABBIT_KEY'

const page = {
    menu: document.querySelector('.menu'),
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
    if(!activeHabbit) return;

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

function rerender(activeHabbitId) {
    const activeHabbit = habbits.find(habbit => habbit.id === activeHabbitId);
    rerenderMenu(activeHabbit);
}

(() => {
    loadData();
    rerender(habbits[0].id)
})();