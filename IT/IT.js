// URL:
// https://en.wikipedia.org/wiki/Provinces_of_Italy
// first you'll have to run aux.js, so that you'll have the function "iterate_data" available
// memo & paste this code in a browser console or create a snipped & run it

let URLs = []
let provinces = {}
provinces.list = []
let regions = {}
regions.list = []
let k = 0

async function _fetch(ob) {
    let URL = ob["url"]
    if (URL == "")
        return
    let res = await fetch(URL).then((res) => {
        return res.text()
    }
    ).catch((err) => {
        echo("Could not fetch ob:", ob['id'], URL)
    }
    )
    var parser = new DOMParser();
    var page = parser.parseFromString(res, "text/html");
    return page
}

provinces.make_list = function () {
    let table = document.querySelectorAll("table.wikitable.sortable.mw-datatable tbody tr")
    for (tr of table) {
        remove_node(tr, 'sup')
        let tc = tr["children"]
        let ob = {
            url: tc[1].querySelector('a').href,
            province: tc[1].innerText,
            region: tc[4].innerText,
            macroregion: tc[5].innerText,
            pop: tc[6].innerText
        }
        provinces.list.push(ob)
        // fetch_page(ob, 'province')
        // echo("ob:",ob,tc[1].querySelector("a").href)
    }
}

regions.make_list = async function () {
    let URL = 'https://en.wikipedia.org/wiki/List_of_municipalities_of_Italy'
    let doc = await _fetch({ url: URL })
    doc.querySelectorAll('h3 span.mw-headline a').forEach(el => {
        // echo(el)
        this.list.push({ url: el.href })
    })
}

regions.iterate = async function () {
    for (reg of this.list) {
        // echo("reg:", reg)
        let doc = await _fetch(reg)
        let first = doc.querySelector('table.wikitable.sortable tbody tr')
        let type = first.querySelector('th').innerText.trim()
        first.remove()
        let trs = doc.querySelectorAll('table.wikitable.sortable tbody tr')
        let ord = [{
            type: type,
            url: 0,
            name: 0,
            province: 1,
            pop: 2
        }, {
            type: "Municipality",
            url: 1,
            name: 1,
            pop: 2
        }, {
            type: type,
            url: 0,
            name: 0,
            province: 2,
            pop: 3
        }
        ]
        let sel = type.includes('ISTAT') ? 1 : 0
        sel = reg['url'].includes('Sardinia') ? 2 : sel
        sel = ord[sel]
        let region_name = get_region_name_from_url(reg['url'])
        trs.forEach((tr) => {
            remove_node(tr, 'sup')
            let ch = tr['children']
            let ob = {
                region: region_name
            }
            let OK = true
            for (el of Object.keys(sel)) {
                if (el == 'url') {
                    let a = ch[sel['url']].querySelector('a')
                    ob[el] = a ? a.href : ""
                }
                if (el == 'name' || el == 'pop' || el == 'province') {
                    let value = ch[sel[el]].innerText.trim()
                    ob[el] = value
                    if (value.toLowerCase().includes('total')) {
                        echo("found total @", reg)
                        OK = false
                    }
                }
                if (el == 'type') {
                    ob[el] = sel[el]
                }
            }
            if (OK) {
                ob['id'] = k
                URLs.push(ob)
                k += 1
            }
        })
    }
}

function get_region_name_from_url(url) {
    index = (url.lastIndexOf('_of_') || url.lastIndexOf('the_'))
    let name = url.substring((index + 4), url.length)
    if (name.toLowerCase().includes('trentino')) {
        name = 'Trentino-Alto Adige/Südtirol'
        return name
    }
    if (name.toLowerCase().includes('aostra valley')) {
        name = 'Aostra Valley'
        return name
    }
    name = name.replaceAll(/[-\|_]/g, ' ')
    return name
}

async function it_init() {
    // provinces.make_list()
    await regions.make_list()
    await regions.iterate()
    iterate_data()
}

// it_init()

// let mis = {}
async function reiterate_data() {
    // check which elements of URLs has the number of keys under 10
    // print them, and check ( by yourself ) why they have under 10 keys
    // eg: Bono, Sardinia was linked with Bono of U2 band :)
    k = 0
    for (ob of URLs) {
        if (Object.keys(ob).length < 10) {
            // echo('id',ob['id'],'name:',ob['name'], ob['url'])
            k += 1
            id = ob['id']
            // if(mis[id] != undefined && mis[id]['url'] != '' ){
            //     ob['url'] = mis[id]['url']
            //     echo('update ob-url with', mis[id]['url'])
            // }
            // fetch_page(ob)
            // let region = ob['region']
            // let name = ob['name']
            // let miob = {name:name,id:ob['id'], url: ''}
            // if(!Object.keys(mis).includes(region)){
            //     mis[region] = [miob]
            // }else{
            //     mis[region].push(miob)
            // }
        }
        if (k % 200 == 0 && k != 0) {
            await delay(15000)
            echo("End delay", k)
        }
    }
    echo('end with k = ', k)
}