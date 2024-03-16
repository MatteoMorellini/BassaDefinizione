const express = require("express")
const path = require("path")
const mysql = require("mysql2")
const dotenv = require("dotenv")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const atob = require("atob")
const similarity = require('compute-cosine-similarity')
const bcrypt = require("bcryptjs")
const fetch = require("node-fetch")
const { NoEncryption, ConnectedTvOutlined } = require("@mui/icons-material")
const cardsPerPage = 10 // number of films per page
const publicDirectoryPath = path.join(__dirname, "/build")
app.use(express.static(publicDirectoryPath))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
dotenv.config({ path: "./private/.env" })
const serverPort = process.env.PORT || 5000

// DATABASE SECTION ------------------------------------------------------------------

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

const dbQuery = (queryString, parametres) => {
  // promisification
  return new Promise((resolve) => {
    connection.query(queryString, parametres, (error, result) => {
      if (error) {
        throw error
      } else {
        resolve(result)
      }
    })
  })
}

// JWT SECTION ------------------------------------------------------------------

const createToken = (id, res) => {
  // creates a 3 month expiration token based on user id and secret key
  const token = jwt.sign({ id: id.toString() }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    )
  }
  res.cookie("jwt", token, cookieOptions).json({ token })
}

const encodeToken = (token) => {
  const base64Url = token.split(".")[1]
  const base64 = base64Url.replace("-", "+").replace("_", "/")
  return JSON.parse(atob(base64))
}

const verifyToken = (req, res, next) => {
  // it takes the token, if present, in the authorization key and if valid it derives the user's id
  // Get auth header value
  const bearerHeader = req.headers["authorization"]
  // Check if bearer is undefined
  if (bearerHeader !== undefined) {
    // Split at the space
    const bearer = bearerHeader.split(" ")
    // Get token from array
    const token = bearer[1]
    try {
      if (jwt.verify(token, process.env.JWT_SECRETKEY)) {
        // Set the token
        req.id = encodeToken(token).id
        // Next middleware
        next()
      } else {
        res.json({ auth: false })
      }
    } catch (err) {
      res.json({ auth: false })
    }
  } else {
    // Forbidden
    res.json({ auth: false })
  }
}

// ACCOUNT SECTION --------------------------------------------------------------

const loginUser = async ({ username, password }, res) => {
  try {
    const users = await dbQuery(
      "SELECT id, password FROM `users` WHERE `username` = ? LIMIT 1",
      [username]
    )
    const [userData] = users

    if (!userData || !(await bcrypt.compare(password, userData.password))) {
      res.json({ message: "Incorrect username or password" })
    } else {
      createToken(userData.id, res)
    }
  } catch {
    res.json({ message: "An error has occurred. Please try again" })
  }
}

const userRegistration = async ({ username, mail, password }, res) => {
  // if the email has not already been used, create a new user who will then be logged in
  try {
    const matches = await dbQuery(
      "SELECT COUNT(*) AS count FROM users WHERE `mail` = ? OR `username` = ? LIMIT 1",
      [mail, username]
    )
    if (matches[0].count === 0) {
      const hashedPassword = await bcrypt.hash(password, 4) //number of times the password is hashed
      dbQuery(
        "INSERT INTO `users`(`username`, `password`, `mail`) VALUES(?, ?, ?)",
        [username, hashedPassword, mail]
      )
      loginUser({ username, password }, res)
    } else {
      res.json({
        message: "Mail or username already in use, try with different ones"
      })
    }
  } catch {
    res.json({
      message: "An error has occurred. Please try again"
    })
  }
}

// FILMS SECTION ----------------------------------------------------------------

