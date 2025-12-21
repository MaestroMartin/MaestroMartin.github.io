/* ====== Global data for each videos ====== */
let allVideos = [];

/* Script to load JSON file */
async function loadVideos() {
  try {
    const response = await fetch('/data/videos.json');
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }

    allVideos = await response.json();      // save all videos
    renderVideos(allVideos);                // first display
    initFilterButtons();                    // on filter buttons
    initRatingForms();                      // switch stars/ rating 
  } catch (error) {
    console.error('Error loading videos:', error);
  }
}

/* ====== rendering card ====== */
function renderVideos(videos) {
  const container = document.querySelector('.js-videos');
  if (!container) return;

  let html = '';

  videos.forEach(video => {
    const voted = video.rating.voted;
    const count = video.rating.count;
    const average = count ? (voted / count).toFixed(1) : 0;

    html += `
      <div class="video-card-info">
        <div class="video-thumbnail">
          <iframe class="video" src="${video.link}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
          </iframe>
        </div>
        <div class="video-content">
          <div class="video-header">
            <h3>${video.title}</h3>
            <p class="video-description">${video.description}</p>
          </div>
          <div class="video-category">
            ${video.tags.map(tag => `<span class="video-tag">${tag}</span>`).join('')}
          </div>
          <div class="video-meta">
            <span class="upload-date">Upload Date: </span>
            <span class="views">Views: ${video.views}</span>
            <span class="author">${video.author}</span>
            <form class="rating-form" data-video-id="${video.video_id}">
              <div class="rating-input">
                <input type="radio" id="star5-${video.video_id}" name="rating-${video.video_id}" value="5">
                <label for="star5-${video.video_id}">★</label>

                <input type="radio" id="star4-${video.video_id}" name="rating-${video.video_id}" value="4">
                <label for="star4-${video.video_id}">★</label>

                <input type="radio" id="star3-${video.video_id}" name="rating-${video.video_id}" value="3">
                <label for="star3-${video.video_id}">★</label>

                <input type="radio" id="star2-${video.video_id}" name="rating-${video.video_id}" value="2">
                <label for="star2-${video.video_id}">★</label>

                <input type="radio" id="star1-${video.video_id}" name="rating-${video.video_id}" value="1">
                <label for="star1-${video.video_id}">★</label>
              </div>
            </form>
            <span class="average-rating">${average}</span>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

/* ====== RATING – connect stars after rending ====== */
function initRatingForms() {
  document.querySelectorAll('.rating-form').forEach(form => {
    const videoId = form.dataset.videoId;
    const stored = localStorage.getItem('rating_' + videoId);

    if (stored) {
      const input = form.querySelector(`input[value="${stored}"]`);
      if (input) input.checked = true;
    }

    form.addEventListener('change', () => {
      const checked = form.querySelector('input:checked');
      if (!checked) return;
      localStorage.setItem('rating_' + videoId, checked.value);
    });
  });
}


function initFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag;

      let filteredVideos;
      if (tag === 'all') {
        filteredVideos = allVideos;
      } else {
        filteredVideos = allVideos.filter(video =>
          Array.isArray(video.tags) &&
          video.tags.some(t => t.toLowerCase() === tag.toLowerCase())
        );
      }

      renderVideos(filteredVideos);
      initRatingForms();   // after render, connect stars
    });
  });
}
/* ====== Pop up login window ====== */
const loginModal = document.querySelector('.js-login-overlay');
const openLoginBtn = document.querySelector('.js-open-login');
const closeLoginBtn = document.querySelector('.js-close-login');

function openLogin(){
    if (!loginModal) return;
    loginModal.classList.add('is-open');
}

function closeLogin(){
    if(!loginModal)return;
    loginModal.classList.remove('is-open');
}

if(openLoginBtn && closeLoginBtn && loginModal){

    openLoginBtn.addEventListener('click', openLogin);

    closeLoginBtn.addEventListener('click', closeLogin);

    loginModal.addEventListener('click', (event) => {
        if (event.target === loginModal){
            closeLogin();
        }
    });
}

/* start */
loadVideos();

