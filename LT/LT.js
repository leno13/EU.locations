// URL:
// https://en.wikipedia.org/wiki/List_of_cities_in_Lithuania
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []
let URLsmin = []
let k = 0

function gether_data(trs, ord) {
    for (tr of trs) {
        remove_node(tr, "sup")
        let row = tr["children"]
        let url = row[ord['url']].querySelector("a") ? row[ord['url']].querySelector("a").href : ""
        if (url == "") echo("href not found")
        let ob = {
            "id": k,
            "url": url,
            "name": row[ord['name']].innerText,
            "pop": row[ord['pop']].innerText,
            "county": row[ord['county']].innerText.replaceAll('County', '').trim(),
            "municipality": row[ord['municipality']].innerText.replaceAll('Municipality', '').trim()
        }
        URLs.push(ob)
        k += 1
    }
}

let ord1 = {
    url: 2,
    name: 2,
    pop: 4,
    county: 8,
    municipality: 9
}
let trs1 = document.querySelectorAll('table.wikitable.sortable')[0].querySelectorAll('tbody tr')
gether_data(trs1, ord1)

ord1['pop'] = 5
ord1['county'] = 7
ord1['municipality'] = 8
let trs2 = document.querySelectorAll('table.wikitable.sortable')[1].querySelectorAll('tbody tr')
gether_data(trs2, ord1)
URLsmin = JSON.parse(JSON.stringify(URLs))
iterate_data()