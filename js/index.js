let url = "http://localhost:3000/students/";

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
    <div class="col-sm-6 col-md-4 col-lg-3 mb-3"> 
        <div class="card">
          <div class="card-header bg-primary text-light">${data.name}</div>
          <div class="card-body">
            <b>Dept:</b> ${data.dept} <br>
            <b>Roll:</b> ${data.roll} <br>
            <b>Phone:</b> ${data.phone} <br>
            <b>Email:</b> ${data.email}
          </div>
          <div class="card-footer">
            <button class="btn btn-warning" id="${data.id}">Edit</button>
            <button class="btn btn-danger float-right">Delete</button>
          </div>
        </div>
      </div>
    `;
    parentElement.insertAdjacentHTML('beforeend', markup);
    document.getElementById(data.id).addEventListener('click', () => {
        console.log(data.id);
        console.log(data.name);
        console.log(data.dept);
        console.log(data.roll);
    })
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
}