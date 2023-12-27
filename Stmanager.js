var list=document.querySelector('.table');
var form=document.querySelector('#form');

window.addEventListener("DOMContentLoaded",()=>{
	axios.get('https://crudcrud.com/api/1b833fb6cef147c2800ac1664382f6be/Stmanager').then((res)=>{
		for(let i=0;i<res.data.length;i++){
			show(res.data[i]);
		}
	}).catch((err)=>console.log(err));
})
form.addEventListener('submit',onSubmit)
function onSubmit(e){
	e.preventDefault();
	const cName=document.querySelector('#candy').value;
	const des=document.querySelector('#description').value;
	const price=document.querySelector('#price').value;
	const amt=document.querySelector('#amount').value;
	const obj=new Object();
	obj.Candy=cName;
	obj.Description=des;	
	obj.Price=price;
	obj.Amount=amt;
	show(obj);
	axios.post('https://crudcrud.com/api/1b833fb6cef147c2800ac1664382f6be/Stmanager',obj).then((result) => {
		console.log('saved successfully')
	}).catch((err) => {
		console.log(err);
	});

}
function show(my_obj){
	let tr=document.createElement('tr');
	let idCol=document.createElement('td');
	idCol.appendChild(document.createTextNode(my_obj._id));
	tr.appendChild(idCol);
	let nameCol=document.createElement('td');
	nameCol.appendChild(document.createTextNode(my_obj.Candy));
	let desCol=document.createElement('td');
	tr.appendChild(nameCol);
	desCol.appendChild(document.createTextNode(my_obj.Description));
	let priceCol=document.createElement('td');
	tr.appendChild(desCol);
	priceCol.appendChild(document.createTextNode(my_obj.Price));
	let amtCol=document.createElement('td');
	tr.appendChild(priceCol);
	amtCol.appendChild(document.createTextNode(my_obj.Amount));
	tr.appendChild(amtCol);

	//Creating buttons
	var buy1=document.createElement('button');
	buy1.appendChild(document.createTextNode('BUY 1'));
	buy1.className='btn btn-primary m-2';
	var buy2 = document.createElement('button');
	buy2.appendChild(document.createTextNode('BUY 2'));
	buy2.className = 'btn btn-primary m-2';
	var buy3 = document.createElement('button');
	buy3.appendChild(document.createTextNode('BUY 3'));
	buy3.className = 'btn btn-primary m-2';
	let newDiv=document.createElement('div');
	newDiv.appendChild(buy1);
	newDiv.appendChild(buy2);
	newDiv.appendChild(buy3);
	tr.appendChild(newDiv);
	list.appendChild(tr);

	buy1.addEventListener('click',buyOne);
	function buyOne(e){
		e.preventDefault();
		let row=e.target.parentElement.parentElement;
		console.log(row);
		let id=row.firstChild.innerHTML;
		console.log(id);
		let oldAmt;
		axios.get(`https://crudcrud.com/api/1b833fb6cef147c2800ac1664382f6be/Stmanager/${id}`).then((res)=>{
			oldAmt=res.data.Amount;
		}).catch((err)=>{
			console.log(err+" can't get amount");
		})
		let newAmt=oldAmt-1;
		axios.patch(`https://crudcrud.com/api/1b833fb6cef147c2800ac1664382f6be/Stmanager/${id}`,{
			Amount:newAmt
		}).then((res)=>{
			console.log("Amount Updated");
		}).catch((err)=>console.log(err+" amount error"))
	}
}