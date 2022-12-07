log = console.log
let cdata = {} // crawled data
let reg = {
    AT: {
        name: 'Austria',
        url: 'https://en.wikipedia.org/wiki/Districts_of_Austria',
        noreg: 94,
        ord: {
            state: 0,
            NUTS: 1,
            url: 2,
            name: 2,
            car_plates: 4,
            area: 7,
            pop: 8
        },
        getTrs: function (page) {
            let trs = [...page.querySelector('table.wikitable.sortable').querySelectorAll('tr')];
            trs.splice(0, 1) // remove first tr 
            let state = ''
            for (tr of trs) {
                if (tr.children[0].rowSpan > 1 || tr.children[0].querySelector('a')) {
                    state = tr.children[0].innerText.trim()
                } else {
                    // insert state name
                    let newTd = page.createElement('td')
                    let newTxt = page.createTextNode(state)
                    newTd.appendChild(newTxt)
                    tr.children[0].parentNode.insertBefore(newTd, tr.children[0])
                }
                let elem = tr.children[2].innerText
                elem.replace('*', '')
            }
            return trs
        }
    },
    BE: {
        name: 'Belgium',
        url: 'https://en.wikipedia.org/wiki/Provinces_of_Belgium',
        noreg: 11,
        ord: {
            url: 2,
            name: 2,
            area: 9,
            pop: 10,
            popdensity: 11,
            HASC: 13
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')]
            trs.splice(0, 2) //remove first 2 elements
            trs.forEach(function (val, i) {
                // remove elements with colspan greather than 1
                let first = val.firstElementChild
                if (first.colSpan > 1) {
                    trs.splice(i, 1)
                }
            })
            return trs
        },
    },
    BG: {
        name: 'Bugaria',
        url: 'https://en.wikipedia.org/wiki/Provinces_of_Bulgaria',
        noreg: 28,
        ord: {
            url: 0,
            name: 0,
            pop: 2,
            area: 4,
            popdensity: 5
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')];
            trs.splice(0, 1) //remove first element
            return trs
        },
    },
    CY: {
        name: 'Cyprus',
        url: 'https://en.wikipedia.org/wiki/Districts_of_Cyprus',
        noreg: 6,
        ord: {
            url: 0,
            name: 0,
            pop: 1,
            area: 2
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')];
            trs.splice(0, 1) //remove first element
            return trs
        },
    },
    CZ: {
        name: 'Czech Republic',
        url: 'https://en.wikipedia.org/wiki/Regions_of_the_Czech_Republic',
        noreg: 14,
        ord: {
            licensePlate: 0,
            url: 1,
            name: 1,
            pop: 3,
            area: 4,
            popdensity: 5
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')]
            trs.splice(0, 1)
            trs[0].children[1].colSpan = 1 // change colSpan
            let child = trs[0].children[2]
            if (child.innerText) {
                // Prague region has colspan 2, which breaks the order of childs
                child.parentNode.insertBefore(page.createElement('td'), child)
            }
            trs.splice(trs.length - 1, 1) // remove last element
            return trs
        },
    },
    DE: {
        name: 'Germany',
        url: 'https://en.wikipedia.org/wiki/List_of_districts_of_Germany',
        noreg: 403,
        ord: {
            url: 0,
            name: 0,
            state: 2
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')];
            trs.splice(0, 1) //remove first element
            return trs
        }
    },
    DK: {
        name: 'Denmark',
        url: 'https://en.wikipedia.org/wiki/List_of_municipalities_of_Denmark',
        noreg: 98,
        ord: {
            LAU1: 0,
            url: 1,
            name: 1,
            area: 3,
            pop: 4,
            region: 5
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')]
            trs.splice(0, 1) //remove first element
            return trs
        },
    },
    EE: {
        name: 'Estonia',
        url: 'https://en.wikipedia.org/wiki/Counties_of_Estonia',
        noreg: 15,
        ord: {
            url: 2,
            name: 2,
            area: 4,
            pop: 5,
            popdensity: 6

        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')];
            trs.splice(0, 1) //remove first element
            return trs
        },
    },
    ES: {
        name: 'Spain',
        url: 'https://en.wikipedia.org/wiki/Provinces_of_Spain',
        noreg: 50,
        ord: {
            url: 0,
            name: 0,
            autonomousComunity: 2
        },
        getTrs: function (page) {
            //remove images (flags)
            page.querySelectorAll('a.image').forEach((el) => el.remove())

            // get trs
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')];
            trs.splice(0, 1) //remove first element
            return trs
        },
    },
    FI: {
        name: 'Finland',
        url: 'https://en.wikipedia.org/wiki/Regions_of_Finland',
        noreg: 19,
        ord: {
            url: 2,
            name: 2,
            area: 6,
            pop: 7
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')];
            trs.splice(0, 1) //remove first element
            return trs
        },
    },
    FR: {
        name: 'France',
        url: 'https://en.wikipedia.org/wiki/Regions_of_France',
        noreg: 18,
        ord: {
            url: 1,
            name: 1,
            area: 4,
            pop: 5
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable')[2].querySelectorAll('tr')];
            trs.splice(0, 1) //remove first element
            trs.splice(trs.length - 1, 1) // remove last element
            return trs
        },
    },
    GR: {
        name: 'Greece',
        url: 'https://en.wikipedia.org/wiki/Regions_of_Greece',
        noreg: 14,
        ord: {
            url: 2,
            name: 2,
            area: 3,
            pop: 4,
            popdensity: 5
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')];
            trs.splice(0, 1) //remove first element
            return trs
        },
    },
    HR: {
        name: 'Croatia',
        url: 'https://en.wikipedia.org/wiki/Counties_of_Croatia',
        noreg: 21,
        ord: {
            url: 0,
            name: 0,
            area: 2,
            pop: 3
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable')[3].querySelectorAll('tr')];
            trs.splice(0, 1) //remove first element
            return trs
        },
    },
    HU: {
        name: 'Hungary',
        url: 'https://en.wikipedia.org/wiki/Counties_of_Hungary',
        noreg: 20,
        ord: {
            url: 0,
            name: 0,
            area: 3,
            pop: 4,
            popdensity: 5
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable')[0].querySelectorAll('tr')];
            trs.splice(0, 1) //remove first element
            trs.splice(trs.length - 2, 2) // remove last 2 element
            return trs
        },
    },
    IE: {
        name: 'Ireland',
        url: 'https://en.wikipedia.org/wiki/Counties_of_Ireland',
        noreg: 35,
        ord: {
            url: 0,
            name: 0,
            province: 5
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')];
            trs.splice(0, 1) //remove first element
            for (tr of trs) {
                if (tr.children[0].colSpan == 1) {
                    tr.children[0].remove()
                    tr.children[0].colSpan = 2
                }
            }
            return trs
        },
    },
    IT: {
        name: 'Italy',
        url: 'https://en.wikipedia.org/wiki/Provinces_of_Italy',
        noreg: 107,
        ord: {
            url: 1,
            name: 1,
            code: 3,
            region: 4,
            pop: 6,
            area: 7,
            popdensity: 8
        },
        getTrs: function (page) {
            // remove second tr from row that extends on 2 lines
            page.querySelectorAll('a[title="South Tyrol"]')[0].parentElement.parentElement.remove()

            let trs = [...page.querySelector('table.wikitable.sortable').querySelectorAll('tr')];
            trs.splice(0, 1) //remove first 2 element
            trs.splice(trs.length - 1, 1) // remove last element
            return trs
        },
    },
    LT: {
        name: 'Lithuania',
        url: 'https://en.wikipedia.org/wiki/Counties_of_Lithuania',
        noreg: 10,
        ord: {
            url: 1,
            name: 1,
            area: 3,
            pop: 4,
            popdensity: 5
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')];
            trs.splice(0, 1) //remove first element
            trs.splice(trs.length - 1, 1) // remove last element
            return trs
        },
    },
    LU: {
        name: 'Luxembourg',
        url: 'https://en.wikipedia.org/wiki/List_of_cantons_of_Luxembourg_by_population',
        noreg: 12,
        ord: {
            url: 1,
            name: 1,
            pop: 2
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable tr')];
            trs.splice(0, 1) //remove first element
            return trs
        },
    },
    LV: {
        name: 'Latvia',
        url: 'https://en.wikipedia.org/wiki/Administrative_divisions_of_Latvia#Municipalities_as_of_2021',
        noreg: 43,
        ord: {
            url: 1,
            name: 1,
            pop: 2
        },
        getTrs: function (page) {
            page.querySelectorAll('table.wikitable').forEach(el => el.querySelector('tr').remove())
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')];
            return trs
        },
    },
    MT: {
        name: 'Malta',
        url: 'https://en.wikipedia.org/wiki/Regions_of_Malta',
        noreg: 5,
        ord: {
            url: 1,
            name: 1,
            area: 4,
            pop: 5,
            popdensity: 6
        },
        getTrs: function (page) {
            let trs = [...page.querySelector('table.wikitable.sortable').querySelectorAll('tr')];
            trs.splice(0, 1) //remove first element
            return trs
        },
    },
    NL: {
        name: 'Netherlands',
        url: 'https://en.wikipedia.org/wiki/Provinces_of_the_Netherlands',
        noreg: 12,
        ord: {
            url: 0,
            name: 0,
            area: 5,
            pop: 9,
            popdensity: 10
        },
        getTrs: function (page) {
            let trs = [...page.querySelector('table.wikitable.sortable').querySelectorAll('tr')];
            trs.splice(0, 2) //remove first 2 elements
            trs.splice(trs.length - 1, 1) // remove last element
            arrage_colspan(trs, 1)
            return trs
        },
    },
    PL: {
        name: 'Poland',
        url: 'https://en.wikipedia.org/wiki/Voivodeships_of_Poland',
        noreg: 16,
        ord: {
            abbr: 0,
            url: 4,
            name: 4,
            area: 7,
            pop: 8,
            popdensity: 9,
            car_plates: 10,
        },
        getTrs: function (page) {
            let trs = [...page.querySelector('table.wikitable.sortable').querySelectorAll('tr')];
            trs.splice(0, 1) //remove first element
            trs.splice(trs.length - 1, 1) // remove last element
            return trs
        },
    },
    PT: {
        name: 'Portugalia',
        url: 'https://en.wikipedia.org/wiki/Districts_of_Portugal',
        noreg: 20,
        ord: {
            url: 1,
            name: 1,
            pop: 4,
            area: 5,
            popdensity: 6
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')];
            trs.splice(0, 1) //remove first element
            return trs
        },
    },
    RO: {
        name: 'Romania',
        url: 'https://en.wikipedia.org/wiki/Counties_of_Romania',
        noreg: 42,
        ord: {
            url: 1,
            name: 1,
            car_plates: 5,
            NUTS: 8,
            pop: 9,
            area: 10
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')];
            trs.splice(0, 1) //remove first element
            arrage_colspan(trs, 1)
            return trs
        },
    },
    SE: {
        name: 'Sweden',
        url: 'https://en.wikipedia.org/wiki/Counties_of_Sweden',
        noreg: 21,
        ord: {
            NUTS: 1,
            url: 3,
            name: 3,
            area: 6,
            pop: 7,
            popdensity: 8,
        },
        getTrs: function (page) {
            remove_node(page, 'span.flagicon')
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')];
            trs.splice(0, 1) //remove first element
            return trs
        },
    },
    SI: {
        name: 'Slovenia',
        url: 'https://en.wikipedia.org/wiki/Statistical_regions_of_Slovenia',
        noreg: 12,
        ord: {
            url: 0,
            name: 0,
            NUTS: 2,
            area: 4,
            pop: 5
        },
        getTrs: function (page) {
            let trs = [...page.querySelectorAll('table.wikitable.sortable tr')];
            trs.splice(0, 2) //remove first 2 elements
            return trs
        },
    }
}

