const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link')

  const getData = () => {
    // fetch('/db/db.json')
    fetch('https://glotest-7ccb9-default-rtdb.firebaseio.com/ds.json')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        localStorage.setItem('goods', JSON.stringify(data))

      })
  }

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      getData()
    })
  })


  // console.log(JSON.parse(localStorage.getItem('goods')))
}

getGoods()