let mediaRecorder;
let recordedBlobs;

const preview = document.getElementById('preview');

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    preview.srcObject = stream;
    window.stream = stream;
  });

function startRecording() {
  recordedBlobs = [];
  mediaRecorder = new MediaRecorder(window.stream, { mimeType: 'video/webm' });

  mediaRecorder.ondataavailable = event => {
    if (event.data && event.data.size > 0) recordedBlobs.push(event.data);
  };

  mediaRecorder.start();
  console.log('Recording started');
}

function stopRecording() {
  mediaRecorder.stop();
  console.log('Recording stopped');
}

function uploadVideo() {
  const blob = new Blob(recordedBlobs, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);

  // For MVP: download locally or manually upload to OneDrive/Google Drive
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'response_Q1.webm';
  document.body.appendChild(a);
  a.click();
  console.log('Video ready for upload');
}
