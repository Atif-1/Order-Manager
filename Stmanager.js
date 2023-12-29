var list=document.querySelector('.table');
var form=document.querySelector('#form');

window.addEventListener("DOMContentLoaded",()=>{
	axios.get('https://crudcrud.com/api/5eeeeda0bf7340c6a99004876e37b667/orderM').then((res)=>{
		for(let i=0;i<res.data.length;i++){
			show(res.data[i]);
		}
	}).catch((err)=>console.log(err));
})
form.addEventListener('submit',onSubmit)
function onSubmit(e){
	e.preventDefault();
	const dPrice=document.querySelector('#Dprice').value;
	const dName=document.querySelector('#Dname').value;
	const dCategory=document.querySelector('#Dcategory').value;
	const obj=new Object();
	obj.Price=dPrice;
	obj.Dish=dName;	
	obj.Category=dCategory;
	show(obj);
	axios.post('https://crudcrud.com/api/5eeeeda0bf7340c6a99004876e37b667/orderM',obj).then((result) => {
		console.log('order saved successfully')
	}).catch((err) => {
		console.log(err);
	});

}
function show(my_obj){
	let tr=document.createElement('tr');
	tr.className='text-info';
	let idCol=document.createElement('td');
	idCol.appendChild(document.createTextNode(my_obj._id));
	tr.appendChild(idCol);
	let priceCol=document.createElement('td');
	priceCol.appendChild(document.createTextNode(my_obj.Price));
	tr.appendChild(priceCol);
	let dishCol=document.createElement('td');
	dishCol.appendChild(document.createTextNode(my_obj.Dish));
	tr.appendChild(dishCol);
	let catCol=document.createElement('td');
	catCol.className='font-	italic';
	catCol.appendChild(document.createTextNode(my_obj.Category));
	tr.appendChild(catCol);

	//Creating buttons
	var delBtn=document.createElement('button');
	delBtn.appendChild(document.createTextNode('Delete Order'));
	delBtn.className='btn btn-danger btn-outline-danger m-2';
	let newDiv=document.createElement('div');
	newDiv.appendChild(delBtn);
	tr.appendChild(newDiv);
	list.appendChild(tr);

	delBtn.addEventListener('click',delOrder);
	function delOrder(e){
		e.preventDefault();
		if(confirm('Delete this Item?')){
			let row=e.target.parentElement.parentElement;
			list.removeChild(row);
			let id=row.firstChild.innerHTML;
			console.log(id);
			axios.delete(`https://crudcrud.com/api/5eeeeda0bf7340c6a99004876e37b667/orderM/${id}`).then((res)=>{
				console.log(`${id} odrder is deleted successfullly`);
			}).catch((err)=>{
				console.log(err+`${id} order not deleted`);
			});
		}
	}	
}