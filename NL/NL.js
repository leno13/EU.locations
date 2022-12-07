// URL:
// https://en.wikipedia.org/wiki/List_of_populated_places_in_the_Netherlands
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []
let URLsmin = []

function gether_data() {
    let k = 0
    let hrefs = document.querySelectorAll('h2 + p a')
    for (let anchor of hrefs) {
        remove_node(anchor, "sup")
        if (anchor.className.includes('new')) continue
        let ob = {
            id: k,
            url: anchor.href,
            name: anchor.innerText.trim()
        }
        URLs.push(ob)
        k += 1
    }
}

gether_data()
URLsmin = JSON.parse(JSON.stringify(URLs))
iterate_data()