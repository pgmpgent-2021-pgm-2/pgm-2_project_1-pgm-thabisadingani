//entry for search
function  GitHubApi (){

  this.getSearchUser = async (name) =>{

  },
  
  this.getReposOfUser = async (username) =>{
    this.GITHUB_API = `https://api.github.com/users/${username}/repos?page=1&per_page=50`;

  },
  this.getFollowersOfUser = async (username) =>{

  }, 
  this.getSubscriptionsOfUser = async (username) => {

  }
}
//pmg students & teachers
function UserApi (){
  this.getUsers = async () =>{

  }
}
//weather for Ghent
function  WeatherApi (){
  this.GHENT_WEATHER_API = 'http://api.weatherapi.com/v1/current.json?key=%207f7f0720edc44dafab594739202212&q=Ghent';
  this.getCurrentWeatherGent = async () =>{
    try{
      const response = await fetch (this.GHENT_WEATHER_API);
      const jsonData = await response.json();
      return jsonData;
    } catch(error) {
      console.error(error);
    }
  }
}
// covid cases of ghent
function  GhentOpenDataApi (){
  this.GHENT_COVID_CASES_API = 'https://data.stad.gent/api/records/1.0/search/?dataset=dataset-of-cumulative-number-of-confirmed-cases-by-municipality&q=';
  this.getCovidCasesGent = async () =>{
    try{
      const response = await fetch (this.GHENT_COVID_CASES_API);
      const jsonData = await response.json();
      return jsonData;
    } catch(error) {
      console.error(error);
    }
    
  }
}