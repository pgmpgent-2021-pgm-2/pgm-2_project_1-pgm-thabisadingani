
(() => {
	const app = {
		initialize() {
      console.log('1. Application started');
      this.fetchWeather();
      this.fetchCovidCases();
      this.fetchUsers();
      //call function fetchDetailsOfUser
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
      this.$mainRepository = document.querySelector('.main__repository');

      this.$userName = document.querySelector('#user__name')
		},
		buildUI() {
      console.log('3. Build the user interface')
		},
		registerHTMLForListeners() {
      this.$userName.addEventListener('input', (e) => {
        console.log(e.target.value);
        // console.log("The term searched for was " + e.value); 
    });
   
    },
    async fetchWeather() {
     const weather = new WeatherApi(); 
     const weatherGent = await weather.getCurrentWeatherGent(); //weatherGent gets data back from API for UI.
     console.log(weatherGent);
     this.updateWeather(weatherGent)   
    },
    async fetchCovidCases() {
      const covid = new GhentOpenDataApi();
      const covidGent = await covid.getCovidCasesGent();
      this.updateCovidCases(covidGent);  
    },
    async fetchUsers() {
      const users = new UsersApi();
      const userPGM = await users.getUsers();
      this.updatePGMUsers(userPGM);
      this.updatePGMUsersRepo("PGMgent");
      this.updatePGMUserFollowers("PGMgent")
      console.log(userPGM);
    },
    // async updatePGMUsersRepo(){
    //   const repos = new GitHubApi();
    //   const repoPGM = await repos.getReposOfUser("PGMgent");
    //   this.updatePGMUsersRepo(repoPGM);
    //   console.log(repoPGM);
    // },
    updatePGMUsers(userPGM){
      
      const userName = userPGM.map((user) => {
        return`
        <li class="pgm_user-list" data-name="${user.portfolio.GitHub}">
          <div class="userInfo">
            <div class="userInfo--top" >
              <div class="image">
                <img src="${user.thumbnail}">
              </div>
              <div class="username">
                <p>${user.portfolio.GitHub}</p>
              </div>
            </div>
            <p class="usersname">${user.firstName} ${user.lastName}</p>
          </div>
        </li>
        `;
      }).join('')
      this.$pgmTeam.innerHTML = userName;
      let $pgm_user_list = document.querySelectorAll('.pgm_user-list');
      for (const iterator of $pgm_user_list) {
        console.log(iterator)
        iterator.addEventListener('click', (event) => {
              let user__name = event.currentTarget.dataset.name || event.currentTarget.parentNode.dataset.name || event.currentTarget.parentNode.parentNode.dataset.name;;
              // console.log(user__name);
              this.updatePGMUsersRepo(user__name);
              this.updatePGMUserFollowers(user__name)
          	});
      }
    },
    async updatePGMUsersRepo(userPGM){
      const repos = new GitHubApi();
      const repoPGM = await repos.getReposOfUser(userPGM);
      this.updatePGMUsersRepoUI(repoPGM);
      console.log(repoPGM);
  },
  updatePGMUsersRepoUI(repoPGM){
    // this is where i will build the user interface
    //
  },

  async updatePGMUserFollowers(userPGM){
    const followers = new GitHubApi();
    const followerPGM = await followers.getFollowersOfUser(userPGM);
    this.updatePGMUsersFollowerUI(followerPGM);
    console.log(followerPGM);
    },
    updatePGMUsersFollowerUI(followersPGM){
      // this is where i will build the user interface
      //
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
      // console.log(covid);
      this.$covidCases.innerHTML =
         `
        <div class="covid__cases--inner" >
          <div class="covid__cases--info">
            <p>${covid.records[0].fields.cases}</p>
          </div>
          <div class="covid__cases--img">
            <img src="static/media/images/covid-19.svg">
          </div>
        </div>
      `;  
    },
     calculate_age(age) { 
      var diff_age = Date.now() - age.getTime();
      var age_dt = new Date(diff_age); 
    
      return Math.abs(age_dt.getUTCFullYear() - 1970);
      // console.log(calculate_age(new Date(538012800000)))
  }
  
	};
	app.initialize();
})();
