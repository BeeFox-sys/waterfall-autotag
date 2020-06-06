let location = window.location.pathname.split("/")[1].replace(".php","")

function onError(error) {
    console.log(`Error: ${error}`);
}
  
function onGot(item) {
    let tags = [];

    switch(location){

        case "reblog":
            tags = tags.concat(item.reblog || [])
            if(item.reblogUser){
                let user
                if(isRebloged()) user = getReblogedUser()
                else user = getOriginalUser()
                tags.push(user)
            }
            addTags(tags)
            break
        
        case "post":
            tags = tags.concat(item.text || [])
            addTags(tags)
            break
        
        case "postImage":
            tags = tags.concat(item.image || [])
            addTags(tags)
            break
    
        case "postArt":
            tags = tags.concat(item.art || [])
            addTags(tags)
            break
    
        case "postVideo":
            tags = tags.concat(item.video || [])
            addTags(tags)
            break
    
        case "postAudio":
            tags = tags.concat(item.audio || [])
            addTags(tags)
            break
    
        case "postChat":
            tags = tags.concat(item.chat || [])
            addTags(tags)
            break
        
        case "postQuote":
            tags = tags.concat(item.quote || [])
            addTags(tags)
            break
    
        case "postLink":
            tags = tags.concat(item.link || [])
            addTags(tags)
            break
    
        default:
            break
    }   
}

let getting = browser.storage.sync.get({
    reblog: [],
    reblogUser: false,
    text: [],
    image: [],
    art: [],
    video: [],
    audio: [],
    chat: [],
    quote: [],
    link: []
});
getting.then(onGot, onError);



function addTags(tags) {

    var script = document.createElement('script');

    for (const tag of tags) {
        script.appendChild(document.createTextNode(`(function main () {$("#postTags").tagEditor("addTag", "${tag}", true)})();`));
    }

    document.head.appendChild(script);

}

function getReblogedUser(){
    return document.getElementsByClassName("card-body")[0].getElementsByClassName("avatar")[0].nextElementSibling.innerText
}
function getOriginalUser(){
    return document.getElementsByClassName("card-header")[0].getElementsByClassName("row")[0].getElementsByClassName("col")[1].children[0].innerText
}
function isRebloged(){
    return (document.getElementsByClassName("card-header")[0].children[0].children[1].childNodes[2].nodeValue.trim() == "reblogged")
}

