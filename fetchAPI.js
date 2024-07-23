function generateAPI() {
  alert("darshan");
  fetch("https://fakerapi.it/api/v1/persons?_quantity=20").then(function (
    response
  ) {
    //response.json also return promise
    response.json().then(function (data) {
      console.log(data);
    });
  });
}
