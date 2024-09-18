// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeDialogBtn = document.querySelector('.close');
//const checkboxL1 = document.querySelector("label[for='checkbox1']");
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

closeDialogBtn.addEventListener('click', () => {
  modalbg.style.display = "none"; // Close the dialog
});

//****  my script  BEGIN =====>

// Get references
const firstnameInput = document.getElementById('first');
const lastnameInput = document.getElementById('last');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const birthdateInput = document.getElementById('birthdate');
const birthdateError = document.getElementById('birthdateError');
const checkbox1 = document.getElementById('checkbox1');
const checkbox1Message = document.getElementById("checkbox1Msg");
const quantityInput = document.getElementById('quantity');
const quantityError = document.getElementById('quantityError');
const locationError = document.getElementById('locationError');
const merciMessage = document.getElementById('merciMessage');
const merciPopup = document.getElementById('merciPopup');
const formulaire = document.getElementById('formulaire');

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


function editNav() {

  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// validation functions

function validateEmail() {
  const emailValue = emailInput.value.trim();

  // Check if the email format is valid
  if (emailRegex.test(emailValue)) {
    emailError.style.display = 'none'; // Hide the error message if the format is valid
    return true;
  } else {
    emailError.style.display = 'block';  // Show the error message if the format is invalid
    return false;
  }
}

function validateAcception() {

  if (checkbox1.checked) {
    checkbox1Message.style.display = "none";
  } else {
    checkbox1Message.style.display = "block";
  }
  return checkbox1.checked;
}

function validateBirthDate() {

    const re = /^(\d{4})-(\d{2})-(\d{2})$/;

    let birthdateValue = birthdateInput.value;
    let match = re.exec(birthdateValue); // if valid date:  result ["yyyy-mm-dd", "yyyy", "mm", "dd"]

    if (!match) {
      birthdateError.style.display = "block";
      return false;
    }

    let year = parseInt(match[1], 10); // sting to int conversion
    let month = parseInt(match[2], 10);
    let day = parseInt(match[3], 10);

    let userBirthdate = new Date(year, month - 1, day); // Create a Date object with user provided birthday
    let today = new Date();
    let m = today.getMonth() - userBirthdate.getMonth();

    //age calculation
    let age = today.getFullYear() - userBirthdate.getFullYear();
    //ajust age from month and Date 
    if (m < 0 || (m === 0 && today.getDate() < userBirthdate.getDate())) {
        age--;
    }

    if (age >= 18) {
      birthdateError.style.display = "none";
      return true;
    }

    birthdateError.style.display = "block";
    return false;

  }

  function participationNumber() {
    
      let pNumberVal = quantityInput.value;

      if ((pNumberVal == "") || (pNumberVal < 0) || (pNumberVal > 99) ) {
        quantityError.style.display = "block";
        return false;
      }
      quantityError.style.display = "none";
      return true;  
  }

  function isLocationChosen() {

    let radios = document.querySelectorAll('input[name="location"]');
    let locationSelected = false;

    locationError.style.display = 'block'; // set display

    for (const radio of radios) {
      if (radio.checked) {
        locationSelected = true;
        locationError.style.display = 'none'; // Hide the error message if the format is valid
        break;
      } 
    };
    return locationSelected;
  }

// add more script ***** BEGIN

function wait4Merci(event, form) {
  event.preventDefault(); // Prevent form submit
  form.classList.add('inactive-form');
  closeDialogBtn.classList.add('inactive-form');


  // This function simulates a loop
  let loop = setInterval(() => {
    if (!isLooping) {
      clearInterval(loop);  // Break the loop by clearing the interval
      // Resume form submission here after the loop is stopped
      form.submit();  // Submit the form
    }
  }, 1000);  // Loop every 1000 ms

}



// Add an event listener to the closeMerci button to resume Form submit
document.getElementById('closeMerci').addEventListener('click', () => {

    formulaire.classList.remove('inactive-form');
    closeDialogBtn.classList.remove('inactive-form');
    merciPopup.style.display = 'none';   // Close merci popup
    modalbg.style.display = 'none';   // Close modal popup

    isLooping = false;  // Set the flag to false to stop the loop

});


function nameCheck(uName) {

  const namePattern = /^[a-zA-Z]{2,}$/;  // Only letters, at least 2 characters
  return namePattern.test(uName);
}

function firstnameCheck() {

  let name = firstnameInput.value.trim();
  firstnameError.style.display = 'none';

  if (!nameCheck(name)) {  //name format not valid
    firstnameError.style.display = 'block';
  }
  return nameCheck(name);
}

function lastnameCheck() {

  let name = lastnameInput.value.trim();
  lastnameError.style.display = 'none';

  if ( name === "" || !nameCheck(name)) {  //name format not valid
    lastnameError.style.display = 'block';
  }
  return nameCheck(name);
}

// add more script ***** END


// Checking valid format while quitting the input fields
firstnameInput.addEventListener('blur', firstnameCheck);
lastnameInput.addEventListener('blur', lastnameCheck);
emailInput.addEventListener('blur', validateEmail);
birthdateInput.addEventListener('blur', validateBirthDate);
quantityInput.addEventListener('blur', participationNumber);



/* ********************* */
/*  Form Sumit handling  */
/* ********************* */

let isLooping = true;  // tag for wait4Merci() , init value 
const myFormulaire = document.getElementById('formulaire');

//  Form Submit event Listening ...
myFormulaire.addEventListener("submit", (event) => {

    // Get form values
    //const checkbox = document.querySelector('#checkbox1');


    let notValidFirstName = !firstnameCheck();
    let notValidLastName  = !lastnameCheck();
    let notValidEmail     = !validateEmail();
    let notValidBirthDate = !validateBirthDate();
    let nbParticipation   = !participationNumber();
    let notValidLocation  = !isLocationChosen();
    let notAccepted       = !validateAcception();

    let formatError = notValidFirstName || notValidLastName || notValidEmail ||
                      notValidBirthDate || nbParticipation  || notValidLocation || notAccepted;

    // Form submit if no error
    if (formatError) {
        event.preventDefault();
    } else {
        //alert("Merci !");
        merciPopup.style.display = 'block';
        merciMessage.textContent = "Merci pour votre réservation !";
        wait4Merci(event, myFormulaire);
    }
})



