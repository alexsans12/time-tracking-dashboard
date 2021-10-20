const dailyBtn = document.querySelector('#daily');
const weeklyBtn = document.querySelector('#weekly');
const monthlyBtn = document.querySelector('#monthly');

(() => {
    document.addEventListener('DOMContentLoaded', ()=> {
        const url = '../data.json';
        
        fetch(url)
            .then(result => result.json())
            .then(data => {
                dailyBtn.addEventListener('click', () => fillCards(data, dailyBtn.id));
                weeklyBtn.addEventListener('click', () => fillCards(data, weeklyBtn.id));
                monthlyBtn.addEventListener('click', () => fillCards(data, monthlyBtn.id));
            });
    });

    function fillCards(data, id) {
        document.querySelectorAll('.card-profile__option').forEach(option => {
            if(option.id === id)
                option.classList.add('card-profile__option--selected');
            else
                option.classList.remove('card-profile__option--selected');
        });

        const cards = document.querySelectorAll('.card-stats');
        cards.forEach(card => {
            data.forEach(entry => {
                const { title, 'timeframes': { [id]: hours } } = entry;
                if(card.getAttribute('data-category') === title) {
                    card.querySelector('.card-stats__info-hour').textContent = `${hours.current}hrs`;
                    card.querySelector('.card-stats__info-previous-hour').textContent = `Last ${id} - ${hours.previous}hrs`;
                }
            });
        });
    }

})();