//entry for search
function  GitHubApi (){
  this.getSearchUser = async (name) =>{

  },
  this.getReposOfUser = async (username) =>{

  },
  this.getFollowersOfUser = async (username) =>{

  }, 
  this.getSubscriptionsOfUser = async (username) => {

  }
}
//pmg students & teachers
function  UserApi (){
  this.getUsers = async () =>{

  }
}
//weather for Ghent
function  WeatherApi (){
  this.GHENT_WEATHER_API = 'http://api.weatherapi.com/v1/current.json?key=%207f7f0720edc44dafab594739202212&q=Ghent';
  this.getCurrentWeatherGent = async () =>{
  
      fetch(this.GHENT_WEATHER_API)
        .then((response) => response.json())
        // .then((jsonData) => this.updateGhentPortfolioUi(jsonData))
        .catch((error) => console.error(error));
 
    // try{
    //   const response = await fetch (this.GHENT_WEATHER_API);
    //   const jsonData = await response.json();
    //   this.updateWeather(jsonData);
    //   console.log(jsonData);
    //   resolve(jsonData);
    // } catch(error) {
    //   console.error(error);
    // }
  }
}
// covid cases of ghent
function  GhentOpenDataApi (){
  this.GHENT_COVID_CASES_API = 'https://data.stad.gent/api/records/1.0/search/?dataset=dataset-of-cumulative-number-of-confirmed-cases-by-municipality&q=';
  this.getCovidCasesGent = async () =>{
    
  }
}