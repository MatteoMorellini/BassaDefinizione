import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar.js"
import Footer from "../Footer.js"
import UserSidebar from "./SearchUserSidebar.js"
import "./searchUserCatalog.css"
import UserCatalog from "./SearchUserCatalog.js"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, registerables } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, ...registerables);

const data_doughnut = {
  datasets: [{
    label: 'Movies per genre',
    borderColor: 'rgb(0, 0, 0)',
    borderWidth: 1
  }]
};

const data_line = {
  datasets:[{
    label: 'Timeline',
  }], 
  options: {
    scales: {
      x: {
        type: 'time'
      },
      y: [{
        ticks: {
            precision: 0
        }
    }]
    }
  }
}

const SearchUserFilms = ({ token, setToken}) => {
  const [currentGenre, setCurrentGenre] = useState("")
  const genres = useRef()
  const films = useRef()
  const favoriteGenre = useRef()
  const { userId } = useParams()
  const clicked = useRef(false)
  const allGenres = useRef()
  const timeline = useRef()
  const [username, setUsername] = useState('')
  const [followed, setFollowed] = useState(false)
  const [buttonText, setButtonText] = useState('Follow'); // Initial text
  const [buttonColor, setButtonColor] = useState('#68beff');
  const [followers, setFollowers] = useState({})
  const [followings, setFollowings] = useState({})
  const [viewFollowings, setViewFollowings] = useState('none')
  const [viewFollowers, setViewFollowers] = useState('none')
  const [chartVisible, setChartVisible] = useState(false)

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

    const filterDate = (mode = 'day') => {
      const currentDate = new Date()
      const filteredValues = []
      if (mode==='day'){
        for (let i=6; i>=0; i--){
          const currentDateCopy = new Date(currentDate);
          currentDateCopy.setDate(currentDate.getDate() - i);
          const formattedDate = currentDateCopy.toISOString().split('T')[0];
          filteredValues[formattedDate] = 0;
        }
        for ( const [key,value] of  Object.entries(timeline.current)) {
          if (filteredValues.hasOwnProperty(key)) {
              filteredValues[key] = value
          }
        }
      }
      
      else if (mode==='year'){
        for (let i=3; i>=0; i--){
          const currentDateCopy = new Date(currentDate);
          currentDateCopy.setMonth(currentDate.getMonth() - i);
          const formattedDate = currentDateCopy.toISOString().split('-')[1];
          filteredValues[formattedDate] = 0;
        }
        for ( let [key,value] of  Object.entries(timeline.current)) {
          key = key.split('-')[1]
          if (filteredValues.hasOwnProperty(key)) {
              filteredValues[key] = value
          }
        }
      }
      const result = []
      for (const [key,value] of Object.entries(filteredValues)){
        result.push({x:key, y:value})
      }
      data_line.datasets[0].data = result
    }

    const getTimeline = () => {
      const timestampCounts = {};
      
      // Iterate through the keys (dates) of the input dictionary
      for (const film of films.current) {
        // Get the timestamp for the current date
        const timestamp = film.timestamp.split('T')[0];
        
        timestampCounts[timestamp] = (timestampCounts[timestamp] || 0) + 1;
      }
      // Return the object containing the count for each timestamp
      timeline.current = timestampCounts
      filterDate()
    }

    const getFavoriteGenre = () => {
      const allGenres = films.current.flatMap(movie => movie.Genre.split(',').map(genre => genre.trim()));
      const genreCounts = allGenres.reduce((acc, genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
      }, {});
      data_doughnut.labels=Object.keys(genreCounts)
      data_doughnut.datasets[0].data = Object.keys(genreCounts).map(key => genreCounts[key])
      const numberOfGenres = data_doughnut.datasets[0].data.length
      const colors = []
      for (let i=0; i<numberOfGenres; i++){
        const diff_1 = 255 - ((255-104)/(numberOfGenres-1))*i
        const diff_2 = 155 + ((190-153)/(numberOfGenres-1))*i
        const diff_3 = 0 + (255/(numberOfGenres-1))*i
        colors.push('rgb('+ parseInt(diff_1) +', ' + parseInt(diff_2) + ', ' + parseInt(diff_3) + ')')
      }
      console.log(colors)
      data_doughnut.datasets[0].backgroundColor = colors
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
            if (films.current.length > 0){
              getTimeline()
              favoriteGenre.current = getFavoriteGenre()
            } else {
              favoriteGenre.current = 'None'
            }
            
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
            <div className='charts'>
              {chartVisible ? (
              <div className="chart-container doughnut">
                <h2>Distribution of genres based on rated movies</h2>
                <Doughnut data={data_doughnut} />
              </div>
              ):(
              <div className="chart-container line">
                <h2>Movie rated in the last 7 days</h2>
                <Line data={data_line} />
              </div>
              )}
              <i className="fa-solid fa-arrow-left" onClick={()=>{setChartVisible(!chartVisible)}}></i>
              <i className="fa-solid fa-arrow-right" onClick={()=>{setChartVisible(!chartVisible)}}></i>
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
