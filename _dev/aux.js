let missed_fetch = []

var echo = console.log

function remove_node(elem, key) {
    try {
        elem.querySelectorAll(key).forEach((el) => {
            el.remove()
        }
        )
    } catch (e) { }
}

function howto() {
    let str = `
    The following variables will be created:
    * URLs    : store raw data
    * URLsmin : minified data
    `
    echo(str)
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function crawl(page, data) {
    remove_node(page, "style[data-mw-deduplicate]")
    remove_node(page, "span.nobold")
    let lines = page.querySelectorAll("table.ib-settlement tbody tr")
    let group = ""

    function remove_chars_key(str) {
        // this function removes weird chars
        let x = str.replaceAll(/\ +/g, " ")
        x = x.replaceAll('•', '')
        x = x.replaceAll(/\s/g, '-')
        x = x.replaceAll(/-+/g, '-')
        return x.trim()
    }

    function remove_chars_value(str) {
        let x = str.replace(/\ +/g, " ")
        x = str.replace(/['"]+/g, '')
        return x.trim()
    }

    for (let tr of lines) {
        let tc = tr['children']
        let tr_class = tr.className
        let tr_sibling_class

        // if first children does not have infobox-label or infobox-header, continue
        if (!tc[0].className.includes("infobox-label") && !tc[0].className.includes("infobox-header"))
            continue

        remove_node(tc[0], "sup")
        remove_node(tc[1], "sup")
        if (tc[0].querySelector(".ib-settlement-fn")) {
            remove_node(tc[0], ".ib-settlement-fn")
        }
        tr.nextSibling ? tr_sibling_class = tr.nextSibling.className : ""
        if (tr_class == "mergedtoprow" && tr_sibling_class == "mergedrow") {
            if (tr.nextSibling.innerText.includes("•")) {
                group = tc[0].innerText
            }
        }

        try {
            // check if colspan is greather than 2
            // meaning current tr span full row, so => it is header ( does not have key=>value )
            let colspan = tr['children'][0].colSpan
            if (colspan > 1) {
                continue
            }
        } catch (e) { }
        if (group == "") {
            key = tc[0].innerText
            key = remove_chars_key(key)
            key = key.toLowerCase()
        } else {
            key = tc[0].innerText
            if (key != group) {
                key = group + " " + tc[0].innerText
            }
            key = remove_chars_key(key)
            key = key.toLowerCase()
        }
        data[key] = remove_chars_value(tc[1].innerText)
        if (tr_sibling_class == "mergedtoprow") {
            group = ""
        }
    }
    try {
        let lt = page.querySelector(".geo-dms > span.latitude")
        let lg = page.querySelector(".geo-dms > span.longitude")
        data["lat"] = lt.innerText
        data["long"] = lg.innerText
    } catch (e) {// echo("could not find lat & long,", data['url'], e)
    }
}

async function fetch_page(ob) {
    function retry() {
        fetch_page(ob)
    }
    let URL = ob["url"]
    if (URL == "")
        return
    let res = await fetch(URL).then((res) => {
        return res.text()
    }
    ).catch((err) => {
        echo("Could not fetch ob:", ob['id'], URL)
        missed_fetch.push(ob)
        echo("retry fetch")
        // setTimeout(retry, 2000)
    }
    )
    var parser = new DOMParser();
    var page = parser.parseFromString(res, "text/html");
    crawl(page, ob)
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
        echo("Could not fetch ob:", ob['id'], URL)
    }
    )
    var parser = new DOMParser();
    var page = parser.parseFromString(res, "text/html");
    return page
}

async function iterate_data() {
    for (ob of URLs) {
        fetch_page(ob)
        k = ob['id']
        if (k % 400 == 0 && k != 0) {
            echo(ob['id'], "pages fetched, wait 15 sec")
            await delay(15000)
        }
    }
    howto()
}