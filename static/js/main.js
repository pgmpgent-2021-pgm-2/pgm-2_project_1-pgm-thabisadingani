
(() => {
	const app = {
		initialize() {
      console.log('1. Application started');
      this.cacheElements();
      this.registerHTMLForListeners();
      this.fetchUsers();
      this.fetchWeather();
      this.fetchCovidCases();
      this.buildUI(); 
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
      this.$coverImage = document.querySelector('.cover__image');
      this.$userName = document.querySelector('#user__name');
      this.$display__dark = document.querySelector('.display__dark');
      this.$display__light = document.querySelector('.display__light');
      this.body = document.querySelector('body');
		},
		buildUI() {
      console.log('3. Build the user interface')
        
		},
		registerHTMLForListeners() {
      this.$userName.addEventListener('input', (e) => {
        // console.log(e.target.value);
        this.buildUIGitHubUser(e.target.value)
        // console.log("The term searched for was " + e.value); 
      });
      this.$display__light.addEventListener('click', () =>{
        this.toggleModeView();
      });
      this.$display__dark.addEventListener('click', () =>{
        this.toggleModeView();
      });
    },
     toggleModeView() {
      this.body.classList.toggle('lightmode');
        this.$display__light.classList.toggle('active_button');
        this.$display__dark.classList.toggle('active_button');
     },
    async fetchWeather() {
      const weather = new WeatherApi(); 
      const weatherGent = await weather.getCurrentWeatherGent(); //weatherGent gets data back from API for UI.
      //  console.log(weatherGent);
      this.updateWeather(weatherGent)   
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
    async fetchCovidCases() {
      const covid = new GhentOpenDataApi();
      const covidGent = await covid.getCovidCasesGent();
      this.updateCovidCases(covidGent);  
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
    async fetchUsers() {
      const users = new UsersApi();
      const userPGM = await users.getUsers();
      this.updatePGMUsers(userPGM);
      this.updatePGMUsersRepo("PGMgent");
      this.updatePGMUserFollowers("PGMgent");
    }, 
    updatePGMUsers(userPGM){
      const userName = userPGM.map((user) => {
        return`
        <li class="pgm_user-list" data-name="${user.portfolio.GitHub}">
          <div class="userInfo">
            <div class="userInfo--top" >
              <div class="image">
                <img src="${user.thumbnail}">
              </div>
              <div class="username__info">
                <p class="username">${user.portfolio.GitHub}</p>
                <p class="usersname">${user.firstName} ${user.lastName}</p>
              </div>
            </div>
            
          </div>
        </li>
        `;
      }).join('')
      this.$pgmTeam.innerHTML = userName;
      let $pgm_user_list = document.querySelectorAll('.pgm_user-list');
      for (const iterator of $pgm_user_list) {
        // console.log(iterator)
        iterator.addEventListener('click', (event) => {
            let user__name = event.currentTarget.dataset.name || event.currentTarget.parentNode.dataset.name || event.currentTarget.parentNode.parentNode.dataset.name;;
            // console.log(user__name);
            this.updatePGMUsersRepo(user__name);
            this.updatePGMUserFollowers(user__name);
            this.updatePGMCover(user__name)    
        });
      }
    },
    async updatePGMCover(user__name){
      const cover = new UsersApi();
      const coverPGM = await cover.getUsers();
      this.$coverImage.innerHTML =  coverPGM.map((user) => {
        if( user__name === user.portfolio.GitHub){
        return `
         <div class="background-cover" style="background-image: url(${user.thumbnail})"  >
           <div class="background__cover--inner">
            <p class="teacher__student">${user.isStudent !== false ? 'Student' : 'Lecture'}</p>
            <div class="name_age" >
              <p>${user.firstName} ${user.lastName}</p><p>(${this.calculateAge(user.DateOfBirth)})</p>
            </div>
            <div class="motto">
              <p>${user.motto}</p>
            </div>
           </div>
           <a class="LinkedIn__link" href="${user.portfolio.LinkedIn}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 2.25a.75.75 0 01.75-.75h5.5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0V4.06l-6.22 6.22a.75.75 0 11-1.06-1.06L19.94 3h-3.69a.75.75 0 01-.75-.75z"/><path d="M2.5 4.25c0-.966.784-1.75 1.75-1.75h8.5a.75.75 0 010 1.5h-8.5a.25.25 0 00-.25.25v15.5c0 .138.112.25.25.25h15.5a.25.25 0 00.25-.25v-8.5a.75.75 0 011.5 0v8.5a1.75 1.75 0 01-1.75 1.75H4.25a1.75 1.75 0 01-1.75-1.75V4.25z"/></svg></a>
           <h5></h5>
         </div>      
     `}
    }).join('');
    },
    async updatePGMUsersRepo(userPGM){
      const repos = new GitHubApi();
      const repoPGM = await repos.getReposOfUser(userPGM);
      this.updateGitUsersRepoUI(repoPGM)
    },
    async updateGitHubUsersRepo(userGitHub){
      const repos = new GitHubApi();
      const repoGitHub = await repos.getReposOfUser(userGitHub);
      this.updateGitUsersRepoUI(repoGitHub);
    },
    updateGitUsersRepoUI(repoGit){
      if(repoGit.length !== 0){
      const userRepo = repoGit.map((user) => {
        return`
        <li class="pgm_user-repo">
              <div class="username--repo">
                <h4>${user.full_name}</h4>
                <p class="description">${user.description !== null ? user.description : ''}</p>
                <ul class="repoListIcons">
                <li>
                  <p>${user.size} KB <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M5.75 21a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM2.5 19.25a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0zM5.75 6.5a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM2.5 4.75a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0zM18.25 6.5a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM15 4.75a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0z"/><path fill-rule="evenodd" d="M5.75 16.75A.75.75 0 006.5 16V8A.75.75 0 005 8v8c0 .414.336.75.75.75z"/><path fill-rule="evenodd" d="M17.5 8.75v-1H19v1a3.75 3.75 0 01-3.75 3.75h-7a1.75 1.75 0 00-1.75 1.75H5A3.25 3.25 0 018.25 11h7a2.25 2.25 0 002.25-2.25z"/></svg></span></p>
                </li>
                <li>
                  <p>${user.default_branch} <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.75 2.75a.75.75 0 00-1.5 0V4.5H9.276a1.75 1.75 0 00-.985.303L6.596 5.957A.25.25 0 016.455 6H2.353a.75.75 0 100 1.5H3.93L.563 15.18a.762.762 0 00.21.88c.08.064.161.125.309.221.186.121.452.278.792.433.68.311 1.662.62 2.876.62a6.919 6.919 0 002.876-.62c.34-.155.606-.312.792-.433.15-.097.23-.158.31-.223a.75.75 0 00.209-.878L5.569 7.5h.886c.351 0 .694-.106.984-.303l1.696-1.154A.25.25 0 019.275 6h1.975v14.5H6.763a.75.75 0 000 1.5h10.474a.75.75 0 000-1.5H12.75V6h1.974c.05 0 .1.015.14.043l1.697 1.154c.29.197.633.303.984.303h.886l-3.368 7.68a.75.75 0 00.23.896c.012.009 0 0 .002 0a3.154 3.154 0 00.31.206c.185.112.45.256.79.4a7.343 7.343 0 002.855.568 7.343 7.343 0 002.856-.569c.338-.143.604-.287.79-.399a3.5 3.5 0 00.31-.206.75.75 0 00.23-.896L20.07 7.5h1.578a.75.75 0 000-1.5h-4.102a.25.25 0 01-.14-.043l-1.697-1.154a1.75 1.75 0 00-.984-.303H12.75V2.75zM2.193 15.198a5.418 5.418 0 002.557.635 5.418 5.418 0 002.557-.635L4.75 9.368l-2.557 5.83zm14.51-.024c.082.04.174.083.275.126.53.223 1.305.45 2.272.45a5.846 5.846 0 002.547-.576L19.25 9.367l-2.547 5.807z"/></svg></span></p>
                </li>
                <li>
                  <p>${user.license !== null ? user.license.key : 'no license!'} <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 15.5a1 1 0 11-2 0 1 1 0 012 0zm-.25-8.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z"/><path fill-rule="evenodd" d="M11.46.637a1.75 1.75 0 011.08 0l8.25 2.675A1.75 1.75 0 0122 4.976V10c0 6.19-3.77 10.705-9.401 12.83a1.699 1.699 0 01-1.198 0C5.771 20.704 2 16.19 2 10V4.976c0-.76.49-1.43 1.21-1.664L11.46.637zm.617 1.426a.25.25 0 00-.154 0L3.673 4.74a.249.249 0 00-.173.237V10c0 5.461 3.28 9.483 8.43 11.426a.2.2 0 00.14 0C17.22 19.483 20.5 15.46 20.5 10V4.976a.25.25 0 00-.173-.237l-8.25-2.676z"/></svg></span></p>
                </li>
                <li>
                  <p>${user.private !== true ? 'public' : 'private!'} <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 21a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zm-3.25-1.75a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0zm-3-12.75a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM2.5 4.75a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0zM18.25 6.5a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM15 4.75a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0z"/><path fill-rule="evenodd" d="M6.5 7.75v1A2.25 2.25 0 008.75 11h6.5a2.25 2.25 0 002.25-2.25v-1H19v1a3.75 3.75 0 01-3.75 3.75h-6.5A3.75 3.75 0 015 8.75v-1h1.5z"/><path fill-rule="evenodd" d="M11.25 16.25v-5h1.5v5h-1.5z"/></svg></span></p>
                </li>
                <li>
                  <p>${user.forks} <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 7a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 7zm1 9a1 1 0 11-2 0 1 1 0 012 0z"/><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"/></svg></span></p>
                </li>
                <li>
                  <p>${user.open_issues} <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"/><path fill-rule="evenodd" d="M12 3.5c-3.432 0-6.125 1.534-8.054 3.24C2.02 8.445.814 10.352.33 11.202a1.6 1.6 0 000 1.598c.484.85 1.69 2.758 3.616 4.46C5.876 18.966 8.568 20.5 12 20.5c3.432 0 6.125-1.534 8.054-3.24 1.926-1.704 3.132-3.611 3.616-4.461a1.6 1.6 0 000-1.598c-.484-.85-1.69-2.757-3.616-4.46C18.124 5.034 15.432 3.5 12 3.5zM1.633 11.945c.441-.774 1.551-2.528 3.307-4.08C6.69 6.314 9.045 5 12 5c2.955 0 5.309 1.315 7.06 2.864 1.756 1.553 2.866 3.307 3.307 4.08a.111.111 0 01.017.056.111.111 0 01-.017.056c-.441.774-1.551 2.527-3.307 4.08C17.31 17.685 14.955 19 12 19c-2.955 0-5.309-1.315-7.06-2.864-1.756-1.553-2.866-3.306-3.307-4.08A.11.11 0 011.616 12a.11.11 0 01.017-.055z"/></svg></span></p>
                </li>
                <li>
                  <p>${user.watchers} <span><img src=""></span></p>
                </li>
                <li>
                  <a href="${user.svn_url}" target="_blank"> <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 2.25a.75.75 0 01.75-.75h5.5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0V4.06l-6.22 6.22a.75.75 0 11-1.06-1.06L19.94 3h-3.69a.75.75 0 01-.75-.75z"/><path d="M2.5 4.25c0-.966.784-1.75 1.75-1.75h8.5a.75.75 0 010 1.5h-8.5a.25.25 0 00-.25.25v15.5c0 .138.112.25.25.25h15.5a.25.25 0 00.25-.25v-8.5a.75.75 0 011.5 0v8.5a1.75 1.75 0 01-1.75 1.75H4.25a1.75 1.75 0 01-1.75-1.75V4.25z"/></svg></span></a>
                </li>
                </ul>
              </div>
        </li>
        `;
      }).join('')
      this.$userRepository.innerHTML = userRepo;}else{
      console.log("no followers");
      this.$userRepository.innerHTML = `<li class="pgm_user-repo follower__search"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M19.371 17.952l1.997 1.997a2.504 2.504 0 012.693.562l3.704 3.704a2.51 2.51 0 01-3.55 3.55L20.51 24.06a2.511 2.511 0 01-.557-2.709l-.006.017-2.053-2.053a8.933 8.933 0 01-5.343 1.758h-.015.001a9.037 9.037 0 110-18.074h.001a9.037 9.037 0 016.823 14.963l.009-.011zm-6.833.11c3.328 0 6.025-2.697 6.025-6.025s-2.697-6.025-6.025-6.025c-3.328 0-6.025 2.697-6.025 6.025s2.697 6.025 6.025 6.025z"/></svg><h5>No Repository was found!</h5></li>`;
      }
    },
    async updatePGMUserFollowers(userPGM){
      console.log(userPGM);
      const followers = new GitHubApi();
      const followerPGM = await followers.getFollowersOfUser(userPGM);
      this.updateGitUsersFollowerUI(followerPGM); 
    },
    async updateGitHubUserFollowers(userGitHub){
      const followers = new GitHubApi();
      const followerGit = await followers.getFollowersOfUser(userGitHub);
      this.updateGitUsersFollowerUI(followerGit);
      console.log(followerPGM);
    },
    updateGitUsersFollowerUI(followersGit){
      //  console.log(followersPGM);
      if(followersGit.length !== 0){
        const followers = followersGit.map((user) => {
          return`
          <li class="pgm_user-followers">
              <div class="follower__img" >
                <div class="avator">
                  <img src="${user.avatar_url}">
                </div>
                <div class="username--followers">
                  <p>${user.login}</p>
                </div>
              </div>  
          </li>`;
        }).join('')
        this.$userFollowers.innerHTML = followers;
      }else{
        console.log("no followers");
        this.$userFollowers.innerHTML = `<li class="pgm_user-repo follower__search"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M19.371 17.952l1.997 1.997a2.504 2.504 0 012.693.562l3.704 3.704a2.51 2.51 0 01-3.55 3.55L20.51 24.06a2.511 2.511 0 01-.557-2.709l-.006.017-2.053-2.053a8.933 8.933 0 01-5.343 1.758h-.015.001a9.037 9.037 0 110-18.074h.001a9.037 9.037 0 016.823 14.963l.009-.011zm-6.833.11c3.328 0 6.025-2.697 6.025-6.025s-2.697-6.025-6.025-6.025c-3.328 0-6.025 2.697-6.025 6.025s2.697 6.025 6.025 6.025z"/></svg><h5>No followers were found!</h5></li>`;
      }
    },
    async buildUIGitHubUser(github){
      const gitNames = new GitHubApi();
      const gitName = await gitNames.getSearchUser(github);
      this.updateGitHubUsersUI(gitName);
    },   
    updateGitHubUsersUI(gitName){
      const userName = gitName.items.map((user) => {
        return`
        <li class="pgm_user-list git_user-list" data-name="${user.login}">
          <div class="userInfo">
            <div class="userInfo--top" >
              <div class="image">
                <img src="${user.avatar_url}">
              </div>
              <div class="username">
                <p>${user.login}</p>
              </div>
            </div>
          </div>
        </li>
        `;
      }).join('')
      this.$githubUsers.innerHTML = userName;
      let $git_user_list = document.querySelectorAll('.git_user-list');
      for (const iterator of $git_user_list) {
        // console.log(iterator)
        iterator.addEventListener('click', (event) => {
            let user__name = event.currentTarget.dataset.name || event.currentTarget.parentNode.dataset.name || event.currentTarget.parentNode.parentNode.dataset.name;;
            // console.log(user__name);
            this.updateGitHubUsersRepo(user__name);
            this.updateGitHubUserFollowers(user__name);
            this.updateCoverGitUser(user__name)
          });
      }
    },
    async updateCoverGitUser(user__name){
      const cover = new GitHubApi();
      const coverGit = await cover.getSearchUser(user__name);
      this.$coverImage.innerHTML =  coverGit.items.map((user) => {
        if( user__name === user.login){
        return `
         <div class="background-cover" style="background-image: url(${user.avatar_url})"  >
           <div class="background__cover--inner">
            <p class="teacher__student git__padding--top">${user.type}</p>
            <div class="name_age" >
              <p class="git__padding--bottom">${user.login}</p>
            </div>
           </div>
           <h5></h5>
         </div>
        `}
       }).join('');
    },
    calculateAge(age){ 
      // this should return age with lots of decimals
      var age_dt = ((new Date()).getTime() - age) / (1000 * 60 * 60 * 24 * 365)
      // floor to the nearest round digit
      return Math.floor(age_dt);
    }
  
	};
	app.initialize();
})();
