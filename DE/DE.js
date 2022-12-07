// URL:
// https://en.wikipedia.org/wiki/List_of_cities_and_towns_in_Germany
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []
let URLsmin = []

function gether_data() {
    document.querySelectorAll("div[role='navigation']").forEach(el => el.remove())
    let k = 0
    let trs = document.querySelectorAll(".mw-parser-output table tbody tr li")
    let ord = {
        url: 0,
        city: 0,
        state: 1
    }
    for (tr of trs) {
        remove_node(tr, "sup")
        let row = tr.childNodes
        let url = row[ord['url']] ? row[ord['url']].href : ""
        let state = row[ord['state']].textContent.replace("(", "").replace(")", "").trim()
        if (url == "") echo("href not found")
        let ob = {
            id: k
        }
        Object.keys(ord).forEach(function (key) {
            switch (key) {
                case 'url':
                    ob[key] = url
                    return
                case 'state':
                    ob[key] = state
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