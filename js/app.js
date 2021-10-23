const navOptions = document.querySelector('.card-profile__options');
const cards = document.querySelectorAll('.card-stats');

(() => {
    document.addEventListener('DOMContentLoaded', ()=> {
        const url = '../data.json';
        
        fetch(url)
            .then(result => result.json())
            .then(data => {
                navOptions.addEventListener('click', (evt) => {
                    evt.preventDefault();

                    if(evt.target.tagName === "A")
                        fillCards(data, evt.target.id);
                });
            });
    });

    function fillCards(data, id) {
        navOptions.querySelectorAll('.card-profile__option').forEach(option => {
            if(option.id === id)
                option.classList.add('card-profile__option--selected');
            else
                option.classList.remove('card-profile__option--selected');
        });

        cards.forEach(card => {
            data.forEach(entry => {
                const { title, 'timeframes': { [id]: hours } } = entry;
                if(card.getAttribute('data-category') === title) {
                    card.querySelector('.card-stats__info-hour').textContent = `${hours.current}hrs`;
                    if(id === 'daily')
                        card.querySelector('.card-stats__info-previous-hour').textContent = `Yesterday - ${hours.previous}hrs`;
                    else
                        card.querySelector('.card-stats__info-previous-hour').textContent = `Last ${id} - ${hours.previous}hrs`;
                }
            });
        });
    }

})();