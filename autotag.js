let location = window.location.pathname.split("/")[1].replace(".php","")

function onError(error) {
    console.log(`Error: ${error}`);
}
  
function onGot(item) {
    let tags = [];
    console.log(item)

    switch(location){

        case "reblog":
            let user = document.getElementsByClassName("card-body")[0].children[1].innerText
            tags = tags.concat(item.reblog || [])
            if(item.reblogUser) tags.push(user)
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

console.log("Running on "+ location)

