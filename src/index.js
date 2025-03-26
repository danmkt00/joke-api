import data from './data.js';
import getJoke from './utils/get-joke.js';

//dom
const dom = {
    displayJoke: document.getElementById('display'),
    getJokeButton: document.getElementById('get-joke'),
    categoriesContainer: document.querySelector('.categories-container'),
    blacklistContainer: document.querySelector('.blacklist-container')
};

//component funcs
const createCategories = () => {
    data.categories.forEach((category) => {
        //create a checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList = 'check-categories';
        checkbox.id = category;
        checkbox.name = category;

        //create a label
        const label = document.createElement('label');
        label.setAttribute('for', category);
        label.textContent = `${category}`;

        //make an event to update data
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                data.checkedCategories.push(category);
            } else {
                const index = data.checkedCategories.indexOf(category);
                if (index > -1) {
                    data.checkedCategories.splice(index, 1);
                }
            }
        });

        //append to dom
        dom.categoriesContainer.append(checkbox, label);
    });
};

const createBlackList = () => {
    data.blacklist.forEach((category) => {
        //create a checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList = 'check-blacklist';
        checkbox.id = category;
        checkbox.name = category;

        //create a label
        const label = document.createElement('label');
        label.setAttribute('for', category);
        label.textContent = `${category}`;

        //make an event to update data
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                data.checkedBlacklist.push(category);
            } else {
                const index = data.checkedBlacklist.indexOf(category);
                if (index > -1) {
                    data.checkedBlacklist.splice(index, 1);
                }
            }
        });

        //append to dom
        dom.blacklistContainer.append(checkbox, label);
    });
};

//events
window.addEventListener('load', async () => {
    const joke = await getJoke();
    dom.displayJoke.innerText = joke;
    createCategories();
    createBlackList();
});

dom.getJokeButton.addEventListener('click', async () => {
    const joke = await getJoke(data.checkedCategories, data.checkedBlacklist);
    dom.displayJoke.innerText = joke;
});
