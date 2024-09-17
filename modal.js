// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeDialogBtn = document.querySelector('.close');
const checkboxLabel = document.querySelector("label[for='checkbox1']");
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

closeDialogBtn.addEventListener('click', () => {
  console.log("click click");
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
const checkbox1Message = document.getElementById("checkbox1Msg");
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

function validateEmail() {
  const emailValue = emailInput.value.trim();
  console.log("In validateEmail", emailValue);

  // Check if the email format is valid
  if (emailRegex.test(emailValue)) {
    console.log("emailValue: ", emailValue);
    emailError.style.display = 'none'; // Hide the error message if the format is valid
    return true;
  } else {
    console.log("emailValue: ", emailValue);
    emailError.style.display = 'block';  // Show the error message if the format is invalid
    return false;
  }
}

function validateAcception(checkbox) {
  
  console.log("Termes acceptés ? ", checkbox.checked);
  if (checkbox.checked) {
    checkbox1Message.style.display = "none";
  } else {
    checkbox1Message.style.display = "block";
  }
  return checkbox.checked;
}

function validateBirthDate() {

    const birthdateValue = birthdateInput.value.trim();
    const re = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = re.exec(birthdateValue); // result: ["yyyy-mm-dd", "yyyy", "mm", "dd"]

    console.log("In validateBirthdate 1:", birthdateValue);
    console.log("   match = ", match);


    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    const userBirthdate = new Date(year, month - 1, day); // Create a Date object with user provided birthday
    const today = new Date();
    const m = today.getMonth() - userBirthdate.getMonth();

    //age calculation
    const age = today.getFullYear() - userBirthdate.getFullYear();
    //ajust age from month and Date 
    if (m < 0 || (m === 0 && today.getDate() < userBirthdate.getDate())) {
        age--;
    }
    console.log("age :", age);

    if (age >= 18) {
      birthdateError.style.display = "none";
      return true;
    }

    birthdateError.style.display = "block";
    return false;

  }

  function isLocationChosen() {
    const radios = document.querySelectorAll('input[name="location"]');
    let boucle = 1; 
   // let selectedRadio = null;
    let locationSelected = false;

    locationError.style.display = 'block'; // set display

    for (const radio of radios) {
    //  selectedRadio = radio;
      console.log("isLocationChosen boucle:",boucle,", ", radio.checked);
      boucle++;
      if (radio.checked) {
        locationSelected = true;
        locationError.style.display = 'none'; // Hide the error message if the format is valid
        console.log("isLocationChosen 1: ", radio.checked);       
        break;
      } 
    };
    return locationSelected;
  }

// add more script ***** BEGIN

function wait4Merci(event, form) {
  event.preventDefault(); // Prevent form submit
  console.log('Form submit prevented. Waiting for closeMerci button click...');
  console.log('Form inactive ...');
  form.classList.add('inactive-form');
  closeDialogBtn.classList.add('inactive-form');


  // This function simulates a loop
  const loop = setInterval(() => {
    if (!isLooping) {
      console.log('Loop stopped.');
      clearInterval(loop);  // Break the loop by clearing the interval
      // Resume form submission here after the loop is stopped
      form.submit();  // Submit the form
    }
  }, 1000);  // Loop every 1000 ms

}



// Add an event listener to the closeMerci button to resume Form submit
document.getElementById('closeMerci').addEventListener('click', () => {
    console.log('Button clicked! Stopping the loop.');

    formulaire.classList.remove('inactive-form');
    closeDialogBtn.classList.remove('inactive-form');
    merciPopup.style.display = 'none';   // Close merci popup
    modalbg.style.display = 'none';   // Close modal popup

    isLooping = false;  // Set the flag to false to stop the loop

});


function nameCheck(uName) {
  console.log("nameCheck uName: ", uName)
  if (!uName || uName.length < 2) {
    return false;
  }
  return true;
}

function firstnameCheck() {
  const name = firstnameInput.value.trim();
  console.log("firstnameCheck name: ", name)
  firstnameError.style.display = 'none';

  if (!nameCheck(name)) {  //name format not valid
    firstnameError.style.display = 'block';
  }
  return nameCheck(name);
}

function lastnameCheck() {
  const name = lastnameInput.value.trim();
  console.log("firstnameCheck name: ", name)
  lastnameError.style.display = 'none';

  if (!nameCheck(name)) {  //name format not valid
    lastnameError.style.display = 'block';
  }
  return nameCheck(name);
}


// Checking valid format while quitting the input fields
firstnameInput.addEventListener('blur', firstnameCheck);
lastnameInput.addEventListener('blur', lastnameCheck);
emailInput.addEventListener('blur', validateEmail);
birthdateInput.addEventListener('blur', validateBirthDate);



// add more script ***** END


/* ********************* */
/*  Form Sumit handling  */
/* ********************* */

let isLooping = true;  //
const myFormulaire = document.getElementById('formulaire');
//  Form Submit event Listening ...
myFormulaire.addEventListener("submit", (event) => {

    // Get form values
    const firstName = document.querySelector('#first').value.trim();
    const lastName = document.querySelector('#last').value.trim();
    const checkbox = document.querySelector('#checkbox1');

    console.log("Start checking ...");

    // Validate form inputs
    if ( !nameCheck(firstName) || !nameCheck(lastName) || !validateEmail() ||
     !validateBirthDate() || !isLocationChosen() || !validateAcception(checkbox)) {

        event.preventDefault();

    } else {
        //alert("Merci !");
        merciPopup.style.display = 'block';
        merciMessage.textContent = "Merci pour votre réservation !";
        console.log("The End ... merciPopup display :", merciPopup.style.display);
        console.log("Entering wait ... modalbg display: ",modalbg.style.display);
        wait4Merci(event, myFormulaire);
    }
})



