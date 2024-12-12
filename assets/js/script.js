const apiKey = 'ljzEOL7rsZOTqkWKzTbcrydqZQyyLZJ05rzYLHW81j70YLCp7BdmokLJ';
const perPage = 9;

function loadImages(query) {
  console.log('Caricamento immagini iniziato:', query);
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`;

  fetch(url, {
    headers: {
      Authorization: apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Dati ricevuti:', data);
      const imageContainer = document.querySelector('.album .row');
      if (!imageContainer) {
        console.error('Container .row non trovato');
        return;
      }
      imageContainer.innerHTML = '';

      data.photos.forEach(photo => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <img src="${photo.src.medium}" class="bd-placeholder-img card-img-top" alt="${photo.photographer}" style="cursor: pointer;">
            <div class="card-body">
              <h5 class="card-title" style="cursor: pointer;">${photo.photographer}</h5>
              <p class="card-text">${photo.alt}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary hide-btn">Hide</button>
                </div>
                <small class="text-muted">${photo.id}</small>
              </div>
            </div>
          </div>
        `;
        imageContainer.appendChild(col);

        const hideBtn = col.querySelector('.hide-btn');
        hideBtn.addEventListener('click', () => {
          col.style.display = 'none';
        });

        const image = col.querySelector('img');
        const photographerName = col.querySelector('.card-title');

        image.addEventListener('click', () => showImageDetail(photo));
        photographerName.addEventListener('click', () => showImageDetail(photo));
      });
      console.log('Immagini caricate con successo');
    })
    .catch(error => console.error('Errore durante il caricamento delle immagini:', error));
}

function showImageDetail(photo) {
  const mainContent = document.querySelector('main');
  const imageDetail = document.getElementById('image-detail');
  const detailImage = document.getElementById('detail-image');
  const detailPhotographer = document.getElementById('detail-photographer');
  const detailArtistLink = document.getElementById('detail-artist-link');
  const backButton = document.getElementById('back-button');
  const footer = document.querySelector('footer');

  mainContent.style.display = 'none';
  imageDetail.style.display = 'block';
  footer.style.display = 'block'; 

  detailImage.src = photo.src.large;
  detailImage.alt = photo.alt;
  detailPhotographer.textContent = `Photo by ${photo.photographer}`;
  detailArtistLink.href = photo.photographer_url;
  detailArtistLink.textContent = photo.photographer_url;

  backButton.addEventListener('click', () => {
    mainContent.style.display = 'block';
    imageDetail.style.display = 'none';
  });

  window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM completamente caricato');
  const loadImagesBtn = document.querySelector('.btn-primary');
  const loadSecondaryImagesBtn = document.querySelector('.btn-secondary');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  if (loadImagesBtn) {
    loadImagesBtn.addEventListener('click', () => loadImages('mountain'));
    console.log('Event listener aggiunto al pulsante Load Images');
  } else {
    console.error('Pulsante Load Images non trovato');
  }

  if (loadSecondaryImagesBtn) {
    loadSecondaryImagesBtn.addEventListener('click', () => loadImages('sunset'));
    console.log('Event listener aggiunto al pulsante Load Secondary Images');
  } else {
    console.error('Pulsante Load Secondary Images non trovato');
  }

  if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        loadImages(query);
      }
    });
    console.log('Event listener aggiunto al pulsante Search');
  } else {
    console.error('Campo di ricerca o pulsante Search non trovato');
  }
});

console.log('Script caricato');

