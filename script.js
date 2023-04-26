const recognition = new window.webkitSpeechRecognition();
recognition.continuous = true;

const transcriptElement = document.getElementById('transcript');
const recordButton = document.getElementById('record-btn');

let recognizing = false;

recordButton.addEventListener('click', () => {
  if (recognizing) {
    recognition.stop();
    recordButton.textContent = 'Start Recording';
    recognizing = false;
  } else {
    recognition.start();
    recordButton.textContent = 'Stop Recording';
    recognizing = true;
  }
});

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript;
  transcriptElement.value += transcript;
};

recognition.onerror = (event) => {
  console.error(event.error);
};

window.addEventListener('beforeunload', () => {
  if (recognizing) {
    recognition.stop();
  }
});
