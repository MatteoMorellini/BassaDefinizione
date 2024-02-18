import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar.js"
import Footer from "../Footer.js"
import UserSidebar from "./SearchUserSidebar.js"
import "./searchUserCatalog.css"
import UserCatalog from "./SearchUserCatalog.js"

const SearchUserFilms = ({ token, setToken}) => {
  const [currentGenre, setCurrentGenre] = useState("")
  const genres = useRef()
  const [isRendered, setIsRendered] = useState(false)
  const films = useRef()
  const { userId } = useParams()
  const clicked = useRef(false)
  const allGenres = useRef()
  const [followed, setFollowed] = useState(false)
  const [buttonText, setButtonText] = useState('Follow'); // Initial text
  const [buttonColor, setButtonColor] = useState('#68beff');
  const [followers, setFollowers] = useState(0)
  const [followings, setFollowings] = useState(0)

  const onGenreClick = (e) => {
    setCurrentGenre(e.target.id)
  }

  const onButtonFilterClick = () => {
    if (clicked.current) {
      clicked.current = false
      allGenres.current.style.display = "none"
    } else {
      clicked.current = true
      allGenres.current.style.display = "block"
    }
  }

  const checkFollow = () => {
    const url = encodeURI(`/follow/${userId}`)
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then((response) => {
        return response.json()
      })
      .then(({ auth, followed, followers, following }) => {
        if (auth && followed) {
          setFollowed(true)
        }
      })
  }

  const handleFollow = () => {
    const url = encodeURI(`/${followed ? 'un' : ''}follow/${userId}`)
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      method: "PUT"
    })
      .then((response) => {
        return response.json()
      })
      .then(({ auth, status }) => {
        if (auth && status) {
          setFollowed(!followed)
        }
      })
  }

  const getUserData = () => {
    fetch(`/search-user-data/${userId}`)
      .then((response) => response.json())
      .then(({ userGenres, userFilms}) => {
        genres.current = userGenres
        films.current = userFilms
        setIsRendered(true)
      })
  }

  useEffect(() => {
    getUserData()
  })

  useEffect(() => {
    setButtonText(followed ? 'Unfollow' : 'Follow');
    setButtonColor(followed ? '#ff9900' : '#68beff');
  }, [followed])

  useEffect(() => {
    if(token){
      checkFollow()
    }
  }, [token]) //because during the first load the navbar changes the token from ''

  return (
    <React.Fragment>
      <Navbar token={token} setToken={setToken}/>

      {isRendered ? (
        <div>
          <div id='user-info'>
            {token && (
              <div id="follow-button" style={{backgroundColor: buttonColor}} onClick={() => {handleFollow()}}>
                {buttonText}
              </div>
            )}
            
          </div>
        {films.current.length > 0 ? (
          <React.Fragment>
            <div id="filterGenres" onClick={onButtonFilterClick}>
              <i className="fas fa-sort-down"></i> Filter by genre{" "}
              <i className="fas fa-sort-down"></i>
            </div>
            <div id="allGenres" ref={allGenres}>
              <ul>
                <li key="0" onClick={onGenreClick}>
                  All genres
                </li>
                {genres.current
                  .filter((genre) => genre !== currentGenre)
                  .map((genre, index) => (
                    <li key={index + 1} id={genre} onClick={onGenreClick}>
                      {genre}
                    </li>
                  ))}
              </ul>
            </div>
            <main>
              <React.Fragment>
                <UserSidebar
                  genres={genres.current}
                  currentGenre={currentGenre}
                  setCurrentGenre={setCurrentGenre}
                />
                <UserCatalog
                  films={films.current}
                  currentGenre={currentGenre}
                  userId = {userId}
                />
              </React.Fragment>
            </main>
          </React.Fragment>
        ) : (
          <div id="noFilm">
            <h1>
              They haven't <span>voted</span> any movie yet.
            </h1>
          </div>
        )}
        </div>
      ) : (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <Footer />
    </React.Fragment>
  )
}

export default SearchUserFilms
