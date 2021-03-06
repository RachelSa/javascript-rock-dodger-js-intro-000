/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);
  if (top > 360) {

    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge
      || rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge
      || rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge
      ) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

    rock.className = 'rock'
    rock.style.left = `${x}px`

    // Hmmm, why would we have used `var` here?
    var top = 0

    rock.style.top = top

    GAME.append(rock)

    /**
     * Now that we have a rock, we'll need to append
     * it to GAME and move it downwards.
     */


    /**
     * This function moves the rock. (2 pixels at a time
     * seems like a good pace.)
     */
    function moveRock() {
      if (checkCollision(rock)){
        endGame()
      }
      else if (top < 400) {
        rock.style.top = `${top += 2}px`
        window.requestAnimationFrame(moveRock)
      }
      else {
         rock.remove()
      }  
      
  
      /**
       * If a rock collides with the DODGER,
       * we should call endGame()
       */
      /**
       * Otherwise, if the rock hasn't reached the bottom of
       * the GAME, we want to move it again.
       */
      /**
       * But if the rock *has* reached the bottom of the GAME,
       * we should remove the rock from the DOM
       */
    }

    // We should kick of the animation of the rock around here
window.requestAnimationFrame(moveRock)
    // Add the rock to ROCKS so that we can remove all rocks
    // when there's a collision
    ROCKS.push(rock)

    // Finally, return the rock element you've created
    return rock
  }
/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
clearInterval(gameInterval);

for (i = 0; i < ROCKS.length; i++)
    {ROCKS[i].remove()};

document.removeEventListener('keydown', moveDodger);

window.alert("YOU LOSE!");
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    window.moveDodgerLeft();
  }
  if (e.which === RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    window.moveDodgerRight();
    }
}

function moveDodgerLeft() {
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)

  function step() {
    if (left > 0) {
      dodger.style.left = `${left -= 4}px`
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)

}


function moveDodgerRight() {
  var rightNumbers = dodger.style.left.replace('px', '')
  var right = parseInt(rightNumbers, 10)

  function step(){
    if (right < 360) {
      dodger.style.left = `${right += 4}px`
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)

  }

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000)
}
