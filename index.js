const url = 'https://significado.herokuapp.com/v2/'

const inputText = document.querySelector('.input-text')
const btnText = document.querySelector('.btn-search')
const result = document.querySelector('.container-result')

btnText.addEventListener('click', searchWord)

function searchWord() {
  let word = inputText.value
  if (word.length === 0) {
    result.innerHTML = `<p class="error">
      <i class='bx bxs-error-alt'></i> Campo obrigatório! - Digite uma palavra
    </p>`
  } else {
    fetch(`${url}${word}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        result.innerHTML = ` 
          <div class="title-result">
            <h4>${word}</h4>
            <span>${data[0].partOfSpeech}</span>
          </div>
          <div class = 'etymology'>
          <h6> ${data[0].etymology}</h6>
          </div>
          <div class="meanings">
          <h5>Significado</h5>
          <p class="description">
            <span>1. </span>
            ${data[0].meanings[0]}
          </p>
          <p class="description"><span>2. </span>${data[0].meanings[1]}</p>
          </div>`
      })
      .catch(() => {
        result.innerHTML = `<p class="warning">
          <i class='bx bxs-error' ></i> Não foi possível obter informações da palavra
    </p>`
      })
  }
}

// Action button Enter
document.addEventListener(
  'keypress',
  e => {
    if (e.key === 'Enter') {
      searchWord()
    }
  },
  false
)
