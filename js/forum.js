/**
 * ============================================
 * FARM FRESH NIGERIA - FORUM.JS
 * Community forum with posts, comments, and localStorage
 * ============================================
 */

(function () {
  'use strict';

  // ----- FORUM DATA (with Nigerian context) -----
  const FORUM_STORAGE_KEY = 'farmFreshNigeriaForum';
  const DEFAULT_POSTS = [
    {
      id: 1739100000001,
      title: "Best time to plant maize in Abuja?",
      category: "crops",
      content: "I'm planning to start maize farming on my 2-hectare plot in Abuja. When is the best planting time, and what varieties do well here?",
      author: "James K.",
      date: "2026-02-10",
      comments: [
        { author: "Mary W.", comment: "Plant with the first rains (March-April). SAMMAZ varieties do well in the North Central region.", date: "2026-02-11" },
        { author: "Ibrahim S.", comment: "Make sure you have good drainage. I use DK 777 and get great yields.", date: "2026-02-12" }
      ]
    },
    {
      id: 1739200000002,
      title: "Tomatoes have spots on leaves – help!",
      category: "pests",
      content: "My tomato plants are developing dark spots on the lower leaves. What could this be and how do I treat it organically?",
      author: "Peter M.",
      date: "2026-02-12",
      comments: [
        { author: "Dr. Aisha (Agronomist)", comment: "Sounds like early blight. Remove affected leaves and spray with neem oil solution. Ensure good air circulation.", date: "2026-02-13" }
      ]
    },
    {
      id: 1739300000003,
      title: "Where to rent a tractor in Benue State?",
      category: "equipment",
      content: "I need to plow 5 hectares for rice cultivation near Makurdi. Any reliable tractor hire services?",
      author: "Oche D.",
      date: "2026-02-14",
      comments: []
    }
  ];

  // ----- DOM ELEMENTS -----
  const postsContainer = document.getElementById('forum-posts');
  const statsContainer = document.getElementById('forum-stats');
  const topicCloud = document.getElementById('topic-cloud');
  const form = document.getElementById('forum-post-form');

  // ----- STATE -----
  let forumPosts = [];

  // ----- INITIALIZATION -----
  function init() {
    loadPosts();
    renderStats();
    renderTopicCloud();
    renderPosts();
    attachEventListeners();
  }

  // ----- LOAD/SAVE FROM LOCALSTORAGE -----
  function loadPosts() {
    const stored = localStorage.getItem(FORUM_STORAGE_KEY);
    if (stored) {
      try {
        forumPosts = JSON.parse(stored);
      } catch {
        forumPosts = [...DEFAULT_POSTS];
      }
    } else {
      forumPosts = [...DEFAULT_POSTS];
      savePosts();
    }
  }

  function savePosts() {
    localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(forumPosts));
  }

  // ----- RENDER STATS CARDS -----
  function renderStats() {
    if (!statsContainer) return;

    const totalPosts = forumPosts.length;
    const totalComments = forumPosts.reduce((sum, post) => sum + post.comments.length, 0);
    const uniqueAuthors = new Set(forumPosts.map(p => p.author)).size;
    // Simulated online count (random for demo)
    const onlineNow = Math.floor(Math.random() * 50) + 20;

    statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-number">${totalPosts}</div>
                <div>Discussions</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${totalComments}</div>
                <div>Replies</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${uniqueAuthors}</div>
                <div>Contributors</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${onlineNow}</div>
                <div>Online Now</div>
            </div>
        `;
  }

  // ----- RENDER TOPIC CLOUD -----
  function renderTopicCloud() {
    if (!topicCloud) return;

    const categories = [...new Set(forumPosts.map(p => p.category))];
    const categoryNames = {
      crops: '🌽 Crops',
      pests: '🐛 Pest Control',
      equipment: '🚜 Equipment',
      market: '💰 Market',
      general: '💬 General'
    };

    const html = categories.map(cat =>
      `<span class="topic-tag">${categoryNames[cat] || cat}</span>`
    ).join('');

    topicCloud.innerHTML = html || '<span class="topic-tag">🌱 Farming</span>';
  }

  // ----- RENDER ALL POSTS -----
  function renderPosts() {
    if (!postsContainer) return;

    if (forumPosts.length === 0) {
      postsContainer.innerHTML = '<p class="no-results">No discussions yet. Be the first to start one!</p>';
      return;
    }

    // Sort by newest first
    const sortedPosts = [...forumPosts].sort((a, b) => b.id - a.id);

    const html = sortedPosts.map(post => {
      const categoryDisplay = {
        crops: '🌽 Crops',
        pests: '🐛 Pest Control',
        equipment: '🚜 Equipment',
        market: '💰 Market',
        general: '💬 General'
      }[post.category] || post.category;

      const commentsHtml = post.comments.length ? post.comments.map(comment => `
                <div class="comment">
                    <strong>${escapeHtml(comment.author)}</strong> 
                    <small>${comment.date}</small>
                    <p>${escapeHtml(comment.comment)}</p>
                </div>
            `).join('') : '<p class="no-comments">No replies yet. Be the first to respond!</p>';

      return `
                <div class="post-card" data-post-id="${post.id}">
                    <div class="post-header">
                        <span class="post-author">👤 ${escapeHtml(post.author)}</span>
                        <span class="post-date">${post.date}</span>
                    </div>
                    <span class="topic-tag">${categoryDisplay}</span>
                    <h3 class="post-title">${escapeHtml(post.title)}</h3>
                    <p class="post-content">${escapeHtml(post.content).replace(/\n/g, '<br>')}</p>
                    
                    <div class="comment-section">
                        <h4>💬 Replies (${post.comments.length})</h4>
                        <div class="comments-list">
                            ${commentsHtml}
                        </div>
                        
                        <form class="comment-form" data-post-id="${post.id}">
                            <div class="comment-input-group">
                                <input type="text" class="comment-author" placeholder="Your name" required value="Farmer">
                                <input type="text" class="comment-text" placeholder="Write a reply..." required>
                            </div>
                            <button type="submit" class="btn btn-small">Post Reply</button>
                        </form>
                    </div>
                </div>
            `;
    }).join('');

    postsContainer.innerHTML = html;
  }

  // Simple XSS prevention
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ----- EVENT LISTENERS (Delegation) -----
  function attachEventListeners() {
    // New post form submission
    if (form) {
      form.addEventListener('submit', handleNewPost);
    }

    // Comment form submissions (event delegation)
    if (postsContainer) {
      postsContainer.addEventListener('submit', (e) => {
        const commentForm = e.target.closest('.comment-form');
        if (!commentForm) return;
        e.preventDefault();
        handleNewComment(commentForm);
      });
    }
  }

  // ----- CREATE NEW POST -----
  function handleNewPost(e) {
    e.preventDefault();

    const titleInput = document.getElementById('post-title');
    const categoryInput = document.getElementById('post-category');
    const contentInput = document.getElementById('post-content');
    const authorInput = document.getElementById('post-author');

    const title = titleInput.value.trim();
    const category = categoryInput.value;
    const content = contentInput.value.trim();
    const author = authorInput.value.trim();

    if (!title || !category || !content || !author) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      category,
      content,
      author,
      date: new Date().toISOString().split('T')[0],
      comments: []
    };

    forumPosts.unshift(newPost);
    savePosts();

    // Reset form
    form.reset();

    // Update UI
    renderPosts();
    renderStats();
    renderTopicCloud();

    showToast('Your discussion has been posted! 🌱', 'success');
  }

  // ----- ADD COMMENT TO POST -----
  function handleNewComment(form) {
    const postId = parseInt(form.dataset.postId);
    const authorInput = form.querySelector('.comment-author');
    const textInput = form.querySelector('.comment-text');

    const author = authorInput.value.trim();
    const commentText = textInput.value.trim();

    if (!author || !commentText) {
      showToast('Please enter your name and reply', 'error');
      return;
    }

    const post = forumPosts.find(p => p.id === postId);
    if (!post) return;

    post.comments.push({
      author,
      comment: commentText,
      date: new Date().toISOString().split('T')[0]
    });

    savePosts();
    renderPosts();
    renderStats();

    showToast('Reply added!', 'success');
  }

  // ----- TOAST NOTIFICATION (uses main.js if available) -----
  function showToast(message, type = 'info') {
    if (typeof window.showToast === 'function') {
      window.showToast(message, type);
    } else {
      alert(message); // fallback
    }
  }

  // ----- EXPORT (if needed) -----
  window.refreshForum = function () {
    loadPosts();
    renderPosts();
    renderStats();
    renderTopicCloud();
  };

  // ----- START -----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();