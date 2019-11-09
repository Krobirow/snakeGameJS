
const keyA = document.createElement('button'),
    keyW = document.createElement('button'),
    keyD = document.createElement('button'),
    keyS = document.createElement('button');

keyA.classList.add('btnL');
keyW.classList.add('btnU');
keyD.classList.add('btnR');
keyS.classList.add('btnD');

keyA.innerText = "left";
keyW.innerText = "up";
keyD.innerText = "right";
keyS.innerText = "down";

let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');
field.appendChild(keyA);
field.appendChild(keyW);
field.appendChild(keyD);
field.appendChild(keyS);

for (let i = 1; i < 401; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1,
    y = 20;

for ( let i=0; i<excel.length; i++) {
    if (x>20) {
        x=1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
}

function generateSnake() {
    let posX = Math.round(Math.random() * (20 - 3) + 3);
    let posY = Math.round(Math.random() * (20 - 1) + 1);
    return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
                document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'),
                document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')];

for (let i = 0; i<snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');

let fruit;

function createFruit() {
    function generateFruit() {
        let posX = Math.round(Math.random() * (20 - 1) + 1);
        let posY = Math.round(Math.random() * (20 - 1) + 1);
        return [posX, posY];
    }

    let fruitCoordinates = generateFruit();
    fruit = document.querySelector('[posX = "' + fruitCoordinates[0] + '"][posY = "' + fruitCoordinates[1] + '"]');


    while(fruit.classList.contains('snakeBody')) {
        let fruitCoordinates = generateFruit();
        fruit = document.querySelector('[posX = "' + fruitCoordinates[0] + '"][posY = "' + fruitCoordinates[1] + '"]');    
    }

    fruit.classList.add('fruit');
}
createFruit();

let direction = 'right';
let steps = false;

let instruction = document.createElement('p');
document.body.appendChild(instruction);
instruction.classList.add('instruction');
instruction.innerHTML = ' <br> For new game - refresh page! <br> You can control snake by this keys:<br> W - Up <br> A - Left <br> D - Right <br> S - Down';

let input = document.createElement('input');
document.body.appendChild(input);


input.readOnly = true;
input.style.cssText = `
    position: relative;
    margin: auto;
    font-size: 30px;
    display: flex
`;

input.style.top = field.offsetHeight + 10 + 'px';


// if (document.body.style.width = '900px') {
//     input.style.top = field.offsetHeight - 980 + 'px';
// } else if (document.body.style.width >= '901px') {
//     input.style.top = field.offsetHeight + 10 + 'px';
// }

let score = 0;
let intervalId = 0;
let interval = 400;
input.value = `Your score: ${score}`;

function move() {
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody.pop();

    if ( direction == 'right') {
        if (snakeCoordinates[0] < 20) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if ( direction == 'left') {
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "20"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if ( direction == 'up') {
        if (snakeCoordinates[1] < 20) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
        }
    } else if ( direction == 'down') {
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (snakeCoordinates[1] - 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "20"]'));
        }
    }

    if (snakeBody[0].getAttribute('posX') == fruit.getAttribute('posX') && snakeBody[0].getAttribute('posY') == fruit.getAttribute('posY')) {
        fruit.classList.remove('fruit');
        let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
        let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createFruit();
        score++;
        
        if (score >= 3 && score <= 5) {
            interval = 300;
        } else if (score >= 6 && score <= 15) { 
            interval = 200;
        } else if (score >= 16 && score <= 35) { 
            interval = 100;
        } else if (score >= 36) { 
            interval = 50;
        }

        clearInterval(intervalId);
        intervalId = setInterval(move, interval);
        input.value = `Your score: ${score}`;
    }

    console.log(interval);
    if ( snakeBody[0].classList.contains('snakeBody')) {
        
        setTimeout(() => {
            alert(`Game Over! Your score: ${score}`);
        }, 50);
        
        clearInterval(interval);
        clearInterval(intervalId);
        snakeBody[0].classList.add('head-death');
    }

    snakeBody[0].classList.add('head');
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }
    steps = true;
}

intervalId = setInterval(move, interval);
clearInterval(interval);

window.addEventListener('keydown', function(e){
    if (steps == true) {
        if (e.keyCode == 65 && direction != 'right') {
            direction = 'left';
            steps = false;
        }
        if (e.keyCode == 87 && direction != 'down') {
            direction = 'up';
            steps = false;
        }
        if (e.keyCode == 68 && direction != 'left') {
            direction = 'right';
            steps = false;
        }
        if (e.keyCode == 83 && direction != 'up') {
            direction = 'down';
            steps = false;
        }
    }
});

keyA.addEventListener('click', function(e){
    if (steps == true) {
        if (keyA && direction != 'right') {
            direction = 'left';
            steps = false;
        }
    }
});

keyW.addEventListener('click', function(e){
    if (steps == true) {
        if (keyW && direction != 'down') {
            direction = 'up';
            steps = false;
        }
    }
});

keyD.addEventListener('click', function(e){
    if (steps == true) {
        if (keyD && direction != 'left') {
            direction = 'right';
            steps = false;
        }
    }
});

keyS.addEventListener('click', function(e){
    if (steps == true) {
        if (keyS && direction != 'up') {
            direction = 'down';
            steps = false;
        }
    }
});






