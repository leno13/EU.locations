// URL:
// https://en.wikipedia.org/wiki/Local_councils_of_Malta
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []
let URLsmin = []

function gether_data() {
    let k = 0
    let trs = document.querySelectorAll('table.wikitable.sortable tbody tr')
    let ord = {
        url: 1,
        name: 1,
        island: 3,
        area: 4,
        pop: 5,
    }
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
            if(key == 'area'){
                ob[key] = ob[key]+' (km)'
            }
        })
        URLs.push(ob)
        k += 1
    }
}

gether_data()
URLsmin = JSON.parse(JSON.stringify(URLs))
iterate_data()