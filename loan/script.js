document.getElementById('loanType').addEventListener('change', function () {
    const personalLoanInfo = document.getElementById('personalLoanInfo');
    const homeLoanInfo = document.getElementById('homeLoanInfo');

    if (this.value === 'personal') {
        personalLoanInfo.style.display = 'block';
        homeLoanInfo.style.display = 'none';
        const personal = document.getElementById('LoanEMICalculate');
        personal.style.display='none';
    } else if (this.value === 'home') {
        personalLoanInfo.style.display = 'none';
        homeLoanInfo.style.display = 'block';
        const personal = document.getElementById('LoanEMICalculate');
        personal.style.display='none';
    } else {
        personalLoanInfo.style.display = 'none';
        homeLoanInfo.style.display = 'none';
        const personal = document.getElementById('LoanEMICalculate');
        personal.style.display='none';
    }
});

function displayErrorMessage(message) {
    alert(message);
}
function calculateEMI() {
    const loantype=document.getElementById('loanType').value;
    const emailError = document.getElementById('emailError').textContent;
    const mobileError = document.getElementById('mobileNumberError').textContent;

    if (emailError || mobileError) {
        displayErrorMessage('Please fix errors in email or mobile number fields');
        return;
    }
    const age = parseInt(document.getElementById('age').value);
    if (age < 18 || age==null) {
        displayErrorMessage('Age should be greater than or equal to 18');
        return;
    }
    const expChecks = parseInt(document.getElementById('workExperience').value);
    if(!expChecks || expChecks<1){
        displayErrorMessage('Experience should be more than a year');
        return;
    }

    // Get loan amount and interest rate
    let principles, interestRate;
    if (loantype === 'personal') {
        principles = parseFloat(document.getElementById('loanAmount').value);
        interestRate = parseFloat(document.getElementById('interestRate').value);
    } else if (loantype === 'home') {
        principles = parseFloat(document.getElementById('loanAmountHome').value);
        interestRate = parseFloat(document.getElementById('interestRatehome').value);
    }

    if (!principles || !interestRate) {
        displayErrorMessage('Please enter loan amount and interest rate');
        return;
    }
    if (principles < 1000 || principles > 50000000 || principles==null) {
        displayErrorMessage('Loan amount should be between 1000 rupees and 5 crores');
        return;
    }
    if (interestRate <= 0 || interestRate==null) {
        displayErrorMessage('Interest rate should be greater than 0');
        return;
    }
    

   /*  const requiredFields = document.querySelectorAll('#loanForm [required]');
    let allFieldsEntered = true;

    requiredFields.forEach(field => {
        if (!field.value) {
            allFieldsEntered = false;
        }
    });

    if (!allFieldsEntered) {
        displayErrorMessage('All Fields are Required');
        return;
    } */

    

    if(loantype=='personal'){
       
        const personal = document.getElementById('LoanEMICalculate');
        personal.style.display = 'block';
    
        const principle = document.getElementById('loanAmount').value;
        const interest = document.getElementById('interestRate').value;
        const time = document.getElementById('loanDuration').value;
        const loanemi = document.getElementById('loanemi');
        const totalinterest = document.getElementById('TotalInterest');
        const totalamount = document.getElementById('amountotal');
    
        const principal = parseFloat(principle);
        const CalculateInterest = parseFloat(interest) / 12/100;
        const calculatedPayments = parseFloat(time);
    
        const x = Math.pow(1 + CalculateInterest, calculatedPayments);
        const monthly = (principal * x * CalculateInterest) / (x - 1);
        const monthlyPayment = monthly.toFixed(2);
    
        const totalInterest = (monthly * calculatedPayments - principal).toFixed(2);
        const totalPayment = (monthly * calculatedPayments).toFixed(2);
    
        loanemi.value = monthlyPayment;
        totalinterest.value = totalInterest;
        totalamount.value = totalPayment;
    }else if(loantype=='home'){
        const personalhome = document.getElementById('LoanEMICalculate');
        personalhome.style.display = 'block';
    
        const principlehome = document.getElementById('loanAmountHome').value;
        const interesthome = document.getElementById('interestRatehome').value;
        const timehome = document.getElementById('loanDurationHome').value;
        const loanemihome = document.getElementById('loanemi');
        const totalinteresthome = document.getElementById('TotalInterest');
        const totalamounthome = document.getElementById('amountotal');
    
        const principalhome = parseFloat(principlehome);
        const CalculateInteresthome = parseFloat(interesthome) / 12/100;
        const calculatedPaymentshome = parseFloat(timehome);
    
        const xh = Math.pow(1 + CalculateInteresthome, calculatedPaymentshome);
        const monthlyhome = (principalhome * xh * CalculateInteresthome) / (xh - 1);
        const monthlyPaymenthome = monthlyhome.toFixed(2);
    
        const totalInteresthome = (monthlyhome * calculatedPaymentshome - principalhome).toFixed(2);
        const totalPaymenthome = (monthlyhome * calculatedPaymentshome).toFixed(2);

        loanemihome.value = monthlyPaymenthome;
        totalinteresthome.value = totalInteresthome;
        totalamounthome.value = totalPaymenthome;
    }
    
}



function calculateAge() {
    const dobInput = document.getElementById('dob');
    const ageInput = document.getElementById('age');

    if (dobInput.value) {
        const dob = new Date(dobInput.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        
        if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
            ageInput.value = age - 1;
        } else {
            ageInput.value = age;
        }
        if(age<=0){
            ageInput.value=0;
        }
    }
}
function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = 'Invalid email format';
    } else {
        emailError.textContent = '';
    }
}

function validateMobileNumber() {
    const mobileInput = document.getElementById('mobile');
    const mobileError = document.getElementById('mobileNumberError');
    const mobilePattern = /^[0-9]{10}$/;

    if (!mobilePattern.test(mobileInput.value)) {
        mobileError.textContent = 'Mobile number should be 10 digits';
    } else {
        mobileError.textContent = '';
    }
}
function validateAge(){
    const ageCheck = parseInt(document.getElementById('age').value);
    const ageerror=document.getElementById('ageError');
    if (ageCheck < 18 || !ageCheck) {
      ageerror.textContent='Age should be greater than 18';
    }else{
        ageerror.textContent='';
    }
}
 function validateExp(){
    const expCheck = parseInt(document.getElementById('workExperience').value);
    const expError=document.getElementById('expError');
    if(!expCheck || expCheck<1){
        expError.textContent='Experience should be more than a year'
    }else{
        expError.textContent='';
    }
 }
function validateInterest(){
const interestrates=parseFloat(document.getElementById('interestRate').value);
const intererror=document.getElementById('interestError');
if(interestrates<=0 ){
intererror.textContent='Interest Should be more than 0'
}else{
    intererror.textContent='';
}
  }
  function validateAmount(){
const amount=parseInt(document.getElementById('loanAmount').value);
const amterror=document.getElementById('amountError');
if(amount<1000 || amount>50000000){
    amterror.textContent='Amount should be less than 5cr and more than 1000';
}else{
    amterror.textContent='';
}
  }
calculateAge();