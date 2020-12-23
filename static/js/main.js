// const GHENT_WEATHER_API = 'http://api.weatherapi.com/v1/current.json?key=%207f7f0720edc44dafab594739202212&q=Ghent';
// const GHENT_COVID_CASES_API = 'https://data.stad.gent/api/records/1.0/search/?dataset=dataset-of-cumulative-number-of-confirmed-cases-by-municipality&q=';

(() => {
	const app = {
		initialize() {
      console.log('1. Application started');
      this.fetchWeather();
      this.fetchCovidCases();
			this.cacheElements();
			this.buildUI();
      this.registerHTMLForListeners();
		},
		cacheElements() {
      console.log('2. cache all existing DOM elements');
      this.$covidCases = document.querySelector('.covid__cases');
      this.$weatherReport = document.querySelector('.weather__report');

      this.$pgmTeam = document.querySelector('.pgm__team--user');
      this.$userRepository = document.querySelector('.user__repository--list');
      this.$userFollowers = document.querySelector('.user__followers--list');
      this.$githubUsers = document.querySelector('.github__users');
		},
		buildUI() {
      console.log('3. Build the user interface')
		},
		registerHTMLForListeners() {
   
    },
    async fetchWeather() {
     const weather = new WeatherApi();
     const weatherGent = await weather.getCurrentWeatherGent();
     console.log(weatherGent);
     this.updateWeather(weatherGent)   
    },
    async fetchCovidCases() {
      const covid = new GhentOpenDataApi();
      const codidGent = await covid.getCovidCasesGent();
      this.updateCovidCases(codidGent)  
    },
    updateWeather(weather){
      // console.log(weather);
      this.$weatherReport.innerHTML =
         `
        <div class="weather__report--inner" >
          <div class="weather__report--info">
            <p>${weather.current.temp_c}°C</p>
          </div>
          <div class="weather__report--img">
            <img src="${weather.current.condition.icon}">
          </div>
        </div>
      `;  
    },
    updateCovidCases(covid){
      console.log(covid);
      this.$covidCases.innerHTML =
         `
        <div class="covid__cases--inner" >
          <div class="covid__cases--info">
            <p>${covid.records[0].fields.cases}</p>
          </div>
          <div class="covid__cases--img">
            <img src=" static/media/images/covid-19.svg">
          </div>
        </div>
      `;  
    },
    getddateOfbirth(date){

    }
  
	};
	app.initialize();
})();
