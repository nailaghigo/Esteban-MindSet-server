const modalSection = document.getElementById('modal-section');
// eslint-disable-next-line no-unused-vars
const openModal = () => {
  modalSection.classList.add('modal-section-display-on');
};

// eslint-disable-next-line no-unused-vars
const updateModalInfo = (title, text) => {
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-data-inputs').innerText = text;
};

const closeModal = () => {
  modalSection.classList.remove('modal-section-display-on');
  modalSection.classList.add('modal-display-off');
};

modalSection.onclick = (e) => {
  if (e.target === modalSection) {
    closeModal();
  }
};

const modalCloseBtn = document.getElementById('modal-close-button');
modalCloseBtn.onclick = closeModal;
