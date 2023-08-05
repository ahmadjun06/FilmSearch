// Функция для выполнения запроса к OMDb API
// function getMovieInfo(title) {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', 'http://www.omdbapi.com/?t=' + title + '&apikey=5e04301f', true);
//     xhr.onload = function () {
//         if (xhr.status === 200) {
//             let movieInfo = JSON.parse(xhr.responseText);

//             // Информацию о фильме на страницу
//             let moviePhoto = document.querySelector(".movie-photo")
//             moviePhoto,innerHTML = ''
//             moviePhoto.innerHTML += '<img src=' + movieInfo.Poster + ' alt="Photo_film"></img>';

//             let movieDiv = document.getElementById('movie-info');
//             movieDiv.innerHTML = '';
//             movieDiv.innerHTML += '<h2>' + movieInfo.Title + '</h2>';
//             movieDiv.innerHTML += '<p>Год: ' + movieInfo.Year + '</p>';
//             movieDiv.innerHTML += '<p>IMDb-рейтинг: ' + movieInfo.imdbRating + '</p>';
//             movieDiv.innerHTML += '<p>Жанр: ' + movieInfo.Genre + '</p>';
//             movieDiv.innerHTML += '<p>Режиссер: ' + movieInfo.Director + '</p>';
//             movieDiv.innerHTML += '<p>Актеры: ' + movieInfo.Actors + '</p>';
//             movieDiv.innerHTML += '<p class="plot">Сюжет: ' + movieInfo.Plot + '</p>';
//         } else {
//             console.error('Произошла ошибка при выполнении запроса');
//         }
//     };
//     xhr.send();
// }
// getMovieInfo('The Social Network');
function searchMovies() {
    const movieInput = document.getElementById("movieInput");
    const keyword = movieInput.value;

    // Очищаем поле ввода
    movieInput.value = "";

    // Очищаем результаты поиска
    document.getElementById("movies").innerHTML = "";

    // Выполняем запрос к OMDb API
    fetch(`https://www.omdbapi.com/?s=${keyword}&apikey=5e04301f`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                data.Search.forEach(movie => {
                    // Добавляем карточку фильма
                    const movieCard = document.createElement("div");
                    movieCard.classList.add("movie-card");
                    movieCard.innerHTML = `
                <img src="${movie.Poster}">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <button onclick="addToFavorites('${movie.imdbID}')">Добавить в избранное</button>
            `;
                    document.getElementById("movies").appendChild(movieCard);
                });
            } else {
                document.getElementById("movies").innerHTML = "Фильмы не найдены";
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById("movies").innerHTML = "Произошла ошибка";
        });
}

function addToFavorites(imdbID) {
    // Выполняем запрос к OMDb API для получения информации о фильме
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=5e04301f`)
        .then(response => response.json())
        .then(data => {
            // Создаем элемент списка для избранных фильмов
            const favoriteMovie = document.createElement("li");
            favoriteMovie.innerHTML = `${data.Title} (${data.Year})`;

            // Проверяем, есть ли данное imdbID уже в списке избранных фильмов
            const favoriteMovies = document.getElementById("favoriteMovies");
            const existingMovie = favoriteMovies.querySelector(`[data-imdbid="${imdbID}"]`);
            if (existingMovie) {
                existingMovie.classList.add("favorite");
            } else {
                // Добавляем imdbID как атрибут элемента списка
                favoriteMovie.setAttribute("data-imdbid", imdbID);
                favoriteMovies.appendChild(favoriteMovie);
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById("movies").innerHTML = "Произошла ошибка";
        });
}