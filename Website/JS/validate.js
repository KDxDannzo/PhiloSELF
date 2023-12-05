const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  if (validateForm()) {
    // Get the form data
    const cardNumber = document.querySelector('#master_card').value;
    const expMonth = document.querySelector('#exp_month').value;
    const expYear = document.querySelector('#exp_year').value;
    const cvvCode = document.querySelector('#cvv_code').value;

    // If validation passes, create the JSON data to be sent in the POST request
    const url = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard";
    const jsonData = {
      "master_card": parseInt(cardNumber),
      "exp_year": parseInt(expYear),
      "exp_month": parseInt(expMonth),
      "cvv_code": cvvCode
    };

    // Send the POST request to the server
    fetch('https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => {
      if (response.status === 200) {
        // Parse the response and show a success message to the user
        response.json().then(data => {
          alert(data.message);
        });
      } else if (response.status === 400) {
        throw "Bad data was sent to the server.";
      } else {
        throw "Something went wrong.";
      }
    })
    .catch(error => {
      alert('An error occurred while processing your payment. Please try again later.');
      console.error(error);
    });
  }
});

