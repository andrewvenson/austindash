var tablerows = document.getElementById('tabletest').rows.length;
var table = document.getElementById('tabletest');
var cart = document.getElementById('cart');
username = document.getElementById('username').innerHTML

window.onload = function wowzers(){
  // Get Data
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'pricing/orders/' + username +'/api', true);
  xhr.onload = function(){
    var data = JSON.parse(this.response);
    if(xhr.status >= 200 && xhr.status < 400){
      for(x=0; x < data.length; x++){
        for(key in data[x]){
          row = cart.insertRow(-1);
          row.addEventListener('click', function deleterow(){
            index = this.rowIndex;
            console.log("Delete row " + index);
            // $.ajax({
            //   url: '/pricing/orders/' + username + '/api',
            //   type: 'DELETE',
            //   dataType: 'json',
            //   data: {_method:"DELETE" data[index]}
            // });
          });
          cell1 = row.insertCell(0);
          cell2 = row.insertCell(1);
          cell3 = row.insertCell(2);

          cell1.innerHTML = key;
          cell2. innerHTML = data[x][key];
          cell3. innerHTML = "<button class='btn btn-danger'>Delete</button>"
        }
      }
    }else{
      console.log(error)
    }
  }
  xhr.send()
}
for(x = 0; x < tablerows; x++){
  table.rows[x].addEventListener('click', addTah);
}
function addTah(ev){
  index = this.rowIndex;
  equipmentCell = table.rows[index].cells[0];
  priceCell = table.rows[index].cells[1];
  equipmentName = equipmentCell.innerHTML;
  equipmentPrice = priceCell.innerHTML;
  // Post Data
  $.post('/pricing/orders/' + username + '/api', {
    javascript_data: JSON.stringify({[equipmentName]:equipmentPrice})
  });
  cartrow = cart.insertRow(-1);

  cartrow.addEventListener('click', function deleterow(){
    index = this.rowIndex;
    console.log("Delete row " + index);
    // $.ajax({
    //   url: '/pricing/orders/' + username + '/api',
    //   type: 'POST',
    //   data: {_method:"DELETE" data[index]},
    // });
    console.log("Delete Row");
  });

  cell1 = cartrow.insertCell(0);
  cell2 = cartrow.insertCell(1);
  cell3 = cartrow.insertCell(2);
  cell1.innerHTML= equipmentName;
  cell2.innerHTML = equipmentPrice;
  cell3.innerHTML = "<button class='btn btn-danger'>Delete</button>"
}




