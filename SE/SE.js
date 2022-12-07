// URL:
// https://en.wikipedia.org/wiki/List_of_urban_areas_in_Sweden
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []
let URLsmin = []
let counties = []

function gether_data(ord, trs, ret) {
    let k = 0
    for (tr of trs) {
        remove_node(tr, "sup")
        let row = tr["children"]
        let url = row[ord['url']].querySelector("a") ? row[ord['url']].querySelector("a").href : ""
        if (url == "") echo("href not found", tr)
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
    url: 0,
    name: 0,
    pop: 2,
    density: 4
}
let trs = document.querySelectorAll('table.sortable.wikitable.jquery-tablesorter tbody tr')
gether_data(ord, trs, URLs)
URLsmin = JSON.parse(JSON.stringify(URLs))
iterate_data()


async function gether_counties() {
    let url = 'https://en.wikipedia.org/wiki/Counties_of_Sweden'
    let page = await _fetch({ url: url })
    ord = {
        url: 3,
        name: 3,
        area: 6,
        pop: 7
    }
    trs = page.querySelectorAll('table.wikitable.sortable tbody tr')
    gether_data(ord, trs, counties)
    // delete first element from counties
    counties.splice(0,1)
    for(cnt of counties){
        fetch_page(cnt)
    }
}

gether_counties()