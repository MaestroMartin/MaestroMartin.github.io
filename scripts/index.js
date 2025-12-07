
/* Script to load JSON file */
async function loadVideos() {
    try {
        const response = await fetch('/data/videos.json');
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }


        const videos = await response.json();

        const container = document.querySelector('.js-videos')

        let html = '';
        /* render video HTML*/
        videos.forEach(video => {
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
                        ${video.tags
                    .map(tag => `<span class="video-tag">${tag}</span>`)
                    .join('')}
                    </div>
                    <div class="video-meta">
                        <span class="upload-date">Upload Date: </span>
                        <span class="views">Views:${video.views} </span>
                        <span class="author">${video.author}</span>
                        <form class="rating-form">
                            <div class="rating-input">
                                <input type="radio" id="star5" name="rating" value="5">
                                    <label for="star5">★</label>

                                <input type="radio" id="star4" name="rating" value="4">
                                    <label for="star4">★</label>

                                <input type="radio" id="star3" name="rating" value="3">
                                    <label for="star3">★</label>

                                <input type="radio" id="star2" name="rating" value="2">
                                    <label for="star2">★</label>

                                <input type="radio" id="star1" name="rating" value="1">
                                    <label for="star1">★</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        });
        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading videos:', error);
    }
}

loadVideos();

document.querySelectorAll('.rating-form').forEach(form => {
  const videoId = form.dataset.videoId;
  const stored = localStorage.getItem('rating_' + videoId);

  if (stored) {
    const input = form.querySelector(`input[value="${stored}"]`);
    if (input) {
      input.checked = true;
    }
  }

  
  form.addEventListener('change', () => {
    const checked = form.querySelector('input:checked');
    if (!checked) return;

    const value = checked.value;
    localStorage.setItem('rating_' + videoId, value);
  
  });
});