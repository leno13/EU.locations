// URL:
// https://en.wikipedia.org/wiki/List_of_cities_and_towns_in_Austria
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []
let URLsmin = []

function gether_data() {
    let k = 0
    let tables = document.querySelectorAll("table.sortable.wikitable")
    tables = Array.from(tables).slice(1) // remove first table (it's redundant locations)
    for (table of tables) {
        let county = table.previousElementSibling.querySelector("span.mw-headline").innerText
        let trs = table.querySelectorAll("tbody tr")
        let ord = {
            url: 0,
            city: 0,
            designaion: 1,
            pop: 2,
        }
        for (tr of trs) {
            remove_node(tr, "sup")
            let row = tr["children"]
            let url = row[ord['url']].querySelector("a") ? row[ord['url']].querySelector("a").href : ""
            if (url == "") echo("href not found @", row[ord['url']].innerText)
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
            URLs.push(ob)
            k += 1
        }
    }
}

gether_data()
URLsmin = JSON.parse(JSON.stringify(URLs))
iterate_data()