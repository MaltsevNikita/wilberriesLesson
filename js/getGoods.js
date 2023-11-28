const getGoods = () => {
  fetch('https://glotest-7ccb9-default-rtdb.firebaseio.com/ds.json')
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);
    })
}
getGoods()