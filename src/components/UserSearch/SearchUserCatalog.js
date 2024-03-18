import React from "react"

const UserCatalog = ({ films, currentGenre, username}) => {
  return (
    <article className="user-films">
      <div id="title">
        <h1>{currentGenre} Movies that {username} liked</h1>
        <h3>Includes all the movies that {username} rated at least 3+ stars</h3>
      </div>
      <section id="favouriteFilms">
        {films
          .filter((film) => film.Genre.includes(currentGenre))
          .map((film, index) => {
            return (
              <div className="card searched-user" key={index}>
                <a href={`/film/${film.Title}`}>
                  <img
                    className="card-img-top"
                    src={film.Poster}
                    alt="Cardcap"
                  />
                </a>
                <div className="card-body">
                  <h5 className="card-title">{film.Title}</h5>
                  <p className="card-text">
                    {(film.rating).toFixed(1)} <i className="far fa-star"></i> User<br></br>
                    {(film.imdbRating/2).toFixed(1)} <i className="far fa-star"></i> IMDb
                  </p>
                </div>
              </div>
            )
          })}
      </section>
    </article>
  )
}

export default UserCatalog
