var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.getElementById("username");
var repoContainerEl = document.getElementById("repos-container");
var repoSearchTermEl = document.getElementById("repo-search-term");
var languageButtonsEl=document.getElementById("language-buttons");


function getUserRepos (user) {
    //format the github api url
    var apiURL = 'https://api.github.com/users/' + user + '/repos';

    //make a request to the url
    fetch(apiURL).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                displayRepos(data,user);
            });
        } else {
            alert("Error: GitHub User Not Found");
        }
    })
    .catch(function(error){
        //Notice this '.catch()' getting chained onto the end of the '.then()'
        alert("Unable to connect to GitHub");
    });
};

function formSubmitHandler (event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username){
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a valid GitHub username");
    }
    console.log(event);
};

function displayRepos (repos, searchTerm) {
    //check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return; 
    }

    //clear old content
    repoContainerEl.textContent="";
    repoSearchTermEl.textContent= searchTerm;

    //loop over repos
    for (var i=0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList= "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href","./single-repo.html?repo=" + repoName);

        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName; 

        //append to container
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList= "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class'fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to container
        repoEl.appendChild(statusEl);

        //append container to dom
        repoContainerEl.appendChild(repoEl);
    }
}

function getFeaturedRepos (language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data.items, language);
            });
        } else {
            alert("Error: GitHub User not found");
        }
    });
};

function buttonClickHandler (event) {
    var language = event.target.getAttribute("data-language");
    
    if(language) {
        getFeaturedRepos(language);
        repoContainerEl.textContent="";
    }
};

getUserRepos();

//event listeners 
userFormEl.addEventListener('click', formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);