
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
                        <span class="stars"> Stars there wanna be</span>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    }catch (error) {
        console.error('Error loading videos:', error);
    }
}

loadVideos();