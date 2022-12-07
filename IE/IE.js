// URL:
// https://en.wikipedia.org/wiki/List_of_towns_and_villages_in_the_Republic_of_Ireland
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []
let URLsmin = []

function gether_data() {
    let k = 0
    let as = document.querySelectorAll('div.hlist.hlist-separated li a')
    for (a of as) {
        remove_node(a, "sup")
        let url = a.href
        let name = a.childNodes[0].wholeText
        let ob = {
            k: k,
            url:url,
            name:name
        }
        URLs.push(ob)
        k+=1
    }
}

gether_data()
URLsmin = JSON.parse(JSON.stringify(URLs))
iterate_data()