// URL:
// https://en.wikipedia.org/wiki/List_of_cities_and_towns_in_Latvia#Cities
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []

function gether_data() {
    let k = 0
    let trs = document.querySelectorAll("table.wikitable.sortable tbody tr")
    let ord = {
        url: 0,
        name: 0,
        pop: 2,
        municipality: 3
    }
    for (tr of trs) {
        let row = tr["children"]
        remove_node(tr, "sup")
        let url = row[ord['url']].querySelector("a") ? row[ord['url']].querySelector("a").href : ""
        if (url == "") echo("href not found")
        let name = row[ord['name']].querySelector('a')
        name ? name = name.innerText.trim() : name = ''
        let ob = {
            id: k,
            url: url,
            name: name,
            pop: row[ord['pop']].innerText.trim(),
        }
        if (k > 6) {
            mun = row[ord['municipality']].innerText.trim()
            ob["municipality"] = mun
        }
        URLs.push(ob)
        k += 1
    }
}

gether_data()
URLsmin = JSON.parse(JSON.stringify(URLs))
iterate_data()