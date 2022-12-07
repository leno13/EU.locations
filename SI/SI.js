// URL:
// https://en.wikipedia.org/wiki/Municipalities_of_Slovenia
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []
let URLsmin = []
let regions = []

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

async function gether_regions() {
    let url = 'https://en.wikipedia.org/wiki/Statistical_regions_of_Slovenia'
    let page = await _fetch({ url: url })
    // remove first 2 tr
    page.querySelector('table.wikitable.sortable tbody tr').remove()
    page.querySelector('table.wikitable.sortable tbody tr').remove()
    let trs = page.querySelectorAll('table.wikitable.sortable tbody tr')
    ord = {
        url: 0,
        name: 0,
        area: 4,
        pop: 5
    }
    gether_data(ord, trs, regions)
    echo(JSON.stringify(regions))
    for (reg of regions) {
        fetch_page(reg)
    }
}


let trs = document.querySelectorAll("table.wikitable.sortable tbody tr")
let ord = {
    municipality: 1,
    url: 3,
    name: 3,
    pop: 4,
}

gether_data(ord, trs, URLs)
URLsmin = JSON.parse(JSON.stringify(URLs))
iterate_data()
gether_regions()
