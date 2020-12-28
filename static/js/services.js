//entry for search
function  GitHubApi (){

  this.getSearchUser = async (name) =>{
    this.GITHUB_NAME_API = `https://api.github.com/search/users?sort=desc&page=1&per_page=100&q=${name}`;
    try{
      const response = await fetch(this.GITHUB_NAME_API);
      const jsonData = await response.json();
      return jsonData;
    } catch(error) {
      console.error(error);
    }
  },
  
  this.getReposOfUser = async (username) =>{
    this.GITHUB_USERNAME_API = `https://api.github.com/users/${username}/repos?page=1&per_page=50`;
    try{
      const response = await fetch(this.GITHUB_USERNAME_API);
      const jsonData = await response.json();
      return jsonData;
    } catch(error) {
      console.error(error);
    }

  },
  this.getFollowersOfUser = async(username) =>{
    this.GITHUB_FOLLOWERS_API = ` https://api.github.com/users/${username}/followers?page=1&per_page=100`;
    try{
      const response = await fetch (this.GITHUB_FOLLOWERS_API);
      const jsonData = await response.json();
      return jsonData;
    } catch(error) {
      console.error(error);
    }
  }, 
  this.getSubscriptionsOfUser = async(username) => {
    this.GITHUB_FOLLOWING_API = ` https://api.github.com/users/${username}/following?page=1&per_page=100`;
    try{
      const response = await fetch (this.GITHUB_FOLLOWING_API);
      const jsonData = await response.json();
      return jsonData;
    } catch(error) {
      console.error(error);
    }
  }
}

//pmg students & teachers
  function UsersApi () {
    this.USERS_STUDENTS_TEACHERS_API = './static/data/pgm.json';
    this.getUsers = async () => {
      try{
        const response = await fetch(this.USERS_STUDENTS_TEACHERS_API);
        const jsonData = await response.json();
        return jsonData;
        } catch(error) {
        console.error(error);
      }
    }
  }

//weather for Ghent
function WeatherApi (){
  this.GHENT_WEATHER_API = 'https://api.weatherapi.com/v1/current.json?key=%207f7f0720edc44dafab594739202212&q=Ghent';
  this.getCurrentWeatherGent = async () =>{
    try{
      const response = await fetch(this.GHENT_WEATHER_API);
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
      const response = await fetch(this.GHENT_COVID_CASES_API);
      const jsonData = await response.json();
      return jsonData;
    }catch(error) {
      console.error(error);
    }  
  }
}