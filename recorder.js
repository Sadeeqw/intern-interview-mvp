let mediaRecorder;
let recordedBlobs = [];
const preview = document.getElementById('preview');

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    preview.srcObject = stream;
    window.stream = stream;
  })
  .catch(error => {
    alert('Camera access denied or not available.');
    console.error('getUserMedia error:', error);
  });

function startRecording() {
  recordedBlobs = [];
  mediaRecorder = new MediaRecorder(window.stream, { mimeType: 'video/webm' });

  mediaRecorder.ondataavailable = event => {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  };

  mediaRecorder.start();
  console.log('Recording started');
}

function stopRecording() {
  mediaRecorder.stop();
  console.log('Recording stopped');
}

function downloadVideo(filename) {
  const blob = new Blob(recordedBlobs, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}
``Optional)

```css
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}

.container {
  display: flex;
  gap: 40px;
}

.video-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
