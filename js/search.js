const search = function () {
  const input = document.querySelector('.search-block > input')
  const inputBtn = document.querySelector('.search-block > button')

  input.addEventListener('input', (event) => {
    console.log(event.target.value);
  })
}

search()