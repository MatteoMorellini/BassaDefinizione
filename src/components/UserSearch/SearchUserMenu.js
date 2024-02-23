import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar.js"
import Footer from "../Footer.js"
import UserSidebar from "./SearchUserSidebar.js"
import "./searchUserCatalog.css"
import UserCatalog from "./SearchUserCatalog.js"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data_graph = {
  datasets: [{
    label: 'Movies per genre',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1
  }]
};

const SearchUserFilms = ({ token, setToken}) => {
  const [currentGenre, setCurrentGenre] = useState("")
  const genres = useRef()
  const films = useRef()
  const favoriteGenre = useRef()
  const { userId } = useParams()
  const clicked = useRef(false)
  const allGenres = useRef()
  const [username, setUsername] = useState('')
  const [followed, setFollowed] = useState(false)
  const [buttonText, setButtonText] = useState('Follow'); // Initial text
  const [buttonColor, setButtonColor] = useState('#68beff');
  const [followers, setFollowers] = useState({})
  const [followings, setFollowings] = useState({})
  const [viewFollowings, setViewFollowings] = useState('none')
  const [viewFollowers, setViewFollowers] = useState('none')

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
      .then(({ auth, followed}) => {
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

  useEffect(() => {
    const handleConnections = () => {
      const url = encodeURI(`/connections/${userId}`)
      fetch(url)
        .then((response) => {
          return response.json()
        })
        .then(({followers, followings }) => {
          setFollowings(followings)
          setFollowers(followers)
        })
    }
    const getFavoriteGenre = () => {
      const allGenres = films.current.flatMap(movie => movie.Genre.split(',').map(genre => genre.trim()));
      const genreCounts = allGenres.reduce((acc, genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
      }, {});
      data_graph.labels=Object.keys(genreCounts)
      data_graph.datasets[0].data = Object.keys(genreCounts).map(key => genreCounts[key])
      console.log(data_graph.datasets[0].data)
      const maxKey = Object.keys(genreCounts).reduce((res, cur) => {return genreCounts[res]>genreCounts[cur] ? res : cur})
      return maxKey
    }
    const getUserData = () => {
      fetch(`/search-user-data/${userId}`)
        .then((response) => response.json())
        .then(({ username, userGenres, userFilms}) => {
          if(username!==''){
            genres.current = userGenres
            films.current = userFilms
            favoriteGenre.current = films.current.length > 0 ? getFavoriteGenre() : 'None'
            setUsername(username)
          }
        })
    }
    
    getUserData()
    handleConnections()
  }, [])

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
      <div id="followings-div" style={{display: viewFollowings}}></div>
      
        <div id='followings-div2' style={{display: viewFollowings}}>
          <h3>Followings</h3>
          <ul>
            {Object.entries(followings).map(([key,value]) => {
                return (
                  <li key={key}>
                    <a href={`/user-search/${key}`}>
                    <p>{value}</p> <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </li>
                )
            })}
          </ul>
          <i onClick={()=>{setViewFollowings('none')}} class="fa-solid fa-xmark"></i>
        </div>
        <div id="followings-div" style={{display: viewFollowers}}></div>
      
        <div id='followings-div2' style={{display: viewFollowers}}>
          <h3>Followers</h3>
          <ul>
            {Object.entries(followers).map(([key,value]) => {
                return (
                  <li key={key}>
                    <a href={`/user-search/${key}`}>
                    <p>{value}</p> <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </li>
                )
            })}
          </ul>
          <i onClick={()=>{setViewFollowers('none')}} class="fa-solid fa-xmark"></i>
        </div>
      {username !== '' ? (
        <div id='searched-user'>
          <div id='user-info-wrapper'>
            <div id='user-info'>
              <div id='username-div'>@{username}</div>
              <div className="other clickable" onClick={()=>{setViewFollowers('block')}}>FOLLOWERS: {Object.keys(followers).length}</div>
              <div className="other clickable" onClick={()=>{setViewFollowings('block')}}>FOLLOWINGS: {Object.keys(followings).length}</div>
              <div className="other">FAVORITE GENRE: {favoriteGenre.current}</div>
              {token && (
                <div id="follow-button" style={{color: buttonColor, borderColor: buttonColor}} onClick={() => {handleFollow()}}>
                  {buttonText}
                </div>
              )}
            </div>
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
                  username = {username}
                />
              </React.Fragment>
            </main>
            <div className="chart-container" style={{ width: '40rem', margin: '25vh auto' }}>
        <Doughnut data={data_graph} />
      </div>
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
