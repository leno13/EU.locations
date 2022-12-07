// URL:
// https://en.wikipedia.org/wiki/List_of_cities_and_towns_of_Hungary
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []
let URLsmin = []
let k = 0

function clean_page() {
    document.querySelectorAll("td[colspan='9']").forEach((el) => {
        let parent = el.parentNode
        echo('remove row:', parent)
        parent.remove()
    })
}

function gether_data(trs, ord) {
    for (tr of trs) {
        remove_node(tr, "sup")
        let row = tr["children"]
        // echo('row:',row)
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

function gether_others(trs, ord) {
    for (tr of trs) {
        echo('tr:', [tr], tr)
        let ob = {id:k}
        let row = tr.childNodes
        let url = row[ord['url']].href ? row[ord['url']].href : ""
        let pop = row[ord['pop']] ? row[ord['pop']].wholeText.replaceAll(/[()]/g, '').trim() : ""
        ob['url'] = url
        ob['city'] = row[ord['city']].innerText.trim()
        ob['pop'] = pop
        URLs.push(ob)
        k += 1
    }
}

clean_page()
let ord = {}
ord.big = {
    trs: document.querySelectorAll("table.wikitable.sortable tbody")[0].querySelectorAll('tr'),
    ord: {
        url: 1,
        city: 1,
        county: 2,
        pop: 6
    }
}
ord.medium = {
    trs: document.querySelectorAll("table.wikitable.sortable tbody")[1].querySelectorAll('tr'),
    ord: ord.big.ord
}
ord.towns = {
    trs: document.querySelectorAll("table.wikitable.sortable tbody")[2].querySelectorAll('tr'),
    ord: {
        url: 1,
        city: 1,
        county: 2,
        pop: 5

    }
}
ord.other = {
    trs: document.querySelectorAll('div.div-col li'),
    ord: {
        url: 0,
        city: 0,
        pop: 1
    }
}

gether_data(ord.big.trs, ord.big.ord)
gether_data(ord.medium.trs, ord.medium.ord)
gether_data(ord.towns.trs, ord.towns.ord)
gether_others(ord.other.trs, ord.other.ord)
URLsmin = JSON.parse(JSON.stringify(URLs))
iterate_data()
