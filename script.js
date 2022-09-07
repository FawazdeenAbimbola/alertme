var selectedRow = null;
function onFormSubmit() {
    let formData = readFormData();
    if(selectedRow == null) {
    insertProducts(formData);
    }
   else{
    updateRecord(formData);
    
   }

   var noProductsFound = document.getElementById('no-product');
   if(formData) {
       noProductsFound.style.display = 'none'; //sets display to none if products are found
   }
    }
   

    function readFormData() {
        let formData = {};
        formData["productName"] = document.getElementById('productName').value;
        formData["productId"] = document.getElementById('productId').value;
        formData["date"] = document.getElementById('date').value;
        return formData;
    }
    
    function insertProducts(data) {
        var table = document.getElementById('productlist').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length);
        productName = newRow.insertCell(0);
        productName.innerHTML = data.productName;
        productID = newRow.insertCell(1);
        productID.innerHTML = data.productId;
        expiry = newRow.insertCell(2);
        expiry.innerHTML = data.date;
        let field = document.querySelector("#date"); //
        let expirydate = new Date(field.value);
        let todayDate = new Date();
        let distance = (expirydate - todayDate);
        let cell4 = newRow.insertCell(3);
        let status = Math.floor((distance / (1000 * 60 * 60 * 24))+ 1);

            if(status < 0) {
                    cell4.innerHTML= `<p id="expired">Expired</p>`;
                }
    if(status > 0) {
        cell4.innerHTML = `<p id="good">Good</p>`;
    }
    if(status === 3) {
        alert('3 days Remaining, Please use!');
    }
    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onclick='onEdit(this)' id='edit-btn'>Edit</a> 
    <a onclick='onDelete(this)' id='delete-btn'>Delete</a>`;

}
function resetForm() {
    document.getElementById('productName').value = "";
    document.getElementById('productId').value = "";
    document.getElementById('date').value = "";
    selectedRow = null;
}
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById('productName').value = selectedRow.cells[0].innerHTML;
    document.getElementById('productId').value = selectedRow.cells[1].innerHTML;
    document.getElementById('date').value = selectedRow.cells[2].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.productName;
    selectedRow.cells[1].innerHTML = formData.productId;
    selectedRow.cells[2].innerHTML = formData.date;

}

   function onDelete(td) {
    if (confirm('Do you want to delete this product?')){
        row = td.parentElement.parentElement;
        document.getElementById("productlist").deleteRow(row.rowIndex);
        resetForm();
    }
    
           
    }
   