const cart = function (params) {
  const cartBtn = document.querySelector('.button-cart')
  const cart = document.querySelector('#modal-cart')
  const closeBtn = cart.querySelector('.modal-close')
  const goodsContainer = document.querySelector('.long-goods-list')
  const cartTable = document.querySelector('.cart-table__goods')
  const modalForm = document.querySelector('.modal-form')

  const clientName = document.getElementsByName('nameCustomer')
  const clientPhone = document.getElementsByName('phoneCustomer')


  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem('goods'))
    const clickedGood = goods.find(good => good.id === id)
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

    if (cart.some(good => good.id === clickedGood.id)) {

      cart.map(good => {
        if (good.id === clickedGood.id) {
          good.count++
        }
        return good
      })
    } else {
      clickedGood.count = 1
      cart.push(clickedGood)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    const newCart = cart.filter(good => {
      return good.id != id
    })
    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGoods(JSON.parse(localStorage.getItem('cart')))
  }
  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    const newCart = cart.map(good => {
      if (good.id === id) {
        good.count++
      }
      return good
    })

    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGoods(JSON.parse(localStorage.getItem('cart')))
  }
  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    const newCart = cart.map(good => {
      if (good.id === id) {
        if (good.count > 0) {
          good.count--
        }
      }
      return good
    })

    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGoods(JSON.parse(localStorage.getItem('cart')))
  }

  const renderCartGoods = (goods) => {
    cartTable.innerHTML = ''
    goods.forEach(good => {
      const tr = document.createElement('tr')
      tr.innerHTML = `
        <td>${good.name}</td>
        <td>${good.price}$</td>
        <td><button class="cart-btn-minus"">-</button></td>
        <td>${good.count}</td>
        <td><button class=" cart-btn-plus"">+</button></td>
        <td>${+good.price * +good.count}</td>
        <td><button class="cart-btn-delete"">x</button></td>
      `

      cartTable.append(tr)

      tr.addEventListener('click', (e) => {
        console.log(e.target);
        if (e.target.classList.contains('cart-btn-minus')) {
          minusCartItem(good.id)
        } else if (e.target.classList.contains('cart-btn-plus')) {
          plusCartItem(good.id)
        } else if (e.target.classList.contains('cart-btn-delete')) {
          deleteCartItem(good.id)
        }

      })
    });
  }

  const sendForm = () => {
    const cart = localStorage.getItem('cart') ?
      JSON.parse(localStorage.getItem('cart')) : []
    //можно будет отправлять в Телеграм как я раньше делал с помощью fetch или зарегистрировать свой json placeholder и грузить туда
    //============================================================================================================
    //============================================================================================================
    console.log(cart)
    console.log(clientName[0].value);
    console.log(clientPhone[0].value);

    //============================================================================================================
    //============================================================================================================
    //============================================================================================================


    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   body: cart
    // })
  }


  modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendForm()
  })

  cartBtn.addEventListener('click', (event) => {
    const cartArray = localStorage.getItem('cart') ?
      JSON.parse(localStorage.getItem('cart')) : []
    cart.style.display = 'flex'
    renderCartGoods(cartArray)

  })

  closeBtn.addEventListener('click', (event) => {
    cart.style.display = ''
  })

  cart.addEventListener('click', (event) => {
    if (!event.target.closest('.modal') && event.target.classList.contains('overlay')) {
      cart.style.display = ''
    }

  }
  )

  if (goodsContainer) {
    goodsContainer.addEventListener('click', (event) => {
      if (event.target.closest('.add-to-cart')) {
        const buttonToCart = event.target.closest('.add-to-cart')
        const goodId = buttonToCart.dataset.id
        const goods = JSON.parse(localStorage.getItem('goods'))

        addToCart(goodId)

      }
    })
  }
}



cart()