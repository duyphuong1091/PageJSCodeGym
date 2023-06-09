let products = [
    ['1','Iphone 14.png','Iphone 14','27000000','https://appleinsider.com/inside/iphone-14#:~:text=The%20iPhone%2014%20looks%20identical'],
    ['2','Iphone 13.png','Iphone 13','16000000','https://appleinsider.com/inside/iphone-13#:~:text=The%20iPhone%2014%20looks%20identical']
  
]

let array_products = [];
let updateIndex = -1;
let tongtien = 0;
//let giohang = document.getElementById('id-giohang')
//let tongtien = document.getElementById('id-tongtien')

function renderProducts(products)
{
    let productEl = document.querySelector('.products')
    let productHtml = `<tr>
                            <th>ID</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Detail Information</th>
                            <th>Function Button</th>
                       </tr>`
    //let j = 0
    for(let i = 0; i < products.length; i++)
    {
        
            productHtml += `<div class="product-${i}">
                <tr>
                    <th>${products[i][0]}</th>
                    <th><img width="75px" height="100px" src="./${products[i][1]}"; alt="" /></th>
                    <th>${products[i][2]}</th>
                    <th>${products[i][3]}</th>
                    <th><a href="${products[i][4]}">Link</a></th>
                    <th>
                        <button data-index="${i}" class="buy">Buy</button>
                        <button data-index="${i}" class="edit">Edit</button> 
                        <button data-index="${i}" class="delete">Delete</button>   
                    </th>
                </tr>                                
            </div> `
       
    }
    productEl.innerHTML = productHtml

    // NÚT EDIT
    initEditBtnHandle()
    // NÚT DELETE
    initDeleteBtnHandle()    
    //NÚT BUY
    initBuyBtnHandle()
}

function initDeleteBtnHandle()
{
    let deleteBtns = document.querySelectorAll(".delete")

        //Duyệt qua từng phần tử của mảng chứa thành phần của từng nút Delete
        deleteBtns.forEach(function(item){
            item.addEventListener('click',function(){
            //Trả về chỉ số của mảng khi bấm vào nút Delete tương ứng
                let deleteIndex = item.getAttribute('data-index')
                let status = confirm('Bạn có chắc muốn xóa hay không?')
                if(status)
                {
                    //Hàm "splice"  xóa phần tử ở chỉ số deleleIndex, còn số "1" là số phần tử xóa. Ví dụ arr=[1,2,3] , arr.splice(0, 2) sẽ xóa số "1,2"
                    //products.splice(deleteIndex, 1)                 
                    //renderProducts(products)

                    array_products.splice(deleteIndex, 1)
                    
                    let new_products = JSON.stringify(array_products)
                    localStorage.setItem('productlist', new_products)                 
                    
                    renderProducts(array_products)
                }
            })
        
        })
}

function initEditBtnHandle()
{
    // Lấy ra các nút Edit có class = "edit"
    let editBtns = document.querySelectorAll(".edit")

    //Duyệt qua từng phần tử của mảng chứa thành phần của từng nút Edit
    editBtns.forEach(function(item){
        item.addEventListener('click',function(){
            //Trả về chỉ số của mảng khi bấm vào nút Edit tương ứng
            let editIndex = item.getAttribute('data-index')

            //lấy ra phần tử trong mảng products có chỉ số editIndex
            let editName = products[editIndex]

            //Đưa tên sản phẩm vào khung chứa "name"
            nameInput.value = editName

            //Gán chỉ số editIndex cho biến updateIndex, vì biến editIndex là biến cục bộ - không có giá trị bên ngoài
            updateIndex = editIndex

            //Gán tên nút "Add" thành "Delete"
            btnAdd.innerHTML = 'Update'

        })
    })    
}

function initBuyBtnHandle()
{
    let buyBtns = document.querySelectorAll(".buy")
    let orderedHtml = `<tr>
                            <th>ID</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Price</th>
                       </tr>
                      `
    buyBtns.forEach(function(item){
        item.addEventListener('click',function(){
            let buyIndex = item.getAttribute('data-index')  
            let orderedEl = document.querySelector(".products-ordered")
            let tongtienEl = document.querySelector(".tong-tien")
            //   
                orderedHtml += `<div>
                                    <tr>
                                        <th>${array_products[buyIndex][0]}</th>
                                        <th><img width="37px" height="50px" src="./${array_products[buyIndex][1]}"; alt="" /></th>
                                        <th>${array_products[buyIndex][2]}</th>
                                        <th>${array_products[buyIndex][3]}</th>
                                    </tr>
                                </div>`
                tongtien += array_products[buyIndex][3]*1
            orderedEl.innerHTML = orderedHtml
            tongtienEl.value = tongtien
        })
    })
}

let nameInput = document.querySelector('.name-input')
let btnAdd = document.querySelector('.btn-add')

btnAdd.addEventListener('click', function(){
    let edit_product = nameInput.value
    let new_product = nameInput.value
    
    if(updateIndex >= 0)
    {
        //Edit lại tên sản phẩm        
        let edit_product_arr = edit_product.split(",")
        products[updateIndex] = edit_product_arr     
    
        nameInput.value = ''
        updateIndex = -1
        btnAdd.innerHTML = 'Add'
    }
    else
    {
        //Thêm sản phẩm mới
        let new_product_arr = new_product.split(",")       
        products.push(new_product_arr)        
        nameInput.value = ''
    }
    
    let products_str = JSON.stringify(products)
    localStorage.setItem('productlist', products_str)      
    
    renderProducts(products)
    nameInput.value = ''
})

let new_products = localStorage.getItem('productlist')

array_products = (new_products == null || new_products == "[]") ? products : JSON.parse(new_products)

renderProducts(array_products)