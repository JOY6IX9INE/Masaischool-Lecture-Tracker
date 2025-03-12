const STORAGE_KEY = 'completedLectures';

document.getElementById('download').addEventListener('click', () => {
  chrome.storage.local.get([STORAGE_KEY], (result) => {
    if (chrome.runtime.lastError) return;

    const data = result[STORAGE_KEY] || [];
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'completed.json';
    a.click();
    URL.revokeObjectURL(url);
  });
});

const uploadBtn = document.getElementById('uploadBtn');
const uploadInput = document.getElementById('uploadInput');

uploadBtn.addEventListener('click', () => {
  uploadInput.click();
});

uploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (evt) {
    try {
      const data = JSON.parse(evt.target.result);
      if (Array.isArray(data)) {
        chrome.storage.local.set({ [STORAGE_KEY]: data }, () => {
          if (chrome.runtime.lastError) return;

          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (tab && tab.url.includes("students.masaischool.com/lectures")) {
              chrome.tabs.reload(tab.id);
            }
            window.close();
          });
        });
      } else {
        alert("Invalid JSON Format, Should Be An Array");
      }
    } catch (err) {
      alert("Failed To Parse Uploaded JSON");
    }
  };
  reader.readAsText(file);
});