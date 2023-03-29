let movieDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';
//the data extracted from the url will be stored in this variable
let movieData;

//svg element selector
let canvas = d3.select('#canvas');
//tooltip selector
let tooltip = d3.select('#tooltip');

//creates a treemap once we have defined the data
let drawTreeMap =()=> {
    /*create a hierarchy structure using d3.hierarchy() method
    (https://github.com/d3/d3-hierarchy#hierarchy) */
    let hierarchy = d3.hierarchy(movieData, (node) => {
        return node['children']
    }).sum((node) => {
        return node['value']
    }).sort((node1, node2) => {
        return node2['value'] - node1['value']
    });
    /*call the .treemap() method to set the dimensions for the
    rectangles*/
    let createTreeMap = d3.treemap()
                            .size([1000, 600]);
    createTreeMap(hierarchy);
    let movieTiles = hierarchy.leaves();
    //adding the tiles
    let block = canvas.selectAll('g')
                        .data(movieTiles)
                        .enter()
                        .append('g')
                        //setting coordinates
                        .attr('transform', (movie) => {
                            return 'translate(' + movie['x0'] + ', ' + movie['y0'] + ')'
                        });

    block.append('rect')
            .attr('class', 'tile')
            //fill colors depending on movie category
            .attr('fill', (movie) => {
                let category = movie['data']['category'];
                if(category === 'Action'){
                    return 'crimson';
                }else if(category === 'Drama'){
                    return 'pink';
                }else if(category === 'Adventure'){
                    return 'purple';
                }else if(category === 'Family'){
                    return 'yellow';
                }else if(category === 'Animation'){
                    return 'khaki';
                }else if(category === 'Comedy'){
                    return 'lightgreen';
                }else if(category === 'Biography'){
                    return 'lightblue';
                }})
            //added name, category and value
            .attr('data-name', (movie) => {
                return movie['data']['name']})
            .attr('data-category', (movie) => {
                return movie ['data']['category']})
            .attr('data-value', (movie) => {
                return movie['data']['value']})
            //setting dimensions
            .attr('width', (movie) => {
                return movie['x1'] - movie['x0']})
            .attr('height', (movie) => {
                return movie['y1'] - movie['y0']
            })
            //mouseover event listener to turn on tooltip's display
            .on('mouseover', (movie) => {
                tooltip.transition()
                        .style('visibility', 'visible');
                let movieData = movie['data'];
                tooltip.text(
                    movieData['name'] + ' : $' + movieData['value']
                );
                /*adding data-value property which matches data-value
                active area*/
                tooltip.attr('data-value', movieData['value']);
            })
            //mouseout event listener to turn off (hidden) tooltip's display
            .on('mouseout', (movie) => {
                tooltip.transition()
                        .style('visibility', 'hidden');
            });
    //adding movie names to each block
    block.append('text')
            .text((movie) => {
                return movie['data']['name'];
            })
            .attr('x', 5)
            .attr('y', 30);
    };

//fetching data with d3.json method
d3.json(movieDataUrl).then(
    (data, error) => {
        if(error){
            console.log(error);
        } else {
            movieData = data;
            drawTreeMap();
        };
    }
);