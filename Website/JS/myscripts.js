// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", function() {

  // Get the form element from the HTML document
  const form = document.querySelector('form');

  // Add an event listener to the form that will be triggered when the form is submitted
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default behavior of the form submitting to a new page

    // Define a function to perform validation checks on the form data
    function validateForm() {

      // Get the values of the credit card number, expiration month and year, and security code fields from the form
      const cardNumber = document.querySelector('#master_card').value;
      const expMonth = Number(document.querySelector('#exp_month').value);
      const expYear = Number(document.querySelector('#exp_year').value);
      const cvvCode = document.querySelector('#cvv_code').value;

      // Perform validation checks on the form data
      if (cardNumber.length !== 16 || !cardNumber.startsWith('51') && !cardNumber.startsWith('52') && !cardNumber.startsWith('53') && !cardNumber.startsWith('54') && !cardNumber.startsWith('55')) {
        // Alert the user if the credit card number is invalid and return false to prevent the form from submitting
        alert('Please enter a valid Mastercard number starting with 51, 52, 53, 54, or 55 and containing 16 digits.');
        return false;
      }

      // Create a new Date object for the current date and a new Date object for the expiration date entered by the user
      const today = new Date();
      const expDate = new Date(expYear, expMonth - 1, 1);
      expDate.setMonth(expDate.getMonth() + 1, 0);

      if (expDate < today) {
        // Alert the user if the expiration date is in the past and return false to prevent the form from submitting
        alert('Your card has expired. Please enter a valid expiration date.');
        return false;
      }

      if (cvvCode.length !== 3 && cvvCode.length !== 4) {
        // Alert the user if the security code is invalid and return false to prevent the form from submitting
        alert('Please enter a valid security code containing 3 or 4 digits.');
        return false;
      }

      // Success! Form validation passed

      // Store the last four digits of the credit card number in local storage to use for success page
      localStorage.setItem('cardNumber', cardNumber.slice(-4));

      // Redirect the user to the success page
      window.location.href = 'success.html';

      // Return false to prevent the form from submitting
      return false;
    }

    // Call the validateForm function when the form is submitted
    validateForm();
  });
});
