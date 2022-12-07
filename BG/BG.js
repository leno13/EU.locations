// URL:
// INSERT URL HERE
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []
let URLsmin = []

function gether_data() {
    let k = 0
    let trs = document.querySelectorAll("table.wikitable.sortable.jquery-tablesorter tbody tr")
    // trs.splice((trs.length - 1),1) // remove last tr
    // delete trs[trs.length -1 ]
    trs = Array.from(trs).slice(0,trs.length - 1) // remove last tr
    let ord = {
        url: 2,
        city: 2,
        province: 3,
        pop: 7
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
        })
        URLs.push(ob)
        k += 1
    }
}

gether_data()
URLsmin = JSON.parse(JSON.stringify(URLs))
iterate_data()