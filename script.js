let sequence = [];
let playerSequence = [];
let strictMode = false;
let buttonSounds = [
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
];
let buttons = Array.from(document.querySelectorAll('.simon-btn'));
let startButton = document.getElementById('start');
let strictButton = document.getElementById('strict');
let stepCounter = document.getElementById('step-counter');

function newGame() {
  sequence = [];
  playerSequence = [];
  addStep();
}

function addStep() {
  sequence.push(Math.floor(Math.random() * 4));
  stepCounter.innerText = sequence.length;
  playSequence();
}

function playSequence() {
  for(let i = 0; i < sequence.length; i++) {
    setTimeout(() => {
      buttonSounds[sequence[i]].play();
      buttons[sequence[i]].classList.add('active');
      setTimeout(() => buttons[sequence[i]].classList.remove('active'), 200);
    }, i * 600);
  }
}

startButton.addEventListener('click', newGame);
strictButton.addEventListener('click', () => {
  strictMode = !strictMode;
  strictButton.innerText = strictMode ? 'Modo Estricto: ON' : 'Modo Estricto: OFF';
});
buttons.forEach((button, i) => {
  button.addEventListener('click', () => {
    buttonSounds[i].play();
    playerSequence.push(i);
    checkSequence();
  });
});

function checkSequence() {
  for(let i = 0; i < playerSequence.length; i++) {
    if(playerSequence[i] !== sequence[i]) {
      alert('Secuencia incorrecta!');
      playerSequence = [];
      if (strictMode) {
        newGame();
      } else {
        playSequence();
      }
      return;
    }
  }
  if(playerSequence.length === sequence.length) {
    if (sequence.length === 20) {
      alert('¡Has ganado!');
      newGame();
    } else {
      playerSequence = [];
      addStep();
    }
  }
}
