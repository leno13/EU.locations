// URL:
// https://en.wikipedia.org/wiki/List_of_cities_and_towns_in_the_Czech_Republic
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// copy & paste this code in a browser console or create a snipped & run it

let URLs = []
let URLsmin = []

function gether_data() {
    let k = 0
    let table = document.querySelectorAll("div.div-col ul li")
    for (tr of table) {
        let url = tr.querySelector("a").href
        let city_name = tr.querySelector("a").innerText
        let tr2str = tr.innerText
        let pop = tr2str.substring(tr2str.indexOf('(') + 1, tr2str.indexOf(')'))
        let ob = {
            "id": k,
            "url": url,
            "city": city_name,
            "pop": pop
        }
        URLs.push(ob)
        k += 1
    }
}

gether_data()
URLsmin = JSON.parse(JSON.stringify(URLs))
iterate_data()