const apiData = {
  headers: {
    'X-RapidAPI-Host': process.env.RAPID_API_HOST,
    'X-RapidAPI-Key': process.env.RAPID_API_KEY
  },
  baseApiURL: 'https://movie-database-imdb-alternative.p.rapidapi.com'
}

module.exports = apiData
