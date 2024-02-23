import fetch from "node-fetch"
import React, { useEffect, useRef, useState } from "react"
import "./searchFilm.css"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar.js"
import Footer from "../Footer.js"
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';

const SearchedFilm = ({ token, setToken}) => {
  const [data, setData] = useState()
  const [isRendered, setIsRendered] = useState(false)
  const { title } = useParams()
  const sectionFilm = useRef()
  const [followingLikes, setFollowingLikes] = useState(false)
  const [starValue, setStarValue] = useState(0)

  const fetchFilmLike = () => {
    const url = encodeURI(`/film-like/${title}`)
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    }).then((res) => res.json())
    .then(({ auth, likes }) => {
      if (auth && likes) {
        setFollowingLikes(likes)
      } else {
        setFollowingLikes([])
      }
    })
  }

  useEffect(() => {
    const url = encodeURI(`/film-data/${title}`)
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then((res) => res.json())
      .then(({ data, found }) => {
        if (found) {
          setData(data)
        }
        setIsRendered(true)
      })
  }, [])

  const onLikeClick = (rating) => {
    fetch("/vote", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ title, rating }),
      method: "PUT"
    })
      .then((response) => {
        return response.json()
      })
      .then(({ auth, vote }) => {
        if (auth && vote) {
          setStarValue(rating)
        }
      })
  }

  const checkLike = () => {
    fetch('/vote', {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ title }),
      method: "POST"
    })
      .then((response) => {
        return response.json()
      })
      .then(({ auth, voted }) => {
        if (auth && voted) {
          setStarValue(voted)
        }
      })
  }

  useEffect(() => {
    if(token){
      checkLike()
      fetchFilmLike()
    }
  }, [token])

  if (isRendered) {
    return (
      <React.Fragment>
        <Navbar token={token} setToken={setToken}/>
        {data !== undefined ? (
          <section id="specificFilm" ref={sectionFilm}>
            <img src={data.Poster} alt="" />
            <div id="filmInformation">
              <h1 id="title">{data.Title}</h1>
              <h5 id="plot">{data.Plot}</h5>
              <h5 id="genre">{data.Genre}</h5>
              <h5 id="runtime">{data.Runtime}</h5>
              <h5 id="released">{data.Released}</h5>
              <h5 id="director">Director: {data.Director}</h5>
              <h5 id="actors">Actors: {data.Actors}</h5>
              <h5 id="awards">{data.Awards}</h5>
              <h5 id="imdbRating">
                {data.imdbRating} <i className="far fa-star"></i> |{" "}
                {data.imdbVotes} <i className="fas fa-vote-yea"></i> IMDb
                ratings
              </h5>
              {followingLikes!==false && (
              <div id='friendsLike'>
                    {followingLikes.length>0 && (
                      <h5>People you follow that liked this movie: {followingLikes.map(([id, user], index) => (
                        <React.Fragment key={index}>
                        <a href={`/user-search/${id}`}>{user}</a>{index < followingLikes.length - 1 && ', '}
                        </React.Fragment>
                      ))}</h5>
                    )}
                    {followingLikes.length===0 && (
                      <h5>None of the people you follow liked this movie yet</h5>
                    )}
                  </div>)}
              {token && (
                <div>
                  <div id="vote">
                    <h5 id="textRating">Rate the film</h5>
                    <Rating name="rating" onChange={(event, newValue)=>onLikeClick(newValue)} value={starValue} precision={1} emptyIcon = {<StarIcon sx={{ stroke: "#f4a704", strokeWidth: 1 }} color='auction' fontSize="inherit"/>}/>
                  </div>
                </div>
              )}
            </div>
          </section>
        ) : (
          <div id="filmNotFound">
            <h1>
              FILM <span>NOT FOUND</span> TRY ANOTHER NAME
            </h1>
          </div>
        )}
        <Footer />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Navbar token={token} />
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>{" "}
        <Footer />
      </React.Fragment>
    )
  }
}

export default SearchedFilm
