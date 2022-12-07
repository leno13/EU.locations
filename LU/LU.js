// URL:
// https://en.wikipedia.org/wiki/List_of_towns_in_Luxembourg
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []

function gether_data() {
    let k = 0
    let trs = document.querySelectorAll("table.wikitable tbody tr")
    let ord = {
        url: 1,
        name: 1,
        canton: 2,
        area:3,
        pop: 4,
    }
    for (tr of trs) {
        let row = tr["children"]
        remove_node(tr, "sup")
        let url = row[ord['url']].querySelector("a") ? row[ord['url']].querySelector("a").href : ""
        let name = row[ord['name']].querySelector("a").innerText
        let ob = {}
        Object.keys(ord).forEach(function (key) {
            if (key == 'url') {
                ob[key] = url
                return
            }
            if(key == 'name'){
                ob[key] = name
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