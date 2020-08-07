let $input = document.querySelector('#query');
let $list = document.querySelector('.drop-list');
let $form = document.querySelector('.form');

let charcters = [];

function updateList(list) {
    let template = '';

    if (list.length < 1) {
        template = 'Not found';
    } else {
        for (let i = 0; i < list.length; i++) {
            template += '<li>' + list[i].name + '</li>';
        }
    }

    $list.innerHTML = template;
}

fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(function (responce) {
        return responce.json();
    })
    .then(function (data) {
        charcters = data.results;
        updateList(charcters);
    });

$input.addEventListener('input', function () {
    let query = $input.value.toLowerCase();
    let buffer = charcters;

    buffer = buffer.filter(function (character) {
        return ~character.name.toLowerCase().indexOf(query);
    });

    updateList(buffer);
});

$input.addEventListener('focus', function () {
    $form.classList.add('active');
});

$input.addEventListener('blur', function () {
    $form.classList.remove('active');
});

$list.addEventListener('click', function (event) {
    $input.value = event.target.innerText;
});