const searchFilm = async (name, rating=undefined, timestamp=undefined) => {
  // common function for obtaining the data of a movie
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(name)}&apikey=${
    process.env.OMDBKEY
  }`

  try {
    let response = await fetch(url)
    response = await response.json()
    
    
    if(rating && timestamp){
      return {...response, ...{rating, timestamp}}
    } else {
      return response
    }
  } catch {
    return null
  }
}

const getGenreID = async(genre) => {
  try{
    let [
      { id } // id of the current genre
    ] = await dbQuery(`SELECT id FROM genres WHERE name = ? LIMIT 1`, [
      genre
    ])
    return id
  } catch {
    return undefined
  }
}

const renderFilms = async ({ genre, page }, res) => {
  // render movies by genre and page
  const offset = parseInt(page) * cardsPerPage

  // select the IDs of the films by skipping those of the "previous pages"

  const listOfTitlesID = await dbQuery(
    `SELECT id FROM genresFilm WHERE ${genre} = 1 LIMIT 10 OFFSET ?`,
    [offset]
  )

  // get the title from the id

  const requestsTitle = listOfTitlesID.map(({ id }) =>{
    return dbQuery("SELECT title FROM `films` WHERE `id` = ? LIMIT 1", [id])
  })
  
  const listOfTitles = await Promise.all(requestsTitle)
  const requestsData = listOfTitles.map(([{ title }]) => searchFilm(title))

  let listOfFilms = await Promise.all(requestsData)
  // to lighten the data of the films I keep only the useful keys

  listOfFilms = listOfFilms.map((film) => ({
    Title: film.Title,
    imdbRating: film.imdbRating,
    imdbVotes: film.imdbVotes,
    imdbID: film.imdbID,
    Poster: film.Poster,
    Genre: film.Genre,
    Plot: film.Plot
  }))

  listOfFilms.sort((a, b) => b.imdbRating - a.imdbRating) // sort the films by descending vote
  res.status(200).json({
    listOfFilms
  })
  //the try-catch block is missing, to be added together with an error message
}

//MODIFICA QUESTA
const addNewGenres = async (insertId, genres) => {
  let firstInsert = [true]
  for (const genre of genres){
    const id = await getGenreID(genre)
    // if the genre is not present in the genre table it is added
    if (id === undefined) {
      await dbQuery(`INSERT INTO genres (name) VALUES(?)`, [genre])
      await dbQuery(`ALTER TABLE genresFilm ADD COLUMN \`${genre}\` BOOLEAN`)
    }
    if (firstInsert[0]===true){
      firstInsert[0]=false
      await dbQuery(`INSERT INTO genresFilm (id, \`${genre}\`) VALUES (?, 1)`, [insertId])
    } else {
      await dbQuery(`UPDATE genresFilm SET \`${genre}\` = 1 WHERE id = ?`, [insertId])
    }
  }
  await getSimilarityScore(insertId)
}

const insertMovieId = async(title, genres) => {
  const result = await dbQuery(`SELECT id FROM films WHERE title = ?`, [title])
  if(result.length===0){
    const {insertId} = await dbQuery(`INSERT INTO films (title) VALUES(?)`, [title])
    await addNewGenres(insertId, genres)
    return insertId
  } else {
    return result[0].id
  }
}

// vote for a movie given its title, liked it and the voting user's id

const voteFilm = async ({ title, rating }, userIDreq, res) => {
  try {
    // check if the user has already voted the movie

    let titleID = await dbQuery(
      "SELECT films.id FROM films INNER JOIN votes ON films.id = votes.filmID AND userID = ? AND films.title = ? LIMIT 1",
      [userIDreq, title]
    )
    if (titleID.length < 1) {
      // check if the film has been voted by any user
      const titleID = await dbQuery("SELECT id FROM films WHERE title = ? LIMIT 1", [
        title
      ])
      // insert the vote
      dbQuery(`INSERT INTO votes VALUES(?,?,CURRENT_TIMESTAMP, ?)`, [titleID[0].id,userIDreq,rating])
    } else {
      // if the user has already voted for the film, the vote is updated
      dbQuery(
        `UPDATE votes SET rating = ?, timestamp=CURRENT_TIMESTAMP WHERE filmID = ? AND userID = ?`,
        [rating, titleID[0].id, userIDreq] //se l'utente ha già votato il film, il voto è aggiornato
      )
    }
    res.status(200).json({ auth: true, vote: true })
  } catch (err) {
    res.status(401).json({ auth: true, vote: false })
  }
}

const checkLike = async(userIDreq, title, res) => {
  try{
    const titleID = await dbQuery('SELECT id FROM films WHERE title = ?', [title])
    if (titleID.length < 1){
      res.status(401).json({auth:true, voted:false})
    } else {
      const result = await dbQuery('SELECT rating FROM votes WHERE filmID = ? AND userID = ?', [titleID[0].id, userIDreq])
      if (result.length<1){
        res.status(401).json({auth:true, voted:false})
      } else {
        res.status(200).json({auth:true, voted: parseInt(result[0].rating)})
      }
    }
  } catch(err) {
    res.status(401).json({auth:true, voted: false})
  }
}

const checkFollow = async(follower, following, res) => {
  try{
    const result = await dbQuery('SELECT * FROM follows WHERE followerId = ? AND followingId = ? LIMIT 1', [follower, following])
    if(result.length > 0){
      res.status(200).json({auth:true, followed:true})
    } else {
      res.status(401).json({auth:true, followed:false})
    }
  } catch (err) {
    res.status(401).json({auth:true, followed:false})
  }
}

const handleFollow = async(follower, following, res) => {
  try{
      dbQuery(`INSERT INTO follows VALUES (?,?)`, [follower, following])
      res.status(200).json({auth:true, status:true})
  } catch (err) {
    res.status(401).json({auth:true, status:false})
  }
}

