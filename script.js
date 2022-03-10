const playButton=document.getElementById('play-button');
const pauseButton=document.getElementById('pause-button');
const stopButton=document.getElementById('stop-button');
const textInput=document.getElementById('text');
const speedInput=document.getElementById('speed');
let currentCharacter;
playButton.addEventListener('click',()=>{
    playText(textInput.value);
})

pauseButton.addEventListener('click',pauseText);
stopButton.addEventListener('click',stopText); 
const utterance=new SpeechSynthesisUtterance();
speedInput.addEventListener('input',()=>{
    stopText();
    // console.log(currentCharacter);
    playText(utterance.text.substring(currentCharacter));   //it will play text after current character so that we can increse speed of text during run time
})
utterance.addEventListener('end',()=>{
    textInput.disabled=false;   //it means it will allow editing only after speech end
})                              //now it will aloow to input data in input field

utterance.addEventListener('boundry',e=>{
    currentCharacter=e.charIndex;      // it will return current character position
})
function playText(text)
{
    if(speechSynthesis.paused &&speechSynthesis.speaking)
        return speechSynthesis.resume(); 
    if(speechSynthesis.speaking)     //if it is speaking then don't run below code again for example if click play button two times so to avoid restart playing of text we have done . 
        return;
        utterance.text=text;
    utterance.rate=speedInput.value || 1; // speed
    textInput.disabled=true; // it means during playing text input field gets disabled i.e. no input will be taken.
    speechSynthesis.speak(utterance); //for speaking it
}

function pauseText()
{
    if(speechSynthesis.speaking)
    speechSynthesis.pause();
}

//in stop text function first we have to resume the text 
//then will cancel the process otherwise it will play from same position again
//first we want it should start from starting
function stopText()
{
    speechSynthesis.resume();
    speechSynthesis.cancel();
}
