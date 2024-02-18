import fetch from "node-fetch"
import React, { useState, useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"

const Navbar = ({ token, setToken}) => {
  const userButton = useRef()
  const logoutButton = useRef()
  const history = useHistory()
  const [input, setInput] = useState("")
  const [results, setResults] = useState([])
  const [user, setUser] = useState('')
  const suggestions = useRef()
  const [movieSearch, setMovieSearch] = useState(true)
  const [showResults, setShowResults] = useState(false)

  const changeSearch = (chosenSearch) => {
    if(movieSearch!==chosenSearch){
      setInput('')
      setResults([])
      setMovieSearch(chosenSearch);
    }
  };

  const tokenIsValid = (username) => {
    setUser(username)
    userButton.current.href = `/profile`
    userButton.current.innerHTML = `<i class="fa fa-user"></i> ${username}`
    userButton.current.style["border-radius"] = "10px 0 0 10px"
    logoutButton.current.style.display = "inline"
  }

  const tokenNotValid = () => {
    userButton.current.href = "/login"
    userButton.current.innerHTML = "<i class='fa fa-user'></i> GET STARTED"
    userButton.current.style["border-radius"] = "10px"
    logoutButton.current.style.display = "none"
  }

  const checkAccess = () => {
    if (token !== "") {
      fetch("/token", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token
        },
        method: "POST"
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          const { username, auth } = data
          auth ? tokenIsValid(username) : tokenNotValid()
        })
        .catch(() => {
          tokenNotValid()
        })
    } else {
      tokenNotValid()
    }
  }

  const deleteToken = () => {
    document.cookie =
      "jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    setToken("")
    history.push("/")
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (suggestions.current && !suggestions.current.contains(event.target)) {
        setShowResults(false)
      } else {
        setShowResults(true)
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []); // Empty dependency array ensures this effect runs only once


  useEffect(() => {
    checkAccess()
  }, [token])

  useEffect(() => {
    const timeoutSearch = setTimeout(() => {
      if (input) {
        if (movieSearch){
          fetch(`/search-movie?s=${input}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.Response) {
              setShowResults(true)
              setResults(data.Search)
            } else {
              setResults([])
            }
          })
          .catch(() => {
            setResults([])
          })
        } else {
          fetch(`/search-user?s=${input}`)
          .then((res) => res.json())
          .then((data) => {
            setShowResults(true)
            setResults(data)
          })
          .catch(() => {
            setResults([])
          })
        }
        
      }
    }, 300)
    return () => {
      clearTimeout(timeoutSearch)
    }
  }, [input])

  return (
    <header>
      <a href="/">
        <img src="/img/dkLogo.jpg" alt="" className="logo" />
      </a>

      <form
        id="searchFilm"
        className = {movieSearch ? 'searchFilm' : 'searchUsers'}
        ref={suggestions}
        onSubmit={(e) => {
          e.preventDefault()
        }}>

        <input
          className="input-field"
          spellCheck="false"
          autoComplete="off"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id="inputFilm"
          name="title"
          placeholder= {movieSearch ? "Search for a movie..." : 'Search for a user...'}
        />
        <div id="suggestions">
          {(input.length === 0 || results === undefined || showResults === false) && (<span></span>)}
          {(input.length>0 && results !== undefined && showResults === true && movieSearch === true) && (
            <ul>
                {results.map((film, index) => {
                  return (
                    <li key={index}>
                      <a href={`/film/${film.Title}`}>
                        <p>{film.Title}</p> <i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </li>
                  )
                })}
              </ul>
          )}
          {(input.length>0 && results !== undefined && showResults === true && movieSearch === false) && (
            <ul>
              {results.map(({username, id}, index) => {
                if (user !== username){
                  return (
                    <li key={index}>
                      <a href={`/user-search/${id}`}>
                        <p>{username}</p> <i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </li>
                  )
                }
              })}
            </ul>
          )}
        </div>
        <div id='changeSearch'>
          <i className="fa-solid fa-film" style={{ opacity: movieSearch ? 1 : 0.3 }} id='movieIcon' onClick={()=>changeSearch(true)}></i>
          <i className="fa-solid fa-users" style={{ opacity: movieSearch ? 0.3 : 1 }} id='usersIcon' onClick={()=>changeSearch(false)}></i>
        </div>
        
      </form>

      <div id="userInteraction">
        <a href="/login" id="button-user" ref={userButton}>
          <i className="fa-solid fa-user"></i> GET STARTED
        </a>
        <button id="button-logout" ref={logoutButton} onClick={deleteToken}>
          <i className="fa-solid fa-sign-out-alt"></i> LOGOUT
        </button>
      </div>
    </header>
  )
}

export default Navbar