const handleUnfollow = async(follower, following, res) => {
  try{
    dbQuery(`DELETE FROM follows WHERE followerId = ? AND followingId = ? LIMIT 1`, [follower, following])
    res.status(200).json({auth:true, status:true})
  } catch (err) {
    res.status(401).json({auth:true, status:false})
  }
}

const favoriteFilms = async (userID, res, username='') => {
  // takes ALL the movies voted by the user, very heavy function to UPDATE
  let userFilms = []
  let userGenres = []
  try {
    let results = await dbQuery(
      `SELECT DISTINCT films.title, votes.rating, votes.timestamp
      FROM films
      INNER JOIN votes ON films.id = votes.filmID AND votes.userID = ?`,
      [userID]
    )
    // if there are 1 or + films voted by the user in that genre then it scrolls them
    results = results.map(({ title, rating, timestamp }) => searchFilm(title, rating, timestamp))
    const allData = await Promise.all(results)
    for (let data of allData) {
      // if the one just searched for is not present in the list of the user's films, it adds it
      const { Title, imdbRating, Poster, Genre, rating, timestamp } = data
      Genre.split(", ").forEach((genre) => {
        if (!userGenres.includes(genre)) userGenres.push(genre)
      })
      userFilms.push({ Title, imdbRating, Poster, Genre, rating, timestamp})
    }
    userGenres.sort() // alphabetical order of genres
    userFilms.sort((a, b) => b.imdbRating - a.imdbRating)
    res.status(200).json({ userFilms, userGenres, auth: true, username})
  } catch {
    res.status(401).json({ auth: false })
  }
}

const handleFollowings = async(follower, res) => {
  try {
    let result = await dbQuery('SELECT users.username, users.id FROM follows JOIN users ON users.id=follows.followingId WHERE followerId = ?', [follower])
    let followings = {}
    for(const item of result){
      followings[item.id]=item.username
    }
    return followings
  } catch(err){
    res.status(401).json({})
  }
}

const handleFollowers = async(following, res) => {
  try {
    let result = await dbQuery('SELECT users.username, users.id FROM follows JOIN users ON users.id=follows.followerId WHERE followingId = ?', [following])
    let followers = {}
    for(const item of result){
      followers[item.id]=item.username
    }
    return followers
  } catch(err){
    res.status(401).json({})
  }
}

const handleFollowingLikes = async(title, followings, res) => {
  try{
    const result = await dbQuery('SELECT id FROM films WHERE title = ?', [title])
    if (result.length < 1){
      res.status(401).json({auth:true, likes:[]})
    } else {
      const filmID = result[0].id
      const likes = []
      if (Object.keys(followings).length !== 0){
        const followingsID = Object.keys(followings).join(',') //all the user's IDs followed by this user
        const resultQuery = await dbQuery(`SELECT userID FROM votes WHERE userID IN (${followingsID}) AND filmID=${filmID} AND rating>2 `)
        const followingLikes = resultQuery.map((user) => user.userID) //all the user's IDs that liked this movie
        
        Object.keys(followings).forEach((key)=>{
          if (followingLikes.includes(parseInt(key))){
            likes.push([key, followings[parseInt(key)]])
          }
        })
      }
      
      res.status(200).json({auth:true, likes})
    }
  } catch(err) {
    res.status(401).json({auth:true, likes:[]})
  }
}

const getUsername = async(id) => {
  try{
    const result = await dbQuery(`SELECT username FROM users WHERE id = ${id} LIMIT 1`)
    return result[0].username
  } catch(err) {
    return ''
  }
}

const getSimilarityScore = async(insertId) => {
  const allMovies = await dbQuery('SELECT * FROM genresFilm')
  const lastMovieVectors = {}
  const firstMovieVector=[]
  for (let i = 0; i < allMovies.length; i++) {
    if (allMovies[i]['id'] !== insertId){
      const movieVector = []
      //lastMovieVectors[allMovies[0]]
      for(const key of Object.keys(allMovies[0])){
        if(key!=='id'){
          movieVector.push(allMovies[i][key])
        }
      }
      lastMovieVectors[allMovies[i].id]=movieVector
    } else {
      for(const key of Object.keys(allMovies[0])){
        if(key!=='id'){
          firstMovieVector.push(allMovies[i][key])
        }
      } 
    }
  }

  const similarityPromises = Object.keys(lastMovieVectors).map((id) => {
    const similarityScore = similarity(lastMovieVectors[id], firstMovieVector).toFixed(2)
    return dbQuery('INSERT INTO similarity VALUES (?,?,?)', [id, insertId, similarityScore])
  })
  await Promise.all(similarityPromises)
}

