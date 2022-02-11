// selects the first card and adds an on-click function, when the user clicks, the card is flipped
const card = document.querySelector('.card__inner');

card.addEventListener('click', function () {
    card.classList.toggle('is-flipped');
});

// selects the second card and adds an on-click function, when the user clicks, the card is flipped
const card2 = document.querySelector('.card__inner-2');

card2.addEventListener('click', function () {
    card2.classList.toggle('is-flipped');
});

// selects the third card and adds an on-click function, when the user clicks, the card is flipped
const card3 = document.querySelector('.card__inner-3');

card3.addEventListener('click', function () {
    card3.classList.toggle('is-flipped');
});

// selects the fourth card and adds an on-click function, when the user clicks, the card is flipped
const card4 = document.querySelector('.card__inner-4');

card4.addEventListener('click', function () {
    card4.classList.toggle('is-flipped');
});

// selects the fifth card and adds an on-click function, when the user clicks, the card is flipped
const card5 = document.querySelector('.card__inner-5');

card5.addEventListener('click', function () {
    card5.classList.toggle('is-flipped');
});

// selects the sixth card and adds an on-click function, when the user clicks, the card is flipped
const card6 = document.querySelector('.card__inner-6');

card6.addEventListener('click', function () {
    card6.classList.toggle('is-flipped');
});

// triggers a dropdown menu
$('.dropdown-trigger').dropdown();