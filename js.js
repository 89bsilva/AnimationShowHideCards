document.addEventListener("DOMContentLoaded", () => {
   handleButtonClicks()
   state.cardList = document.querySelectorAll('.card')
   start()
})

const handleButtonClicks = () => {
   const buttons = {
      toggle: document.querySelector('.controls button#toggle'),
      play: document.querySelector('.controls button#play'),
      pause: document.querySelector('.controls button#pause'),
      stop: document.querySelector('.controls button#stop'),
   }
   const buttonsToAnimate = []

   Object.entries(buttons).forEach(([name, element]) => {
      if(element) {
         buttonsToAnimate.push(element)
         buttons[name].addEventListener('click', buttonsActions[name])
      }
   })

   animateClick(buttonsToAnimate)
}

const animateClick = (buttons) => {
   buttons.forEach(button => {
      button.addEventListener('click', () => {
         button.classList.toggle('click-animation')
         setTimeout(() => button.classList.toggle('click-animation'), 300)
      })
   })
}

const state = {
   current: 0,
   direction: 'forward',
   cardList: [],
   timeoutIDs: []
}

const buttonsActions = {
   stop() {
      clearTimeouts()
      showHideBtn('play', 'pause')
      document.querySelectorAll('.card.show').forEach(e => e.classList.remove('show'))
      state.direction = 'forward'
   },
   play() {
      showHideBtn('pause', 'play') 
      start()
   },
   pause() {
      showHideBtn('play', 'pause') 
      clearTimeouts()
   },
   toggle() {
      if(document.querySelectorAll('.card.show').length) {
         state.direction = state.direction === 'forward' ? 'back' : 'forward'
      } else {
         state.direction = 'forward'
      }

      clearTimeouts()
      showHideBtn('pause', 'play')
      start()
   }
}


const showHideBtn = (show = 'pause', hide = 'play') => {
   document.querySelector(`#${show}`).style.display = ''
   document.querySelector(`#${hide}`).style.display = 'none'
}

const select = {
   forward() {
      return document.querySelectorAll('.card:not(.show)')
   },
   back() {
      return [].slice.call(document.querySelectorAll('.card.show')).reverse()
   }
}

const start = () => {
   clearTimeouts()
   showHideBtn('pause', 'play')
   let loop = 1
   state.cardList = select[state.direction]()
   state.cardList.forEach(e => {
      state.timeoutIDs.push(
         setTimeout(
            () => {
               e.classList.toggle('show')
            }, 500 * loop
         )
      )
      if(loop === state.cardList.length) {
         state.timeoutIDs.push(
            setTimeout(
               () => {
                  state.direction = state.direction === 'forward' ? 'back' : 'forward'
                  showHideBtn('play', 'pause')
               }, 501 * loop
            )
         )
      }
      loop++
   })
}

const clearTimeouts = () => {
   state.timeoutIDs.forEach(id => clearTimeout(id))
   state.timeoutIDs = []
}