const getSimilarMovies = async (id) => {
  const left = await dbQuery('SELECT similarID, score FROM similarity WHERE movieID = ?', [id])
  const right = await dbQuery('SELECT movieID, score FROM similarity WHERE similarID = ?', [id])
  const result = [...left, ...right]
  result.sort((a, b) => b.score - a.score)
  const suggestedIDs = result.map(dict => {return dict.movieID ? dict.movieID : dict.similarID}).slice(0,10)
  const suggestedMovies = []
  for (const id of suggestedIDs) {
    const result = await dbQuery('SELECT title FROM films WHERE id = ? LIMIT 1;', [id])
    suggestedMovies.push(result[0].title)
  }
  return suggestedMovies
}

// API SECTION -------------------------------------------------------------------------------

app.get("/genres", async (req, res) => {
  const results = await dbQuery("SELECT * FROM `genres`", [])
  res.status(200).json(results)
})

app.get("/films", (req, res) => {
  renderFilms(req.query, res)
})

app.get('/search-user', async(req,res) => {
  const results = await dbQuery(`SELECT id, username from users WHERE username LIKE '%${req.query.s}%' LIMIT 10`)
  res.status(200).json(results)
})

app.get("/search-movie", async (req, res) => {
  const response = await fetch(
    `https://www.omdbapi.com/?s=${encodeURIComponent(req.query.s)}&apikey=${
      process.env.OMDBKEY
    }`
  )
  const data = await response.json()
  if (data.Response) {
    res.status(200).json(data)
  } else res.status(400).json(data.Response)
})

app.get("/pagination", async (req, res) => {
  const [
    { id }
  ] = await dbQuery("SELECT `id` FROM `genres` WHERE `name` = ? LIMIT 1", [
    req.query.genre
  ])
  const [
    { pagesLength }
  ] = await dbQuery(
    `SELECT COUNT(${req.query.genre}) AS pagesLength FROM genresFilm WHERE ${req.query.genre} = 1`)
  res.json({ pagesLength })
})

app.get("/film-data/:title", async (req, res) => {
  const { title } = req.params

  try {
    const data = await searchFilm(title)
    data.Title
      ? res.status(200).json({ data, found: true })
      : res.status(400).json({ found: false })
  } catch {
    res.status(400).json({ found: false })
  }
})

app.get('/similar-movies/:title', async(req,res) => {
  const {title} = req.params
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${
    process.env.OMDBKEY
  }`
  try {
    let response = await fetch(url)
    response = await response.json()
    const genres = response.Genre.split(", ")
    if(genres.length>0){
      const id = await insertMovieId(title, genres)
      const similarMovies = await getSimilarMovies(id)
      res.status(200).json({similarMovies}) 
    }
  } catch {
    res.status(400)
  }

})

app.get('/film-like/:title', verifyToken, async (req,res) => {
  const {title} = req.params
  try {
    const followings = await handleFollowings(req.id)
    handleFollowingLikes(title, followings,res)
  } catch {
    res.status(400).json({auth:true, likes:[]})
  }
})

app.get('/search-user-data/:id', async (req,res) => {
  const {id} = req.params
  const username = await getUsername(id)
  favoriteFilms(id, res, username)
})

app.get("/user-data", verifyToken, (req, res) => {
  favoriteFilms(req.id, res)
})

app.post("/login", (req, res) => {
  loginUser(req.body, res)
})

app.post("/registration", (req, res) => {
  userRegistration(req.body, res)
})

app.put("/vote", verifyToken, (req, res) => {
  voteFilm(req.body, req.id, res)
})

app.post('/vote', verifyToken, (req, res) => {
  const {title} = req.body
  checkLike(req.id, title, res)
})

app.get("/follow/:userId", verifyToken, (req,res) => {
  const {userId} = req.params
  checkFollow(req.id, userId, res)
})

app.put("/follow/:userId", verifyToken, (req,res) => {
  const {userId} = req.params
  handleFollow(req.id, userId, res)
})

app.put("/unfollow/:userId", verifyToken, (req,res) => {
  const {userId} = req.params
  handleUnfollow(req.id, userId, res)
})

app.get('/connections/:userId', async (req,res) => {
  const {userId} = req.params
  const followings = await handleFollowings(userId, res)
  const followers = await handleFollowers(userId, res)
  res.status(200).json({followings, followers})
})


app.post("/token", verifyToken, async (req, res) => {
  try {
    const [
      { username }
    ] = await dbQuery(`SELECT username FROM users WHERE id = ? LIMIT 1`, [
      req.id
    ])
    res.status(200).send({ username, auth: true })
  } catch {
    res.status(301).send({ auth: false })
  }
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.listen(serverPort, async () => console.log(`server listening on port ${serverPort}`))