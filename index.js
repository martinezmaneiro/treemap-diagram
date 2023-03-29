let movieDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';
//the data extracted from the url will be stored in this variable
let movieData;

//svg element selector
let canvas = d3.select('#canvas');

//fetching data with d3.json method
d3.json(movieDataUrl).then(
    (data, error) => {
        if(error){
            console.log(error);
        } else {
            movieData = data
            console.log(movieData);
        };
    }
);