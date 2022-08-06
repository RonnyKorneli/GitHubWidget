const input = document.querySelector(".gitHubUser")
const submit = document.querySelector("button")

submit.addEventListener("click", async () => {

    let userNow = input.value

    let url = "https://api.github.com/users/"+userNow+"/repos"
    const response = await fetch(url);
    const info = await response.json();
    console.log(info)



    info.forEach((item) => {

        
        const divLeft = document.createElement("DIV")
        const divRight = document.createElement("DIV")
        const divBox = document.createElement("DIV")
        const h2 = document.createElement("H2")
        const h3 = document.createElement("h3")
        const p = document.createElement("p")
        const section = document.querySelector("section")
        const a = document.createElement("a");

        //Timer.... when was the repo cerated?...........
        let dateCreated = item.created_at;
        let dateMilliSec = new Date(dateCreated).getTime();
        let dateNow = new Date().getTime();
        let timeDiffMilliSec = dateNow - dateMilliSec;
        const sec = 1000
        const min = sec * 60;
        const hrs = min * 60;
        const day = hrs * 24;
        const week = day * 7;
        const month = week * 4
        const diffInMonths = Math.floor((timeDiffMilliSec) / month)
        const restDays = Math.floor((timeDiffMilliSec % month) / day)
        const dateInnertext = `Created ${diffInMonths} Months and ${restDays} days ago`
        
        let description = item.description;
        p.append(description)
        let repos = item.name;
       
        p.innerText = dateInnertext;
        h2.innerText = repos;
        h3.innerText = description;
        divLeft.classList.add("divRepos")
        divBox.classList.add("divBox")
        divRight.classList.add("divTime")

        // HEADLINE BEING MADE INTO A LINK THAT GOES TO THE REPOS.......
        a.href = `https://github.com/${userNow}/${repos}`
        a.innerText = item.name

        // ATTACHING THE STUFF TO THE DOM...............
        section.append(divBox)
        divBox.append(divLeft)
        divLeft.append(a)
        divLeft.append(h3)
        divRight.append(p)        
        divBox.append(divRight)


       })

})