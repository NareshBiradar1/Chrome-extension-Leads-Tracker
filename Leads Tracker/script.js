let saveBtn = document.getElementById("input-btn");
let inputEl = document.getElementById("input-el");
inputEl.focus();

let body = document.querySelector("body");

let myLeads = [];
let deleteBtn = document.getElementById("deleteAll");

// Creating a unordered List and appending it to the body
let List = document.createElement("ul");
List.id = "ul-el";
body.appendChild(List);

// Loading previously saved leads

let previousLeads = localStorage.getItem("leads");
previousLeads = JSON.parse(previousLeads)

if(previousLeads!=null){
    for(let x=0;x<previousLeads.length;x++){
        generateListItem(previousLeads[x]);
        myLeads.push(previousLeads[x]);
    }
}
// Saving and displaying the url when save btn is clicked
saveBtn.addEventListener('click',function(){
    if(inputEl.value==""){
        alert("please provide input")
        return;
    }
    myLeads.push(inputEl.value);
    let url=inputEl.value;
    inputEl.value="";

    generateListItem(url);
    inputEl.focus();
    
})

// GEnerating a list item
function generateListItem(url){
    if (!url.startsWith('http://') && !url.startsWith('https://')){
        url = 'https://'+url;
    }
    let listItem = document.createElement("li");
    listItem.className= "item";

    let listItemLink = document.createElement("a");
    listItemLink.className="itemLink"
    listItemLink.setAttribute("href", url);
    listItemLink.setAttribute("target","_blank");
    listItemLink.innerText=url;

    listItem.appendChild(listItemLink);
    List.appendChild(listItem);
}

// Deleting all leads

deleteBtn.addEventListener('click',function(){
    myLeads=[];
    List.innerHTML="";
})
// Saving leads to the localStorage

window.addEventListener('beforeunload',function(){
    localStorage.setItem('leads',JSON.stringify(myLeads));
})