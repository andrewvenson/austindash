var tablerows = document.getElementById('tabletest').rows.length;
var table = document.getElementById('tabletest');
var cart = document.getElementById('cart');
var subtotal = document.getElementById('subtotal')
var jsonTest = '[]';
var jsonObj = JSON.parse(jsonTest);
var num = 0.00;

for(x = 0; x < tablerows; x++){
  table.rows[x].addEventListener('click', addCartItem);
}

function addCartItem(ev){
  index = this.rowIndex;
  equipmentCell = table.rows[index].cells[0];
  priceCell = table.rows[index].cells[1];
  equipmentName = equipmentCell.innerHTML;
  equipmentPrice = priceCell.innerHTML;
  var row = cart.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.style.width = '200px;'
  cell2.style.width = '200px;'
  jsonObj[jsonObj.length] = {[equipmentName]:equipmentPrice};

  for(zz=0; zz < jsonObj.length; zz++){
    for(key in jsonObj[zz]){
      cell1.innerHTML = key;
    }
    cell2.innerHTML = "<strong>"+jsonObj[zz][equipmentName]+"</strong>";
    cell3.innerHTML = "<button class='btn btn-danger'>Delete</button>";
  }
  console.log(equipmentPrice)
  number = Number(equipmentPrice);
  subtotal.innerHTML = num+=number;
}






