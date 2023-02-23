const slider = document.querySelector('.front-slider__slides')
const slides = slider.querySelectorAll('.front-slider__slide')

const nav = document.querySelector('.front-slider__nav')

const btnNext = document.querySelector('.front-slider__btn-next')
const btnPrev = document.querySelector('.front-slider__btn-prev')

const navActiveClass = 'front-slider__nav-item--active'
const items = []
const navItems = []

for (let i = 0; i < slides.length; ++i) {
  items.push(slides[i])
  slides[i].remove()

  const newNavItem = document.createElement('div');
  newNavItem.classList.add('front-slider__nav-item')
  if ( i === 0 ) newNavItem.classList.add(navActiveClass)
  navItems.push(newNavItem)
  nav.appendChild(newNavItem)
}

let index = 0
let currentSlide = slider.appendChild(items[index])

btnNext.addEventListener('click', (e) => {
  const lastSlide = currentSlide
  navItems[index].classList.remove(navActiveClass)

  if (index === slides.length - 1  ) index = 0
  else index++

  navItems[index].classList.add(navActiveClass)
  currentSlide = slider.appendChild(items[index])
  lastSlide.remove()

})

btnPrev.addEventListener('click', (e) => {
  const lastSlide = currentSlide
  navItems[index].classList.remove(navActiveClass)

  if (index == 0 ) index = slides.length - 1
  else index--

  navItems[index].classList.add(navActiveClass)
  currentSlide = slider.appendChild(items[index])
  lastSlide.remove()
})



let likedId = []
getFromLocalStorage()

function addCard({img, title, preview, id, liked}, previewLength) {
  const cardHTML = `
  <img class="card__thumb" src="${img}" alt="img">
  <h2 class="card__title">${title}</h2>
  <p class="card__preview">
    ${preview.substr(0, previewLength)}...
  </p>

  <div class="card__actions">
    <a class="card__read-more" href="#">
      Read More
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.23004 9.50791L3.23004 8.17458L11.23 8.17458L7.56337 4.50791L8.51004 3.56125L13.79 8.84125L8.51004 14.1212L7.56337 13.1746L11.23 9.50791L3.23004 9.50791Z"/>
      </svg>
    </a>
    <button class="card__like ${likedId.includes(String(id)) ? 'card__like--liked' : ''}">
      <div class="card__like-count">123</div>
      <svg  class="card__like-button" width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.75 6.4648H1.25C0.559766 6.4648 0 7.02456 0 7.67964V16.3945C0 17.0847 0.559766 17.6093 1.25 17.6093H3.75C4.44023 17.6093 5 17.0496 5 16.3945V7.7148C5 7.05855 4.44141 6.4648 3.75 6.4648ZM20 7.86714C20 6.42612 18.8262 5.25308 17.384 5.25308H13.4832C13.8555 4.27729 14.0625 3.43354 14.0625 2.93745C14.0625 1.61714 13.0391 0.250732 11.3258 0.250732C9.50508 0.250732 9.00703 1.51792 8.60664 2.53589C7.36992 5.68042 6.25 5.12925 6.25 6.18706C6.25 6.68862 6.65469 7.12417 7.18828 7.12417C7.39359 7.12417 7.60039 7.05694 7.77305 6.9187C10.7715 4.52144 10.0375 2.12573 11.3258 2.12573C11.9539 2.12573 12.1875 2.62378 12.1875 2.93784C12.1875 3.22706 11.8909 4.48276 11.1895 5.73433C11.1095 5.87675 11.0697 6.03456 11.0697 6.19214C11.0697 6.73589 11.5162 7.09448 12.0072 7.09448H17.3822C17.793 7.12886 18.125 7.46089 18.125 7.86714C18.125 8.2503 17.8216 8.57144 17.4348 8.598C16.9402 8.63156 16.5613 9.04331 16.5613 9.53315C16.5613 10.1375 17.0062 10.1562 17.0062 10.6625C17.0062 11.6535 15.6379 11.1445 15.6379 12.3089C15.6379 12.7472 15.8876 12.8179 15.8876 13.1781C15.8876 14.0632 14.7247 13.7156 14.7247 14.7656C14.7247 14.9419 14.768 14.9984 14.768 15.135C14.768 15.5432 14.4354 15.8752 14.027 15.8752H11.9751C10.9743 15.8752 9.98211 15.5445 9.18211 14.9451L7.75008 13.8705C7.58152 13.7437 7.38406 13.6826 7.18836 13.6826C6.64734 13.6826 6.24969 14.1271 6.24969 14.6216C6.24969 14.9063 6.37906 15.1849 6.62453 15.3689L8.05695 16.4439C9.17969 17.2851 10.5703 17.75 11.9766 17.75H14.0285C15.4086 17.75 16.5426 16.6761 16.6379 15.3203C17.332 14.8425 17.7641 14.0503 17.7641 13.1785C17.7641 13.0595 17.7555 12.9399 17.739 12.8221C18.4359 12.3475 18.8828 11.5495 18.8828 10.6628C18.8828 10.4553 18.8578 10.251 18.8095 10.0518C19.5273 9.55073 20 8.77339 20 7.86714Z"/>
      </svg>

      <svg class="card__liked-button" width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.2422 1.03513C13.2578 1.23826 13.918 2.22654 13.7148 3.24216L13.625 3.68748C13.418 4.73044 13.0352 5.72263 12.5 6.62498H18.125C19.1602 6.62498 20 7.46482 20 8.49998C20 9.48826 19.2383 10.2969 18.2695 10.3711C18.5703 10.7031 18.75 11.1445 18.75 11.625C18.75 12.539 18.0938 13.3008 17.2305 13.4648C17.4023 13.7461 17.5 14.082 17.5 14.4375C17.5 15.2695 16.957 15.9765 16.207 16.2187C16.2344 16.3476 16.25 16.4844 16.25 16.625C16.25 17.6601 15.4102 18.5 14.375 18.5H11.5039C10.7617 18.5 10.0391 18.2812 9.42188 17.8711L7.91797 16.8672C6.875 16.1719 6.25 15 6.25 13.7461V12.25V10.375V9.40232C6.25 8.26169 6.76953 7.18748 7.65625 6.47263L7.94531 6.24216C8.98047 5.41404 9.6875 4.24998 9.94531 2.9531L10.0352 2.50779C10.2383 1.49216 11.2266 0.832007 12.2422 1.03513ZM1.25 7.24998H3.75C4.44141 7.24998 5 7.80857 5 8.49998V17.25C5 17.9414 4.44141 18.5 3.75 18.5H1.25C0.558594 18.5 0 17.9414 0 17.25V8.49998C0 7.80857 0.558594 7.24998 1.25 7.24998Z"/>
      </svg>
    </button>
  </div>`


  const card = document.createElement('article')
  card.setAttribute("id", id);
  card.classList.add(...['blog-post__card', 'card'])
  card.insertAdjacentHTML('afterbegin', cardHTML)
  const blog = document.querySelector('#blog')
  blog.insertBefore(card, blog.firstChild)
}

