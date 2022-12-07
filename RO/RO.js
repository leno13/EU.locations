// URL:
// https://en.wikipedia.org/wiki/List_of_cities_and_towns_in_Romania
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []
let URLsmin = []
let county = []
let county_names = []

function gether_data(ord, trs, ret) {
    let k = 0
    for (tr of trs) {
        remove_node(tr, "sup")
        let row = tr["children"]
        check_county(row)
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

function check_county(row) {
    let loca = row[0]
    if (loca.innerText.trim() == 'Bucharest') {
        county.push({ name: 'Bucharest', url: loca.querySelector('a').href })
        county_names.push('Bucharest')
    }

    let url = row[1].querySelector('a')
    if (url) url = url.href

    let name = row[1].querySelector('a')
    if (name) name = name.innerText.trim()
    if (!url && !name) return

    if (!county_names.includes(name)) {
        county.push({ name: name, url: url })
        county_names.push(name)
    }
}

let trs = document.querySelectorAll('table.sortable.wikitable.jquery-tablesorter tbody tr')
let ord = {
    url: 0,
    name: 0,
    county: 1,
    pop: 2
}
gether_data(ord, trs, URLs)
URLsmin = JSON.parse(JSON.stringify(URLs))
iterate_data()

for (cnt of county) {
    fetch_page(cnt)
}