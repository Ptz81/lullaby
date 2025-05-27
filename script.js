let cardList = document.createElement('ul');
cardList.className = 'cardList';

let wrapper = document.getElementById('wrapper');
wrapper.appendChild(cardList);

async function getData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error("Problem with receiving data. Try again")
        }
        let data = await response.json();
        // console.log(data)
        data.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('card');

            const img = document.createElement('img');
            img.classList.add('card_img');
            img.src = item.img;
            img.alt = item.title;

            const title = document.createElement('h3');
            title.classList.add('card_title');
            title.textContent = item.title;

            const text = document.createElement('p');
            text.classList.add('card_text');
            text.textContent = item.text;

            const audio = document.createElement('audio');
            audio.classList.add('card_audio');
            audio.controls = true;
            const source = document.createElement('source');
            source.classList.add('card_source');
            source.src = item.audio;
            source.type = 'audio/mp3';
            audio.appendChild(source);

            li.appendChild(img);
            li.appendChild(title);
            li.appendChild(text);
            li.appendChild(audio);

            cardList.appendChild(li);
        });

    }
    catch (err) {
        console.error("Помилка завантаження карток:", error.message);
    }
}

document.addEventListener('DOMContentLoaded', getData);

let videoList = document.createElement('ul');
videoList.className = 'videoList';
let videoContainer = document.getElementById('video');
videoContainer.appendChild(videoList);

async function getVideo() {
    try {
        const response = await fetch('./video.json');
        if (!response.ok) {
            throw new Error("Problem with receiving data. Try again");
        }

        const data = await response.json();
        // console.log(data);

        data.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('video');

            const titlesList = document.createElement('ul');
            titlesList.classList.add('video_titles');
            item.title.forEach(songTitle => {
                const songItem = document.createElement('li');
                songItem.textContent = songTitle;
                titlesList.appendChild(songItem);
            });

            const videoWrapper = document.createElement('div');
            videoWrapper.classList.add('video_wrapper');
            videoWrapper.style.position = 'relative';
            videoWrapper.style.width = '560px';
            videoWrapper.style.height = '315px';

            const poster = document.createElement('img');
            poster.src = item.poster || './assets/default-poster.jpg';
            poster.alt = 'Video poster';
            poster.classList.add('video_poster');
            poster.style.width = '100%';
            poster.style.height = '100%';
            poster.style.objectFit = 'cover';
            poster.style.cursor = 'pointer';
            poster.style.position = 'absolute';
            poster.style.top = '0';
            poster.style.left = '0';
            poster.style.zIndex = '2';

            const iframe = document.createElement('iframe');
            iframe.classList.add('card_video');
            iframe.width = "560";
            iframe.height = "315";
            iframe.src = ""; 
            iframe.title = "YouTube video player";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.zIndex = '1';

            poster.addEventListener('click', () => {
                iframe.src = convertYouTubeLink(item.video);
                poster.remove(); 
            });

            videoWrapper.appendChild(iframe);
            videoWrapper.appendChild(poster);

            li.appendChild(titlesList);
            li.appendChild(videoWrapper);
            videoList.appendChild(li);
        });

    } catch (err) {
        console.error("Помилка завантаження карток:", err.message);
    }
}

document.addEventListener('DOMContentLoaded', getVideo);

function convertYouTubeLink(url) {
    const videoId = url.match(/(?:\/|v=)([A-Za-z0-9_-]{11})/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=1` : '';
}