const cards = [
  {
    id: 0,
    img: "./img/card.png",
    title: 'Rover raised $65 million',
    preview: 'Finding temporary housing for your dog should be as easy as renting an Airbnb. That’s the idea behind Rover'
  },
  {
    id: 1,
    img: "./img/card.png",
    title: 'MateLabs machine learning',
    preview: 'If you’ve ever wanted to train a machine learning model and integrate it with IFTTT, you now can with'
  },
  {
    id: 2,
    img: "./img/card.png",
    title: 'MateLabs machine learning',
    preview: 'If you’ve ever wanted to train a machine learning model and integrate it with IFTTT, you now can with'
  }
]
cards.forEach(e => {
  addCard(e, 50)
})


document.querySelectorAll('.card__like')
  .forEach(el => el.addEventListener('click', (e) => {
    e.target.closest('.card__like').classList.toggle('card__like--liked')
    const id = e.target.closest('.blog-post__card').id

    if (likedId.includes(id)) likedId = likedId.filter(el => el !== id)
    else likedId.push(id)

    setLocalStorage(likedId)
  }))

function setLocalStorage (arr) {
  localStorage.setItem('likedItems', JSON.stringify(arr));
}

function getFromLocalStorage() {
  likedId = JSON.parse(localStorage.getItem('likedItems'))
}

const form = document.querySelector('#subscribe-form')
const email = document.querySelector('#email-input')
const code = document.querySelector('#code-input')
const formError = document.querySelector('#form-error')
const message = document.querySelector('#modal-message')

let emailStatus = false
let codeStatus = false

email.addEventListener('input', (e) => {
  formError.innerHTML = ''
  emailStatus = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value.toLowerCase())
})

code.addEventListener('input', (e) => {
  formError.innerHTML = ''

  const value = e.target.value
  codeStatus = value.length === 5
  &&
  value.split().reduce((acc, letter) => {
    return acc && letter.toUpperCase() === letter
  }, true)
  &&
  /^[a-zA-Z\u00C0-\u00ff]+$/.test(value)
})

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (codeStatus, emailStatus) {

    for (var pair of new FormData(form).entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }
    showModal()
    showMessage('Отправка...')
    fetch('http://someaddress.ru', {
      method: "POST",
      payload: new FormData(form)
    })
      .then(res => res.json())
      .then(response => {
        showMessage('Успешно отправлено')
      })
      .catch(e => {
        console.error(e)
        showMessage('Не отправлено')
      })
  } else {
    formError.innerHTML = 'У вас ошибка в форме'
  }
})

const overlay = document.querySelector('.modal-bg')

overlay.addEventListener('click', () => {
  overlay.classList.add('hide')
})

function showModal() {
  overlay.classList.remove('hide')
}

function showMessage(msg) {
  message.innerHTML = msg
}
