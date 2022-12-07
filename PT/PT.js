// URL:
// https://en.wikipedia.org/wiki/List_of_municipalities_of_Portugal
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []
let URLsmin = []
let districts = []

function gether_data(ord, trs, ret) {
    let k = 0
    for (tr of trs) {
        remove_node(tr, "sup")
        let row = tr["children"]
        let url = row[ord['url']].querySelector("a") ? row[ord['url']].querySelector("a").href : ""
        if (url == "") echo("href not found")
        let ob = {
            id: k
        }
        Object.keys(ord).forEach(function (key) {
            if (key == 'url') {
                ob[key] = url
                return
            }
            ob[key] = row[ord[key]].innerText.trim()
        })
        ret.push(ob)
        k += 1
    }
}

let ord = {
    district: 0,
    url: 2,
    name: 2,
    area: 3,
    pop: 5,
    popdensitykm: 7
}
let trs = document.querySelectorAll("table.wikitable.sortable")[1].querySelectorAll('tbody tr')
URLsmin = JSON.parse(JSON.stringify(URLs))
iterate_data()

// iterate districts
gether_data(ord, trs, URLs)
ord = {
    id: 0,
    url: 1,
    name: 1
}
trs = document.querySelectorAll("table.wikitable.sortable")[0].querySelectorAll('tbody tr')
gether_data(ord, trs, districts)
for(dis of districts){
    fetch_page(dis)
}
