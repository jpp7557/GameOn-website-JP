// DOM Elements
const modalbg = document.querySelector(".bground");
const formContent = document.querySelector(".content");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeDialogBtn = document.querySelector('.close');

// event that launches the subscription form modal 
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/* ********************************************************* */
/*  click sur le signe X pour fermer le modal de formulaire  */
/* ********************************************************* */

closeDialogBtn.addEventListener('click', () => {
  formContent.style.display = "none"; // Close the form
  modalbg.style.display = "none";     // Close the dialog
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
const radios = document.querySelectorAll('input[name="location"]');
const merciMessage = document.getElementById('merciMessage');
const merciPopup = document.getElementById('merciPopup');
const formulaire = document.getElementById('formulaire');
const merciClose = document.getElementById('merciClose');
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
  formContent.style.display = "block"; // display form content
}

// validation functions

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

    const re = /^(\d{4}).(\d{2}).(\d{2})$/;

    let birthdateValue = birthdateInput.value;

    if (birthdateValue === "") {
      birthdateError.style.display = "block";
      return false;
    }

    let match = re.exec(birthdateValue); // if valid date:  match = ["yyyy-mm-dd", "yyyy", "mm", "dd"]
    let year = parseInt(match[1], 10); // sting to int conversion
    let month = parseInt(match[2], 10);
    let day = parseInt(match[3], 10);

    let userBirthdate = new Date(year, month - 1, day); // Create a Date object with user provided birthday
    let today = new Date();

    //age calculation
    let age = today.getFullYear() - userBirthdate.getFullYear();

    //ajust age from month and Date 
    let m = today.getMonth() - userBirthdate.getMonth();

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

    let locationSelected = false;

    locationError.style.display = 'block'; // set display
 
    for (let radio of radios) {
      if (radio.checked) {
        locationSelected = true;
        locationError.style.display = 'none'; // Hide the error message if the format is valid
        break;
      } 
    };
    return locationSelected;
  }

  function displayFormValues(form) {
    for (let element of form.elements) {
      if (element.type === "submit") 
        continue;  

      if (element.id === "checkbox1") 
        continue;
  
      if (element.type === "radio" && element.checked) {
        console.log(`${element.name}: ${element.value}`);
      }
      else if (element.id === "checkbox2") {
        console.log(`${element.id}: ${element.checked}`);
      }
      else if (element.type !== "radio") {
        console.log(`${element.id}: ${element.value}`);
      }
    }
  }

// Checking valid format while quitting the input fields
firstnameInput.addEventListener('blur', firstnameCheck);
lastnameInput.addEventListener('blur', lastnameCheck);
emailInput.addEventListener('blur', validateEmail);
birthdateInput.addEventListener('blur', validateBirthDate);
quantityInput.addEventListener('blur', participationNumber);

const myFormulaire = document.getElementById('formulaire');

/***************************************************/
/*  radio buttons and terms of use event handling  */
/***************************************************/

myFormulaire.addEventListener('change', (event) => {
  if (event.target.name === 'location') {
      locationError.style.display = 'none';
  } else if (event.target.id === 'checkbox1') {
      validateAcception();
  }
});


/* ********************* */
/*  Form Sumit handling  */
/* ********************* */

//  Form Submit event Listening ...
myFormulaire.addEventListener('submit', (event) => {

    event.preventDefault();  // pas de submit, même si pas d'erreur (formatError = false) !

    let notValidFirstName = !firstnameCheck();
    let notValidLastName  = !lastnameCheck();
    let notValidEmail     = !validateEmail();
    let notValidBirthDate = !validateBirthDate();
    let nbParticipation   = !participationNumber();
    let notValidLocation  = !isLocationChosen();
    let notAccepted       = !validateAcception();

    let formatError = notValidFirstName || notValidLastName || notValidEmail ||
                      notValidBirthDate || nbParticipation  || notValidLocation || notAccepted;

    // format checking, si pas d'erreur, fermer le formulaire, affiche merci 
    if (!formatError) {
        formContent.style.display = "none"; // Close formulaire
        merciPopup.style.display = 'flex';
        merciPopup.style.flexDirection = 'column';
        merciMessage.textContent = "Merci pour votre inscription !";
        displayFormValues(myFormulaire);
        myFormulaire.reset();

    }
})

/* ************************* */
/*  click sur bouton fermer  */
/* ************************* */

// Add an event listener to the merciFermer button to resume Form submit
document.getElementById('merciFermer').addEventListener('click', () => {

  merciPopup.style.display = 'none';  // Close merci popup
  modalbg.style.display = 'none';     // Close modal popup

});


/* ************************************************* */
/*  click sur le signe X du modal merci pour fermer  */
/* ************************************************* */

document.getElementById('merciClose').addEventListener('click', () => {
  merciPopup.style.display = 'none';  // Close merci popup
  modalbg.style.display = 'none';     // Close modal popup
});




