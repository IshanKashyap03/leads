let leads = [];

const inputEL = document.getElementById("input-el");

const inputBtn = document.getElementById("input-btn");

const ulEL = document.getElementById("ul-el")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"));

const deleteBtn = document.getElementById("delete-btn");

const tabBtn = document.getElementById("tab-btn");

if(leadsFromLocalStorage){
    leads = leadsFromLocalStorage;
    render(leads);
}

// const tab = [
//     {url: "https://www.linkedin.com/in/per-harald-borgen/"}
// ];

tabBtn.addEventListener("click" , function(){
    //console.log(tab[0].url);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        leads.push(tabs[0].url)
        localStorage.setItem("leads", JSON.stringify(leads) )
        render(leads)
        
    });
   
})

function render(myLeads){
    listItems = "";
    for( let i =0; i<myLeads.length;i++){
        listItems+= `
        <li>
        <a target = '_blank' href ='${myLeads[i]}'>${myLeads[i]}</a>
        </li>
        `;
    // const li = document.createElement("li")
    // li.textContent = leads[i]
    // ulEL.append(li)
    }

    ulEL.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick" , function(){
    //console.log("double clicked");
    localStorage.clear();
    leads = [];
    render(leads);
})



inputBtn.addEventListener("click",function clickOn(){
    leads.push(inputEL.value);
    inputEL.value = "";
    localStorage.setItem("leads" , JSON.stringify(leads));
    //console.log(leads);
    render(leads);
    //console.log(localStorage.getItem("leads"));
})





