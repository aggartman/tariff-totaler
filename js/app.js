// Simple toggle for FAQ items
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const isOpen = answer.style.display === 'block';

    answer.style.display = isOpen ? 'none' : 'block';
    question.style.color = isOpen ? 'var(--dark)' : 'var(--primary)';
    question.style.fontWeight = isOpen ? '600' : '700';
    question.style.after = isOpen ? '+' : '-';
  });

  // Initially hide answers
  question.nextElementSibling.style.display = 'none';
});

// Modal functionality
// Find the Contact Us link and add the event listener
document.addEventListener('DOMContentLoaded', function() {
  // Get all footer links
  const footerLinks = document.querySelectorAll('.footer-column a');

  // Find the Contact Us link
  let contactLink = null;
  footerLinks.forEach(link => {
    if (link.textContent.trim() === 'Contact Us') {
      contactLink = link;
    }
  });

  // If found, add click event listener
  if (contactLink) {
    const modal = document.getElementById('contactModal');
    const closeButton = document.querySelector('.close-modal');
    const cancelButton = document.querySelector('.cancel-button');
    const contactForm = document.getElementById('contactForm');

    // Function to open the modal
    function openModal() {
      modal.style.display = 'flex';
      setTimeout(() => {
        modal.classList.add('show');
      }, 10);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Function to close the modal
    function closeModal() {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
      }, 300);
    }

    // Open modal on click
    contactLink.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });

    // Close modal when clicking X or Cancel
    closeButton.addEventListener('click', closeModal);
    cancelButton.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Log data (would normally send to server)
      console.log('Form submitted:', {
        name, email, subject, message
      });

      // Show success message
      const modalBody = document.querySelector('.modal-body');
      modalBody.innerHTML = `
                    <div class="success-checkmark">
                        <div class="check-icon"></div>
                    </div>
                    <h3 style="text-align: center; color: var(--light);">Message Sent!</h3>
                    <p style="text-align: center;">Thanks for reaching out, ${name}. We'll get back to you shortly.</p>
                    <div style="text-align: center; margin-top: 20px;">
                        <button class="submit-button" id="close-success-button">Close</button>
                    </div>
                `;

      // Add event listener to new close button
      document.getElementById('close-success-button').addEventListener('click', closeModal);

      // Auto close after 4 seconds
      setTimeout(closeModal, 4000);
    });

    // Make closeModal available globally
    window.closeModal = closeModal;
  } else {
    console.error("Contact Us link not found in the footer");
  }
});
