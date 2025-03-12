(function () {
    const STORAGE_KEY = 'completedLectures';
  
    function getCompletedLectures(callback) {
      chrome.storage.local.get([STORAGE_KEY], (result) => {
        callback(result[STORAGE_KEY] || []);
      });
    }
  
    function saveCompletedLectures(ids) {
      chrome.storage.local.set({ [STORAGE_KEY]: ids });
    }
  
    function markAsCompleted(lectureId, buttonElement) {
      getCompletedLectures((lectures) => {
        if (!lectures.includes(lectureId)) {
          lectures.push(lectureId);
          saveCompletedLectures(lectures);
        }
        renderCompletedLabel(lectureId, buttonElement);
      });
    }
  
    function unmarkAsCompleted(lectureId, labelElement) {
      getCompletedLectures((lectures) => {
        const updated = lectures.filter((id) => id !== lectureId);
        saveCompletedLectures(updated);
        renderMarkButton(lectureId, labelElement);
      });
    }
  
    function createCompletedLabel(lectureId) {
      const completedBtn = document.createElement('button');
      completedBtn.textContent = '✅ COMPLETED';
      completedBtn.className = 'lecture-completed-btn';
      applyIOSButtonStyle(completedBtn, '#005214');
  
      completedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        unmarkAsCompleted(lectureId, completedBtn);
      });
  
      return completedBtn;
    }
  
    function renderCompletedLabel(lectureId, buttonElement) {
      const label = createCompletedLabel(lectureId);
      buttonElement.replaceWith(label);
    }
  
    function renderMarkButton(lectureId, labelElement) {
      const btn = document.createElement('button');
      btn.textContent = 'MARK AS COMPLETED';
      btn.className = 'lecture-complete-btn';
      applyIOSButtonStyle(btn, '#007aff');
  
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        markAsCompleted(lectureId, btn);
      });
  
      labelElement.replaceWith(btn);
    }
  
    function applyIOSButtonStyle(button, bgColor) {
      button.style.padding = '6px 12px';
      button.style.fontSize = '13px';
      button.style.fontWeight = '500';
      button.style.borderRadius = '999px';
      button.style.border = 'none';
      button.style.cursor = 'pointer';
      button.style.backgroundColor = bgColor;
      button.style.color = '#fff';
      button.style.fontFamily =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif';
      button.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.15)';
      button.style.marginLeft = '6px';
    }
  
    function initLectureCards() {
      getCompletedLectures((completed) => {
        const lectureLinks = document.querySelectorAll('a[href^="/lectures/"]');
  
        lectureLinks.forEach((link) => {
          const href = link.getAttribute('href');
          const match = href.match(/\/lectures\/(\d+)/);
          if (!match) return;
  
          const lectureId = match[1];
          const titleElement = link.querySelector('h4');
          if (!titleElement) return;
  
          const parent = titleElement.parentElement;
  
          if (
            parent.querySelector('.lecture-complete-btn') ||
            parent.querySelector('.lecture-completed-btn')
          ) {
            return;
          }
  
          if (completed.includes(lectureId)) {
            const label = createCompletedLabel(lectureId);
            parent.appendChild(label);
          } else {
            const btn = document.createElement('button');
            btn.textContent = 'MARK AS COMPLETED';
            btn.className = 'lecture-complete-btn';
            applyIOSButtonStyle(btn, '#007aff');
  
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              markAsCompleted(lectureId, btn);
            });
  
            parent.appendChild(btn);
          }
        });
      });
    }
  
    window.addEventListener('load', () => {
      initLectureCards();
  
      const observer = new MutationObserver(() => {
        initLectureCards();
      });
  
      observer.observe(document.body, { childList: true, subtree: true });
    });
  })();
  