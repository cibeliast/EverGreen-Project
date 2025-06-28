import { setupStatusModal, showStatus } from './statusModal.js';

document.addEventListener('DOMContentLoaded', () => {
  setupStatusModal();

  const params = new URLSearchParams(window.location.search);
  const successMsg = params.get('success');
  const errorMsg = params.get('error');

  if (successMsg) {
    showStatus(successMsg, '/assets/success.png');
  }

  if (errorMsg) {
    showStatus(errorMsg, '/assets/error.png');
  }
});
