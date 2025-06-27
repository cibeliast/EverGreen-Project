// statusModal.js
export function setupStatusModal() {
  if (document.getElementById('statusModal')) {
    console.log("Modal already exists");
    return;
  }

console.log("Inserting modal HTML...");
  const modalHTML = `
  <div class="modal fade" id="statusModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
      <div class="modal-content p-3 d-flex flex-column justify-content-center align-items-center text-center" style="height: 220px; border-radius: 16px;">
        <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
        <img id="statusIcon" src="" alt="icon" class="mx-auto mb-3" style="width: 80px; height: 80px;  border-radius: 0 !important; object-fit: contain;">
        <h5 id="statusMessage" class="fw-bold mb-0" style="color: black">Status Message Here</h5>
      </div>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

export function showStatus(message, imageUrl) {
  const icon = document.getElementById('statusIcon');
  const msg = document.getElementById('statusMessage');

  icon.src = imageUrl;
  msg.textContent = message;

  const modal = new bootstrap.Modal(document.getElementById('statusModal'));
  modal.show();
}