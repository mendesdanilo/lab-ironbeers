const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));


// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

/* app.get('/beers', (req, res) => {
  punkAPI.getBeers().then(beersFromTheAPI => {
    res.render('beers', { beersFromTheAPI });
  });
}); */

app.get('/beers', async (req, res) => {
  let beersFromTheAPI = await punkAPI.getBeers();
  //console.log('here I am: ', beersFromTheAPI);
  res.render('beers', { beersFromTheAPI });
});

app.get('/random-beer', async (req, res) => {
  let randomBeer = await punkAPI.getRandom();

  //console.log('here I am: ', randombeers);
  res.render('randomBeer', { randomBeer });
});

app.get("/beer", (req, res) => {
  const beer = {
    image_url:" ",
    name: "some beer",
    description: "some description",
    tagline: " ",
  };
  res.render("partials/beerpartial", beer);
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
