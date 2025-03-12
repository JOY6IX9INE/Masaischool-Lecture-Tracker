# ✅ Masai Lecture Completion Tracker – Chrome Extension

A lightweight Chrome Extension to help students of [Masai School](https://students.masaischool.com/lectures) keep track of their completed lectures effortlessly.

---

## ✨ Features

- ✅ Mark lectures as **Completed**
- 🔁 Easily **Unmark** any lecture by clicking again
- 💾 Stores data **locally using Chrome's storage**
- 📥 **Export** your completed lectures list as a `completed.json` file
- 📤 **Import** a backup JSON file to restore your progress
- 🔒 Works **only on**: `https://students.masaischool.com/lectures`

---

## 📷 Preview

> *(Add your screenshot here: `/assets/screenshot.png`)*

---

## 🚀 Installation

1. **Clone or Download** this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer Mode** (top-right corner).
4. Click **“Load Unpacked”**.
5. Select the folder where you saved the extension files.

---

## 📁 Folder Structure

```
masai-lecture-tracker/
├── manifest.json
├── content.js
├── popup.html
├── popup.js
├── style.css
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── assets/
    └── screenshot.png
```

---

## 💡 How to Use

1. Navigate to: `https://students.masaischool.com/lectures`
2. You'll see a **“MARK AS COMPLETED”** button beside each lecture.
3. Click to mark ✅ or click again to unmark.
4. Click the **extension icon** in the toolbar:
   - 📥 **Download Backup** (saves your lecture list as `completed.json`)
   - 📤 **Upload Backup** (restores your list and refreshes the page)
5. A quick embed shows clear **Instructions** in the popup for your convenience.

---

## 🛠 Tech Stack

- HTML / CSS / JavaScript
- Chrome Extensions API
- `chrome.storage.local` for local data handling

---

## 📄 License

MIT License — Free to use, modify, and share.

---

## 🙌 Credits

Crafted with ❤️ by a fellow Masai student to simplify tracking your learning journey.

---

## 🤝 Contribute

Contributions and pull requests are most welcome!  
Found a bug or want a feature? Open an issue or PR.

