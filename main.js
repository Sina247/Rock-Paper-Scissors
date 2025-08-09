const choices = ['rock', 'paper', 'scissors'];
const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
const playerChoiceEl = document.getElementById('playerChoice');
const computerChoiceEl = document.getElementById('computerChoice');
const resultEl = document.getElementById('result');
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const resetBtn = document.getElementById('resetBtn');

let playerScore = 0, computerScore = 0;
const winTarget = 3;

function emojiFor(c) {
  return c === 'rock' ? '🪨 Rock' : c === 'paper' ? '📄 Paper' : '✂️ Scissors';
}

function computerPick() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(player) {
  if (playerScore >= winTarget || computerScore >= winTarget) return;

  const comp = computerPick();
  playerChoiceEl.textContent = emojiFor(player);
  computerChoiceEl.textContent = emojiFor(comp);

  if (player === comp) {
    resultEl.textContent = "It's a tie!";
  }

  else if (beats[player] === comp) {
    playerScore++;
    resultEl.textContent = 'You win this round!';
  }

  else {
    computerScore++;
    resultEl.textContent = 'Computer wins this round.';
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  if (playerScore >= winTarget || computerScore >= winTarget) {
    setTimeout(() => {
      const winner = playerScore > computerScore ? 'You won the match 🎉' : 'Computer won the match 🤖';
      resultEl.textContent = winner;
    }, 300);
  }
}

document.querySelectorAll('.choice-btn').forEach(btn => {
  btn.addEventListener('click', () => playRound(btn.dataset.choice));
});

resetBtn.addEventListener('click', () => {
  playerScore = 0; computerScore = 0;
  playerScoreEl.textContent = '0';
  computerScoreEl.textContent = '0';
  playerChoiceEl.textContent = '—';
  computerChoiceEl.textContent = '—';
  resultEl.textContent = 'Make your move';
});

window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (key === 'r') playRound('rock');
  if (key === 'p') playRound('paper');
  if (key === 's') playRound('scissors');
});