var issueContainerEl = document.getElementById("issues-container");
var limitWarningEl = document.getElementById("limit-warning");
var repoNameEl=document.getElementById("repo-name");

function getRepoName () {
    var queryString = document.location.search;

    var repoName = queryString.split("=")[1];
    
    if (repoName) {
        getRepoIssues(repoName);
        repoNameEl.textContent=repoName;
    } else {
        document.location.replace("./index.html");
    }
};

function getRepoIssues(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                //pass response data to dom function
                displayIssues(data);

                //check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        } else {
            document.location.replace("./index.html");
        }
    });
    console.log(repo);
};

function displayIssues (issues) {

    if (issues.length ===0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i=0; i < issues.length; i++) {
        //create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
            //create a span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent= issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create type element
        var typeEl = document.createElement("span");

        //check if issues is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issues)";
        }

        //append to container

        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    } 
};

function displayWarning (repo) {
    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append to warning container
    limitWarningEl.appendChild(linkEl);
};


getRepoName();