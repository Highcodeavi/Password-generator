const inputSlider= document.querySelector("[data-lengthSlider]");
const lengthDisplay= document.querySelector("[password-Length]");
const passwordDisplay= document.querySelector("[password-Dsp]");
const copyBtn= document.querySelector("[cpy-Btn]");
const copyMsg= document.querySelector("[data-copied]");
const uppercaseCheck= document.querySelector("#uppercase");
const lowercaseCheck= document.querySelector("#lowercase");
const numbersCheck= document.querySelector("#numbers");
const symbolsCheck= document.querySelector("#symbols");
const indicator= document.querySelector("[data-indicator]");
const generateBtn= document.querySelector(".generate-password");
const allcheckBox= document.querySelectorAll("input[type=checkbox]");
const symbols ="~@%*&+$?";

let password= "";
let passwordlength= 7;
let checkCount= 0;

handleSlider();

setIndicator("#ccc");

function shufflePassword(array){
                                                                      //Fisher yates 
    for(let i =array.length-1; i> 0; i--){
        const j =Math.floor(Map,random()* (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => {str += el});
    return str;
}

//slider function

function handleSlider(){
    inputSlider.value = passwordlength;
    lengthDisplay.innerText= passwordlength;
}


//indicator function  
function setIndicator(color){
    indicator.style.backgroundColor= color;
}

function getRandInteger(min, max){
   return Math.floor(Math.random() * [max-min]) + min;
};

function getRandNumber(){
    return getRandInteger(0,9)
};

function generateLowercase(){
    return String.fromCharCode(getRandInteger(97,122))
};

function generateUppercase(){
    return String.fromCharCode(getRandInteger(65,90))
};

function generateSymbol(){
    let randomNum = getRandInteger(0, symbols.length);
    return symbols.charAt(randomNum);
    
};

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNumber=false;
    let hasSymbol=false;

    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasUpper=true;
    if(numbersCheck.checked) hasUpper=true;
    if(symbolsCheck.checked) hasUpper=true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordlength >= 8) {
        setIndicator("#7FFF00");
    }
    else if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordlength <= 8){
        setIndicator("#FFD700");
    }
    else if(hasUpper && hasLower && passwordlength <= 8){
        setIndicator("#FF8C00");
    }
    else if(hasLower && passwordlength <= 8){
        setIndicator("#8B0000");
    }

}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);   // to copy text to clipboard
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }
    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active")
    }, 2000);
}


inputSlider.addEventListener('input', (e) => {
    passwordlength= e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () =>{
    if(passwordDisplay.value){
        copyContent();
    }
});

allcheckBox.forEach( (checkbox) =>{
    checkbox.addEventListener('change', ()=>{
        checkCount=0;
        allcheckBox.forEach((checkbox)=>{
            if(checkbox.checked){
                checkCount++;
            }
        })
    })
});

generateBtn.addEventListener('click', ()=>{
    if(checkCount == 0) return;

    if(passwordlength < checkCount){
        passwordlength = checkCount;
        handleSlider();
    }

    password ="";

    let funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push(generateUppercase);
    }

    if(lowercaseCheck.checked){
        funcArr.push(generateLowercase);

    }if(numbersCheck.checked){
        funcArr.push(getRandNumber);

    }if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    

    for(let i=0; i<(passwordlength-funcArr.length); i++){
        let randIndex= getRandInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    // password = shufflePassword();

    passwordDisplay.value=password;
    calcStrength();


})