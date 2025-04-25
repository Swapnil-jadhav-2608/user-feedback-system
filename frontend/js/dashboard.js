document.addEventListener('DOMContentLoaded', function() {
  const categoryFilter = document.getElementById('categoryFilter');
  const sortBy = document.getElementById('sortBy');
  const feedbackList = document.getElementById('feedbackList');

  // Load feedback when page loads
  loadFeedback();

  // Add event listeners for filters
  categoryFilter.addEventListener('change', loadFeedback);
  sortBy.addEventListener('change', loadFeedback);

  async function loadFeedback() {
    const category = categoryFilter.value;
    const sort = sortBy.value;

    let url = 'http://localhost:5000/api/feedback';
    if (category || sort) {
      url += '?';
      if (category) url += `category=${category}`;
      if (category && sort) url += '&';
      if (sort) url += `sort=${sort}`;
    }

    try {
      const response = await fetch(url);
      const feedbacks = await response.json();

      if (response.ok) {
        displayFeedback(feedbacks);
      } else {
        console.error('Failed to fetch feedback');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function displayFeedback(feedbacks) {
    feedbackList.innerHTML = '';

    if (feedbacks.length === 0) {
      feedbackList.innerHTML = '<p>No feedback found matching your criteria.</p>';
      return;
    }

    feedbacks.forEach(feedback => {
      const feedbackItem = document.createElement('div');
      feedbackItem.className = 'feedback-item';

      const date = new Date(feedback.createdAt).toLocaleString();
      
      // Determine category class
      let categoryClass = '';
      switch(feedback.category) {
        case 'suggestion': categoryClass = 'category-suggestion'; break;
        case 'bug': categoryClass = 'category-bug'; break;
        case 'feature': categoryClass = 'category-feature'; break;
        default: categoryClass = 'category-other';
      }

      feedbackItem.innerHTML = `
        <h3>${feedback.name}</h3>
        <div class="meta">
          <span>${feedback.email}</span> • 
          <span>${date}</span> • 
          <span class="category ${categoryClass}">${feedback.category}</span>
        </div>
        <p>${feedback.feedbackText}</p>
      `;

      feedbackList.appendChild(feedbackItem);
    });
  }
});