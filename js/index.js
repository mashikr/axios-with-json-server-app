let url = "http://localhost:3000/students/";

// Get data onload window
window.onload = function(){
    let dataBody = document.getElementById("databody");
    axios.get(url)
    .then(res => {
        res.data.forEach(data => {
            console.log(data);
            console.log(dataBody);
            dataElement(data, dataBody);
        });
    })
    .catch(err => console.log(err));
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
            <button class="btn btn-warning">Edit</button>
            <button class="btn btn-danger float-right">Delete</button>
          </div>
        </div>
      </div>
    `;
    parentElement.insertAdjacentHTML('beforeend', markup);
}