// grab canvas
const canvas = document.querySelector('#etch-a-sketch')
// grab context
const ctx = canvas.getContext('2d')
// grab button
const shakeButton = document.querySelector('.shake-btn')

// amount the line will be drawn by on the screen.
const MOVE_AMOUNT = 10

// default settings for the canvas.
ctx.lineJoin = 'round'
ctx.lineCap = 'round' // determines shape of the starting point in context.
ctx.lineWidth = 10

const { width, height } = canvas
let x = Math.floor(Math.random() * width)
let y = Math.floor(Math.random() * height)

ctx.beginPath()
ctx.moveTo(x, y)
ctx.lineTo(x, y)
ctx.stroke()

let hue = 0
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`

// draw function to handle multiple options
// destructure directly and log it.
function draw({ key }) {
  hue += 1
  ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`

  console.log(key)
  // start path
  ctx.beginPath()
  ctx.moveTo(x, y)

  switch(key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT
      break;
    default: 
      break;
  }

  ctx.lineTo(x, y)
  ctx.stroke()
}

// function to work with arrow keys only.
const handleKey = (e) => {
  e.preventDefault()
  if(e.key.includes('Arrow')){
    // { key: e.key }
    draw(e)
  }
}

// function to shake/clear the canvas
const clearCanvas = () => {
  canvas.classList.add('shake');
  // clear the entire context starting from the top-left corner.
  ctx.clearRect(0, 0, width, height)
  canvas.addEventListener('animationend', () => {
    canvas.classList.remove('shake');
  }, 
  { once: true }
  )
}

shakeButton.addEventListener('click', clearCanvas)
window.addEventListener('keydown', handleKey)