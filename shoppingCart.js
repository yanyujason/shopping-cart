function showAlbum(product, row) {
  var nameCell = document.createElement('td');
  var imgBlock = document.createElement('img');
  var nameBlock = document.createElement('span');

  imgBlock.src = product.album;
  nameBlock.innerHTML = product.name;
  nameBlock.setAttribute('class', 'album-name');
  nameCell.appendChild(nameBlock);
  nameCell.appendChild(imgBlock);
  row.appendChild(nameCell);
}

function showPrice(product, row) {
  var priceCell = document.createElement('td');
  priceCell.innerHTML = product.price;
  row.appendChild(priceCell);
}

function calculateProductQuantity(product, row) {
  var countCell = document.createElement('td');
  var countDiv = document.createElement('div');
  var reduceBtn = document.createElement('span');
  reduceBtn.setAttribute('class', 'button');
  reduceBtn.innerHTML = '-';

  reduceBtn.addEventListener('click', function () {
    reduce(count, row);
    subtotal(product, count, row, true);
    calculateTotalPrice();
  });

  var count = document.createElement('input');
  count.setAttribute('class', 'count');
  count.setAttribute('type', 'text');
  count.setAttribute('value', product.count);
  var addBtn = document.createElement('span');
  addBtn.setAttribute('class', 'button');
  addBtn.innerHTML = '+';
  countDiv.appendChild(reduceBtn);
  countDiv.appendChild(count);
  countDiv.appendChild(addBtn);
  countCell.appendChild(countDiv);
  row.appendChild(countCell);

  addBtn.addEventListener('click', function () {
    add(count);
    subtotal(product, count, row, true);
    calculateTotalPrice();
  });

  return count;
}

function reduce(count, row) {
  count.value--;
  if (count.value <= 0) {
    row.parentNode.removeChild(row);
  }
}

function add(count) {
  count.value++;
}

function subtotal(product, count, row, hasCalculated = false) {
  var subtotalCell = document.createElement('td');

  if(hasCalculated) {
    row.removeChild(row.lastChild);
  }
  row.appendChild(subtotalCell);
  subtotalCell.innerHTML = product.price * count.value;
}

function selectProduct(product, row) {
  var checkCell = document.createElement('td');
  var checkBox = document.createElement('input');

  checkBox.setAttribute('class', 'check-box');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.setAttribute('id', product.id);
  checkBox.checked = product.checked;
  checkCell.appendChild(checkBox);
  row.appendChild(checkCell);

  checkBox.addEventListener('click', calculateTotalPrice);
}

function createProductInCart(product) {
  var row = document.createElement('tr');
  selectProduct(product, row);

  showAlbum(product, row);
  showPrice(product, row);
  var count = calculateProductQuantity(product, row);
  subtotal(product, count, row);

  return row;
}

function appendCartProduct(product) {
  document
    .getElementById('shopping-cart-products')
    .appendChild(createProductInCart(product));
}

function loadShoppingCartData() {
  var cartProducts = [
    {
      "id": 1,
      "name": "Jay",
      "count": 1,
      "price": 148,
      "checked": false,
      "album": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576648543658&di=ca78227fb8c719c8466f9d582bb799ba&imgtype=0&src=http%3A%2F%2Fpic2.zhimg.com%2F35ca0077ad7a5c84b32aa26f85987015_b.jpg"
    },
    {
      "id": 2,
      "name": "范特西",
      "count": 2,
      "price": 150.5,
      "checked": true,
      "album": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577243710&di=9c33922a4dcdc56a076bebae0ecf44d2&imgtype=jpg&er=1&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F66fbbd08tw1e6otwifyfvj215419zty8.jpg"
    },
    {
      "id": 3,
      "name": "七里香",
      "count": 1,
      "price": 149,
      "checked": false,
      "album": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576649152727&di=08fcb1ece948c5f20169febf89ddab35&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Faec379310a55b3197e67d17043a98226cffc171c.jpg"
    },
    {
      "id": 4,
      "name": "十一月的肖邦",
      "count": 1,
      "price": 155,
      "checked": false,
      "album": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576649315234&di=bd22f4bd36292943aac835570edc77fa&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fd0c8a786c9177f3eb1dd2fd870cf3bc79e3d567e.jpg"
    },
    {
      "id": 5,
      "name": "魔杰座",
      "count": 1,
      "price": 136,
      "checked": true,
      "album": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576650753209&di=0d7d8db71bf6f6e7b95a2d01ae7de36f&imgtype=jpg&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170118%2F91e11bfa61424679a0bfa8b1abb2c193_th.jpeg"
    },
    {
      "id": 6,
      "name": "哎哟，不错哦",
      "count": 5,
      "price": 148.5,
      "checked": false,
      "album": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576650929346&di=87a26e9055a9962b2cfd850ab1a23b45&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201501%2F02%2F20150102130729_UGm2U.jpeg"
    }
  ];

  cartProducts.forEach(appendCartProduct);
}

function calculateTotalPrice() {
  var totalPriceDOM = document.getElementById('price-total');
  var totalPrice = 0;
  var rows = document.getElementsByTagName('tr');

  for (var j = 1; j < rows.length; j++) {
    var checkValue = rows[j].childNodes[0].childNodes[0];
    if (checkValue.checked) {
      var price = rows[j].childNodes[4].innerHTML;
      totalPrice += Number(price);
    }
  }
  totalPriceDOM.innerHTML = totalPrice.toString();
}

function selectAll() {
  var checkedAll = document.getElementsByClassName('check-all')[0];
  var rows = document.getElementsByTagName('tr');
  for (var k = 1; k < rows.length; k++) {
    var checkValue = rows[k].childNodes[0].childNodes[0];
    checkValue.checked = checkedAll.checked;
  }
}

function addCheckAll() {
  document.getElementsByClassName('check-all')[0]
    .addEventListener('click', function () {
      selectAll();
      calculateTotalPrice();
    });
}

window.onload = function () {
  loadShoppingCartData();
  calculateTotalPrice();
  addCheckAll();
};
