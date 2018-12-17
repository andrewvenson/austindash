var tablerows = document.getElementById('tabletest').rows.length;
var table = document.getElementById('tabletest');

var jsonTest = '[{"Epson":"65"}, {"Termnial":"65"}]';
var jsonObj = JSON.parse(jsonTest);
console.log(jsonObj[0].Epson)

for(x = 0; x < tablerows; x++){
  table.rows[x].addEventListener('click', addTah);
}

function addTah(ev){

  jsonObj["whoah"] = "tah";
  console.log(jsonObj);

  var cart = document.getElementById('cart');
  index = this.rowIndex;
  equipmentCell = table.rows[index].cells[0];
  priceCell = table.rows[index].cells[1];
  console.log(index);
  equipmentName = equipmentCell.innerHTML;
  equipmentPrice = priceCell.innerHTML;
  var row = cart.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = equipmentName;
  cell2.innerHTML = equipmentPrice;
  cell3.innerHTML = "<button class='btn btn-danger'>Delete</button>"
}
