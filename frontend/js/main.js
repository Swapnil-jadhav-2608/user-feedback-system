document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const messageDiv = document.getElementById('message');
  
    feedbackForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        category: document.getElementById('category').value,
        feedbackText: document.getElementById('feedbackText').value
      };
  
      try {
        const response = await fetch('http://localhost:5000/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
  
        const data = await response.json();
  
        if (response.ok) {
          showMessage('Feedback submitted successfully!', 'success');
          feedbackForm.reset();
        } else {
          showMessage(data.error || 'Failed to submit feedback', 'error');
        }
      } catch (error) {
        showMessage('Network error. Please try again later.', 'error');
        console.error('Error:', error);
      }
    });
  
    function showMessage(message, type) {
      messageDiv.textContent = message;
      messageDiv.className = `message ${type}`;
      setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
      }, 5000);
    }
  });