function arrage_colspan(trs, index) {
    for (tr of trs) {
        if (tr.children[index].colSpan > 1) {
            tr.children[index].colSpan = 1
            let child = tr.children[index]
            child.parentNode.insertBefore(document.createElement('td'), child.nextSibling)
        }
    }
}

function remove_node(elem, key) {
    try {
        elem.querySelectorAll(key).forEach((el) => {
            el.remove()
        }
        )
    } catch (e) { }
}

function gether_data(ord, trs, ret) {
    let k = 0
    for (tr of trs) {
        remove_node(tr, "sup")
        let row = tr["children"]
        let url = row[ord['url']].querySelector("a") ? row[ord['url']].querySelector("a").href : ""
        if (url == "") log("href not found")
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

async function _fetch(ob) {
    // return ob.url as document page
    let URL = ob["url"]
    if (URL == "")
        return
    let res = await fetch(URL).then((res) => {
        return res.text()
    }
    ).catch((err) => {
        log("Could not fetch ob:", ob['id'], URL)
    }
    )
    var parser = new DOMParser();
    var page = parser.parseFromString(res, "text/html");
    return page
}
let _page = ''
async function main() {
    // for (key of ['RO']) {
    for (key of Object.keys(reg)) {
        let country = reg[key]
        let page = await _fetch(country)
        _page = page
        let trs = country.getTrs(page)
        cdata[key] = []
        gether_data(country.ord, trs, cdata[key])
        if (cdata[key].length != country.noreg) {
            log(`@${key} could not crawl all regions,\n#no-regions:${cdata[key].length}\nexpected:${country.noreg}\n`)
        }
        if (['IE'].includes(key)) {
            for (county of cdata[key]) {
                // if fetch_page is defined, then fetch page
                if (typeof fetch_page === 'function') fetch_page(county)
            }
        }
        download(JSON.stringify(cdata[key]), `${key}.regions.json`)
    }
    log("### D O N E ###")
    log('cdata:', cdata)
}


function download(data, filename) {
    log()
    var bb = new Blob([data], { type: 'text/plain' })
    var a = document.createElement('a')
    let obURL = window.URL.createObjectURL(bb)
    a.download = filename
    a.href = obURL
    a.click();
    window.URL.revokeObjectURL(obURL)
}

main()

// doc:
// * https://en.wikipedia.org/wiki/Nomenclature_of_Territorial_Units_for_Statistics
// * ISO 3166 
// * https://en.wikipedia.org/wiki/ISO_3166#:~:text=ISO%203166%20is%20a%20standard,e.g.%2C%20provinces%20or%20states).