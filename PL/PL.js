// URL:
// INSERT URL HERE
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []
let URLsmin = []
let regions = []

function gether_data() {
    let k = 0
    let trs = document.querySelectorAll('table.wikitable.sortable tbody tr')
    let ord = {
        url: 0,
        name: 0,
        voivodeship: 1,
        pop: 2,
    }
    for (tr of trs) {
        remove_node(tr, "sup")
        let row = tr["children"]
        let elem = row[ord['url']].querySelector("a")
        let url = elem ? elem.href : ""
        elem = row[ord['voivodeship']].querySelector("a")
        let voivod = elem ? elem.innerText.trim() : ''
        if (url == "") echo("href not found")
        let ob = {
            id: k
        }
        Object.keys(ord).forEach(function (key) {
            if (key == 'url') {
                ob[key] = url
                return
            }
            if (key == 'voivodeship') {
                ob[key] = voivod
                return ``
            }
            ob[key] = row[ord[key]].innerText.trim()
        })
        URLs.push(ob)
        k += 1
    }
    let lis = document.querySelectorAll('table tr td[valign="Top"] ul li')
    for (elem of lis) {
        remove_node(elem, 'sup')
        let anchor = elem.querySelector('a')
        let ob = {
            id: k,
            url: anchor ? anchor.href : '',
            name: anchor.innerText.trim()
        }
        URLs.push(ob)
        k += 1
    }
}

async function gether_regions() {
    let URL = "https://en.wikipedia.org/wiki/Voivodeships_of_Poland"
    let doc = await _fetch({ url: URL })
    doc.querySelector('tr.sortbottom').remove() // last elemnt
    doc.querySelector('table.wikitable.sortable tbody tr').remove() // first element
    let trs = doc.querySelector('table.wikitable.sortable tbody').querySelectorAll('tr')
    let k = 0
    for (tr of trs) {
        echo(tr)
        let row = tr["children"]
        let ord = {
            abbr: 0,
            url: 4,
            name: 4,
            area: 7,
            pop: 8,
            car_plates: 10
        }
        let ob = {}
        Object.keys(ord).forEach(function (key) {
            if (key == 'url') {
                ob[key] = row[ord[key]].querySelector('a').href
                return
            }
            // echo(row[ord[key]])
            ob[key] = row[ord[key]].innerText.trim()
        })
        ob.id = k
        regions.push(ob)
        k += 1
    }
}

gether_data()
URLsmin = JSON.parse(JSON.stringify(URLs))
iterate_data()
gether_regions()