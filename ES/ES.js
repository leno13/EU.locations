let URLs = []
let id = 0
let order = {
    "Almería": {
        "auc": "Andalusia",
        "mun": 1,
        "pop": 3
    },
    "Cádiz": {
        "auc": "Andalusia",
        "mun": 0,
        "pop": 3
    },
    "Córdoba": {
        "auc": "Andalusia",
        "mun": 0,
        "pop": 1
    },
    "Granada": {
        "auc": "Andalusia",
        "mun": 0,
        "pop": 2
    },
    "Huelva": {
        "auc": "Andalusia",
        "mun": 0,
        "pop": 3
    },
    "Jaén": {
        "auc": "Andalusia",
        "mun": 0,
        "pop": 1
    },
    "Málaga": {
        "auc": "Andalusia",
        "mun": 0,
        "pop": 3,
        "area": 1
    },
    "Seville": {
        "auc": "Andalusia",
        "mun": 0,
        "pop": 3
    },
    "Huesca": {
        "auc": "Aragon",
        "mun": 0,
        "pop": 1
    },
    "Teruel": {
        "auc": "Aragon",
        "mun": 0,
        "pop": 1
    },
    "Zaragoza": {
        "auc": "Aragon",
        "mun": 0,
        "pop": 1
    },
    "Asturias": {
        "auc": "Asturias",
        "mun": 1,
        "area": 2,
        "pop": 3
    },
    "Balearic Islands": {
        "auc": "Balearic Islands",
        "mun": 0,
        "comarca": 1,
        "island": 2,
        "area": 3,
        "pop": 6
    },
    "Álava": {
        "auc": "Basque Country",
        "mun": 0,
        "pop": 4
    },
    "Biscay": {
        "auc": "Basque Country",
        "mun": 0,
        "pop": 1
    },
    "Gipuzkoa": {
        "auc": "Basque Country",
        "mun": 0,
        "pop": 4
    },
    "Las Palmas": {
        "auc": "Canary Islands",
        "mun": 0,
        "island": 1,
        "area": 2,
        "pop": 5
    },
    "Santa Cruz de Tenerife": {
        "auc": "Canary Islands",
        "mun": 0,
        "island": 1,
        "area": 2,
        "pop": 5
    },
    "Cantabria": {
        "auc": "Cantabria",
        "mun": 0,
        "area": 1,
        "pop": 4
    },
    "Ávila": {
        "auc": "Castile and León",
        "mun": 1,
        "pop": 2,
        "area": 3
    },
    "Burgos": {
        "auc": "Castile and León",
        "mun": 0,
        "pop": 1
    },
    "León": {
        "auc": "Castile and León",
        "mun": 0,
        "pop": 1
    },
    "Palencia": {
        "auc": "Castile and León",
        "mun": 0,
        "pop": 1
    },
    "Salamanca": {
        "auc": "Castile and León",
        "mun": 0,
        "pop": 1
    },
    "Segovia": {
        "auc": "Castile and León",
        "mun": 0,
        "pop": 1
    },
    "Soria": {
        "auc": "Castile and León",
        "mun": 0,
        "pop": 1
    },
    "Valladolid": {
        "auc": "Castile and León",
        "mun": 0,
        "pop": 1
    },
    "Zamora": {
        "auc": "Castile and León",
        "mun": 0,
        "pop": 1,
        "area": 2,
        "elevation": 3
    },
    "Albacete": {
        "auc": "Castile–La Mancha",
        "mun": 0,
        "pop": 3
    },
    "Ciudad Real": {
        "auc": "Castile–La Mancha",
        "mun": 0,
        "pop": 2
    },
    "Cuenca": {
        "auc": "Castile–La Mancha",
        "mun": 0,
        "pop": 1
    },
    "Guadalajara": {
        "auc": "Castile–La Mancha",
        "mun": 0,
        "pop": 1
    },
    "Toledo": {
        "auc": "Castile–La Mancha",
        "mun": 0,
        "pop": 1
    },
    "Catalonia": {
        "auc": "Catalonia",
        "mun": 0,
        "comarca": 1,
        "province": 2,
        "pop": 3,
        "area": 4,
        "density": 5
    },
    "Badajoz": {
        "auc": "Extremadura",
        "mun": 0,
        "pop": 1
    },
    "Cáceres": {
        "auc": "Extremadura",
        "mun": 0,
        "pop": 1
    },
    "A Coruña": {
        "auc": "Galicia",
        "mun": 0,
        "pop": 1
    },
    "Lugo": {
        "auc": "Galicia",
        "mun": 0,
        "pop": 1
    },
    "Ourense": {
        "auc": "Galicia",
        "mun": 0,
        "pop": 1
    },
    "Pontevedra": {
        "auc": "Galicia",
        "mun": 0,
        "pop": 3,
        "comarca": 4
    },
    "Madrid": {
        "auc": "Madrid",
        "mun": 0,
        "area": 1,
        "pop": 2
    },
    "Murcia": {
        "auc": "Murcia",
        "mun": 0,
        "area": 1,
        "pop": 4
    },
    "Navarre": {
        "auc": "Navarre",
        "mun": 0,
        "pop": 1
    },
    "La Rioja": {
        "auc": "La Rioja",
        "mun": 0,
        "pop": 1
    },
    "Alicante": {
        "auc": "Valencian Community",
        "mun": 0,
        "pop": 3
    },
    "Castellón": {
        "auc": "Valencian Community",
        "mun": 0,
        "pop": 3,
        "comarca": 4
    },
    "Valencia": {
        "auc": "Valencian Community",
        "mun": 0,
        "pop": 3
    }
}
function echo() {
    console.log(...arguments)
}

