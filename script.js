const playButton=document.getElementById('play-button');
const pauseButton=document.getElementById('pause-button');
const stopButton=document.getElementById('stop-button');
const textInput=document.getElementById('text');
const speedInput=document.getElementById('speed');

playButton.addEventListener('click',()=>{
    playText(textInput.value);
})

pauseButton.addEventListener('click',pauseText);
stopButton.addEventListener('click',stopText); 
function playText(text)
{
    if(speechSynthesis.paused &&speechSynthesis.speaking)
        return speechSynthesis.resume(); 
    const utterance=new SpeechSynthesisUtterance(text);
    utterance.rate=speedInput.value || 1; // speed
    textInput.disabled=true; // it means during playing text input field gets disabled i.e. no input will be taken.
    speechSynthesis.speak(utterance); //for speaking it
    utterance.addEventListener('end',()=>{
        textInput.disabled=false;   //it means it will allow editing after speech end
    })
}

function pauseText()
{
    if(speechSynthesis.speaking)
    speechSynthesis.pause();
}

function stopText()
{

}
