
var url = 'https://jsonplaceholder.typicode.com/albums/2/photos';
var photoContainer = document.getElementById('photo-container');
let numPhotos = 50;
var photoCount = document.getElementById('photo-count');

async function fetchPhotos() {
   
    try {
        var response = await fetch(url);
        var photos = await response.json();
        photoCount.textContent = `There are ${50} photo(s) to be shown. `;
        numPhotos = photos.length;
        
        const photoCards = photos.map(photo => {
            const card = document.createElement('div');
            card.className = 'photo-card';
            const img = document.createElement('img');
            img.className = 'photo-img';
            img.src = photo.url;
            const title = document.createElement('p');
            title.className = 'photo-title';
            title.textContent = photo.title;
           
            card.appendChild(img);
            card.appendChild(title);
            card.addEventListener('click', () => {
                card.style.opacity = 0;
                setTimeout(() => {
                    card.remove();
                    numPhotos--;
                    photoCount.textContent = `There are ${numPhotos} photo(s) to be shown.`;
                }, 1000);
            });
            return card;
        });
        photoContainer.append(...photoCards);
 
    } catch (error) {
        console.error(error);
    }
}


fetchPhotos();
