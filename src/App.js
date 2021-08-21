import './App.css';
import {useState,useEffect} from 'react';

function App() {

    let [movieinfo,setMovieinfo]=useState(null);
    let [title,setTitle]=useState("pk");

    // Usestate calling once when page loads
    useEffect(()=>{

        getMovieData();

    },[])

    // function read title when user enter in the input field
    function readTitle(value){
        setTitle(value);
    }

    function getMovieData(){

        let url=`https://omdbapi.com/?t=${title}&apikey=784a9d41`;
  
        fetch(url)
        .then((response)=>response.json())
        .then((movie)=>{
            console.log(movie);
            setMovieinfo(movie);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    // Return the Output
    return (
        <div className="App">
            <div className="container">
                <div className="movie-container">
                    <h1>Get your favorite movies here</h1>
                    <div className="input-group d-flex">
                        <input type="text" placeholder="Enter Movie Name" onChange={(event)=>{readTitle(event.target.value)}} className="search-field"/>
                        <button className="btn" onClick={getMovieData}>Get Movie</button>
                    </div>
                    {
                        movieinfo?.Error===undefined?(
              
                        <div className="movie d-flex">
                            <div className="poster-wrapper">
                                <img src={movieinfo?.Poster} alt="poster" className="poster-image"/>
                            </div>
                            <div className="movie-details">
                                <div className="movie-info-container">
                                    <h1>{movieinfo?.Title}</h1>
                                    <p><strong>Genre</strong> : {movieinfo?.Genre}</p>
                                    <p><strong>Directed By</strong> :{movieinfo?.Director}</p>
                                    <p><strong>Plot</strong> :{movieinfo?.Plot}</p>
                                    <p><strong>Cast</strong> :{movieinfo?.Actors}</p>
                                    <p><strong>Box Office</strong> :{movieinfo?.BoxOffice}</p>
                                    <p><strong>Language</strong> :{movieinfo?.Language}</p>
                                    <p><strong>Release Date</strong> :{movieinfo?.Released}</p>
                                    <p><strong>Runtime</strong> :{movieinfo?.Runtime}</p>

                                    <div className="rating-box d-flex">
                                        {
                                            movieinfo?.Ratings.map((rating,index)=>(

                                                <div className="rating" key={index}>
                                                    <strong>{rating.Source}</strong>
                                                    <h3>{rating.Value}</h3>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        ):
                        (
                          <h1>Movie Not Found</h1>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