let esregions = [], auc
function build_regions_list() {
    let trs = document.querySelectorAll("table.wikitable tbody tr")
    for (tr of trs) {
        let td = tr.children
        if (td[1].innerText == "List") {
            tr.remove()
            continue
        }
        // echo(td[0].querySelector("span.flagicon"))
        if (td[0].querySelector("span.flagicon")) {
            auc = td[0].querySelector("a").innerText
            if (auc == "Ceuta" || auc == "Melilla") {
                // detect Autonomous cities, and add them to URLs to be crawled
                let ob = {
                    id: id,
                    auc: auc,
                    type: "Autonomous city",
                    url: td[0].querySelector("a").href
                }
                URLs.push(ob)
                id += 1
                continue
            }
            let toadd = ['Asturias', 'Balearic Islands', 'Cantabria', 'Madrid', 'Murcia', 'Navarre', 'La Rioja', 'Catalonia']
            let ob = {
                auc: auc,
                type: "Autonomous Community",
                url: td[1].querySelector("a").href
            }
            if (toadd.includes(auc)) {
                esregions.push(ob)
            }
            continue
        }
        let province = td[0].querySelector("a").innerText.replace("province", "").trim()
        let province_url = td[1].querySelector("a").href
        let exlude = ['Barcelona', 'Girona', 'Lleida', 'Tarragona']
        if (exlude.includes(province)) {
            continue
        }
        let ob = {
            auc: auc,
            province: province,
            url: province_url
        }
        esregions.push(ob)
    }
    echo("build list ready")
}

function crawl_region(page, ob) {
    let name = ('province' in ob) ? ob['province'] : ob['auc']
    let obOrder = order[name]
    if (['Balearic Islands', 'Catalonia', 'Murcia'].includes(ob['auc'])) {
        // delete last element ( usually is something like *Total, 1,234,567)
        let lastrow = page.querySelector("table.wikitable tbody tr:last-child")
        page.querySelector("table.wikitable tbody tr:last-child").parentNode.removeChild(lastrow)
    }
    let trs = page.querySelectorAll("table.wikitable tbody tr")
    for (tr of trs) {
        let row = tr["children"]
        if (tr.querySelector("th")) {
            // if tr is table header (th), then continue
            continue
        }
        let location = {}
        location['auc'] = ob['auc']
        location['province'] = ('province' in ob) ? ob['province'] : ""
        if ('mun' in obOrder) {
            let mun = obOrder['mun']
            if (row[mun].querySelector('a')) {
                location["url"] = row[mun].querySelector('a').href
                location['municipality'] = row[mun].querySelector('a').innerText
            } else {
                echo("tr:", tr, "auc:", ob["auc"])
                location['url'] = "N/A"
                location['municipality'] = row[mun].innerText
            }
        }
        for (i of ['pop', 'area', 'island', 'comarca']) {
            if (i in obOrder) {
                // if cur region has the following data, add it to location
                location[i] = row[obOrder[i]].innerText
            }
        }
        for (key in location) {
            if (key == "url") continue // do not replace in URL
            location[key] = location[key].trim().replace(/\n|\r|\\/g, "");
        }
        location.id = id
        URLs.push(location)
        id += 1
    }
}

function fetch_region(ob) {
    let URL = ob["url"]
    fetch(URL).then((res) => {
        return res.text()
    })
        .then((html) => {
            var parser = new DOMParser();
            // Parse the text
            var doc = parser.parseFromString(html, "text/html");
            return doc
        })
        .then((doc) => {
            return crawl_region(doc, ob)
        })
}

build_regions_list() // gathers all regions from Spain

async function iterate_regions() {
    for (region of esregions) {
        echo("fetching:", ("province" in region) ? region['province'] : region["auc"])
        await fetch_region(region)
    }
}

async function iterate_all(){
    await iterate_regions()
    iterate_data()
}

iterate_all()
