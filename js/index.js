let url = "http://localhost:3000/students";

// Get data onload window
window.onload = function(){
    let dataBody = document.getElementById("dataBody");
    axios.get(url)
    .then(res => {
        res.data.forEach(data => {
            dataElement(data, dataBody);
        });
    })
    .catch(err => console.log(err));

    let btnAdd = document.getElementById('btnAdd');
    btnAdd.addEventListener('click',function(){
        sendData();
    });
}

// data element
function dataElement(data, parentElement) {
    let markup = `
    <div class="col-sm-6 col-md-4 col-lg-3 mb-3" id="taken${data.id}"> 
        <div class="card">
          <div class="card-header bg-primary text-light" id="name${data.id}">${data.name}</div>
          <div class="card-body">
            <b>Dept:</b> <span id ="dept${data.id}">${data.dept}</span> <br>
            <b>Roll:</b> <span id="roll${data.id}">${data.roll}</span> <br>
            <b>Phone:</b> <span id="phone${data.id}">${data.phone}</span> <br>
            <b>Email:</b> <span id="email${data.id}">${data.email}</span>
          </div>
          <div class="card-footer">
            <button class="btn btn-warning" id="editBtn${data.id}">Edit</button>
            <button class="btn btn-danger float-right" id="deleteBtn${data.id}">Delete</button>
          </div>
        </div>
      </div>
    `;
    parentElement.insertAdjacentHTML('beforeend', markup);

    document.getElementById(`editBtn${data.id}`).addEventListener('click', () => {
        editData(data.id);     
    });

    document.getElementById(`deleteBtn${data.id}`).addEventListener('click', () => {
        deleteData(data.id, parentElement);
    });
}

// send data
function sendData(){
    let nameField = document.getElementById('nameField');
    let deptField = document.getElementById('deptField');
    let rollField = document.getElementById('rollField');
    let phoneField = document.getElementById('phoneField');
    let emailField = document.getElementById('emailField');

    let data = {
        name: nameField.value,
        dept: deptField.value,
        roll: rollField.value,
        phone: phoneField.value,
        email: emailField.value
    }
    if (data.name !=="" && data.dept !=="" && data.roll !=="" && data.phone !=="" && data.email !=="") {
        axios.post(url, data)
            .then(res => {
                let dataBody = document.getElementById("dataBody");
                dataElement(res.data, dataBody);
                nameField.value = '';
                deptField.value = '';
                rollField.value = '';
                phoneField.value = '';
                emailField.value = '';
            })
            .catch(err => console.log(err))
    } else {
        alert("Please enter all data!");
    }
}

// delete a data
function deleteData(id, parentElement){
    axios.delete(`${url}/${id}`)
            .then(res => {
                parentElement.removeChild(document.getElementById(`taken${id}`));
            })
            .catch(err => console.log(err))    
}

// edit data
function editData(id) {
    let Modal = $('#editData');
        Modal.modal('toggle');
    
    let editName = document.getElementById('editName');
    let editDept = document.getElementById('editDept');
    let editRoll = document.getElementById('editRoll');
    let editPhone = document.getElementById('editPhone');
    let editEmail = document.getElementById('editEmail');

    let name = document.getElementById(`name${id}`);
    let dept = document.getElementById(`dept${id}`);
    let roll = document.getElementById(`roll${id}`);
    let phone = document.getElementById(`phone${id}`);
    let email = document.getElementById(`email${id}`);

    editName.value = name.innerText;
    editDept.value = dept.innerText;
    editRoll.value = roll.innerText;
    editPhone.value = phone.innerText;
    editEmail.value = email.innerText;

    let editBtn = document.getElementById('editFormBtn');
        
        editBtn.addEventListener('click', editDataFunction);
        function editDataFunction(){
            axios.put(`${url}/${id}`, {
                name: editName.value,
                dept: editDept.value,
                roll: editRoll.value,
                phone: editPhone.value,
                email: editEmail.value
            })
            .then(res => {
                name.innerText = editName.value;
                dept.innerText = editDept.value;
                roll.innerText = editRoll.value;
                phone.innerText = editPhone.value;
                email.innerText = editEmail.value;

                Modal.modal('hide');
            })
            .catch(err => console.log(err))
            editBtn.removeEventListener("click", editDataFunction);
        }
}