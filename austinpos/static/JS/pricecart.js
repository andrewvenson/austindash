var tablerows = document.getElementById('table').rows.length;
var table = document.getElementById('table');
var cart = document.getElementById('cart');
var subtotal = document.getElementById('subtotal');
var username = document.getElementById('username').innerHTML;
var pricesub = document.getElementById('pricefooter');



// On load cart
window.onload = function wowzers(){
  var array = [];
  var sum = 0;
  // Get Data
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'pricing/orders/' + username +'/api', true);
  xhr.onload = function(){
    var data = JSON.parse(this.response);

    if(xhr.status >= 200 && xhr.status < 400){
      for(x in data){
        for(key in data[x]){
          array.push(Number(data[x][key]));
          sum+=Number(data[x][key]);
          subtotal.innerHTML = sum;
          row = cart.insertRow(-1);
          // Delete Data
          row.addEventListener('click', function deleterow(){
            index = this.rowIndex;
            $.post('pricing/orders/delete', {
              delete_item: index
            });
             cart.deleteRow(index);
             subtotal.innerHTML = sum-Number(cart.rows[index].cells[1].innerHTML);
          });
          cell1 = row.insertCell(0);
          cell2 = row.insertCell(1);
          cell3 = row.insertCell(2);
          cell1.innerHTML = key;
          cell2. innerHTML = data[x][key];
          cell3. innerHTML = "<button class='btn btn-danger'>Delete</button>"
        }
      }
      console.log(sum);
    }else{
      console.log(error)
    }
  }
  xhr.send()
}

//Dynamic Cart
for(x = 0; x < tablerows; x++){
  table.rows[x].addEventListener('click', addCartItem);
}
function addCartItem(ev){
  var array = [];
  var priceData = {};

  var sum = 0;
  index = this.rowIndex;
  equipmentCell = table.rows[index].cells[0];
  priceCell = table.rows[index].cells[1];
  equipmentName = equipmentCell.innerHTML;
  equipmentPrice = priceCell.innerHTML;

  

  // var xhr1 = new XMLHttpRequest();
  // xhr1.open('GET', 'pricing/orders/' + username +'/api', true);
  // xhr1.onload = function(){
  //   var data = JSON.parse(this.response);
  //   if(xhr1.status >= 200 && xhr1.status < 400){
  //     if(data.length == 0){
  //       for(x in data){
  //         for(y in data[x]){
  //           priceData[y] = data[x][y];
  //           console.log("wowowowowowowo");
  //         }
  //       }
  //     }else{
  //       console.log("There was no data");
  //     }
  //   }else{
  //     console.log(error);
  //   }
  // }
  // xhr1.send()

  // priceData[equipmentName] = equipmentPrice;

  // console.log("This is data to send to python ", priceData)

  // Post Data
  $.post('/pricing/orders/' + username + '/api', {
    javascript_data: JSON.stringify({[equipmentName]:equipmentPrice})
  });
  cartrow = cart.insertRow(-1);
  // Delete Data
  cartrow.addEventListener('click', function deleterow(){
    index = this.rowIndex;
    subtotal.innerHTML = sum-Number(cart.rows[index].cells[1].innerHTML);
    $.post('pricing/orders/delete', {
      delete_item: index
    });
    cart.deleteRow(index);
  });
  cell1 = cartrow.insertCell(0);
  cell2 = cartrow.insertCell(1);
  cell3 = cartrow.insertCell(2);
  cell1.innerHTML= equipmentName;
  cell2.innerHTML = equipmentPrice;
  cell3.innerHTML = "<button class='btn btn-danger'>Delete</button>";
  // Open Api information
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'pricing/orders/' + username +'/api', true);
  xhr.onload = function(){
    var data = JSON.parse(this.response);
    if(xhr.status >= 200 && xhr.status < 400){
      for(x in data){  
        for(y in data[x]){
          array.push(Number(data[x][y]));
          sum+=Number(data[x][y]);
          subtotal.innerHTML = sum;
        }
      }
    }else{
      console.log(error);
    }
  }
  xhr.send();
}



