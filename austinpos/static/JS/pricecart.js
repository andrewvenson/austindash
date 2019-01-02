var tablerows = document.getElementById('table').rows.length;
var table = document.getElementById('table');
var cart = document.getElementById('cart');
var subtotal = document.getElementById('subtotal');
var username = document.getElementById('username').innerHTML;
var pricesub = document.getElementById('pricefooter');
var badgecart = document.getElementById('cartbadge');
var quickview = document.getElementById('quickview');
var tax = document.getElementById('tax');
var total = document.getElementById('total');

// On Load Cart
window.onload = function wowzers(){
  var array = [];
  var sum = 0;
  
  if(Number(badgecart.innerHTML)>0){
    quickview.style.display = 'block'
  }
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
          subtotal.innerHTML = sum.toFixed(2);
          taxy=Number(subtotal.innerHTML)*.0825;
          tax.innerHTML = taxy.toFixed(2); 
          taxsum = taxy+sum;
          total.innerHTML=taxsum.toFixed(2);
          row = cart.insertRow(-1);

          // Delete Data
          row.addEventListener('click', function deleterow(){
            index = this.rowIndex;
            $.post('pricing/orders/' + username + '/' + 'delete', {
              delete_item: index
            });
            console.log(sum-=Number(cart.rows[index].cells[1].innerHTML))
            subnum = Number(subtotal.innerHTML)-Number(cart.rows[index].cells[1].innerHTML);
            subtotal.innerHTML = subnum.toFixed(2);
            taxy=Number(subtotal.innerHTML)*.0825;
            tax.innerHTML = taxy.toFixed(2);
            taxsum = taxy+subnum;
            total.innerHTML=taxsum.toFixed(2);
            
            cart.deleteRow(index);
            if(Number(badgecart.innerHTML) > 0){
              badgecart.innerHTML=Number(badgecart.innerHTML)-1;
            }
            if(Number(badgecart.innerHTML) == 0){
              quickview.style.display = 'none';
            }
          });
          cell1 = row.insertCell(0);
          cell2 = row.insertCell(1);
          cell3 = row.insertCell(2);
          cell1.innerHTML = key;
          cell2. innerHTML = data[x][key];
          cell3. innerHTML = "<button class='btn btn-danger'>Delete</button>"
        }
      }
      // console.log(sum);
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

  
  // Post Data
  $.post('/pricing/orders/' + username + '/api', {
    javascript_data: JSON.stringify({[equipmentName]:equipmentPrice})
    
  });
  
  cartrow = cart.insertRow(-1);
  //Delete Data
  cartrow.addEventListener('click', function deleterow(){
    index = this.rowIndex;
    
    $.post('pricing/orders/' + username + '/' + 'delete', {
      delete_item: index
    });

    subnum = Number(subtotal.innerHTML)-Number(cart.rows[index].cells[1].innerHTML);
    subtotal.innerHTML = subnum.toFixed(2);
    taxy=Number(subtotal.innerHTML)*.0825;
    tax.innerHTML = taxy.toFixed(2);
    taxsum = taxy+subnum;
    total.innerHTML=taxsum.toFixed(2);
    if(Number(badgecart.innerHTML) > 0){
      badgecart.innerHTML=Number(badgecart.innerHTML)-1;
    }
    if(Number(badgecart.innerHTML) == 0){
      quickview.style.display = 'none';
    }
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
        
          subtotal.innerHTML = sum.toFixed(2);
          taxy=Number(subtotal.innerHTML)*.0825;
          tax.innerHTML = taxy.toFixed(2);
          taxsum = taxy+sum;
          total.innerHTML=taxsum.toFixed(2);
          quickview.style.display = "block";
        }
      }
    }else{
      console.log(error);
    }
  }
  badgecart.innerHTML=Number(badgecart.innerHTML)+1;
  xhr.send();
}


