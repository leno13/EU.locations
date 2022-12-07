#!/bin/bash
cns=(
    "AT:Austria"
    "BE:Belgium"
    "BG:Bulgary"
    "CY:Cyprus"
    "CZ:CzeckRepublik"
    "DE:Germany"
    "DK:Denmark"
    "EE:Estonia"
    "ES:Spain"
    "FI:Finland"
    "FR:France"
    "GR:Greece"
    "HR:Croatia"
    "HU:Hungary"
    "IE:Ireland"
    "IT:Italy"
    "LT:Lithuania"
    "LU:Luxemburg"
    "LV:Latvia"
    "MT:MALTA"
    "NL:Netherlands"
    "PL:Poland"
    "PT:Portugal"
    "RO:Romania"
    "SE:Sweden"
    "SI:Slovenia"
)

for el in "${cns[@]}";
do
    key=$(cut -d':' -f1 <<<$el)
    cn_name=$(cut -d':' -f2 <<<$el)
    mkdir -p "../$key"
    
    # Create a flag so that you don't confuse countries
    touch "../$key/$cn_name"

    # create other files
    touch "../$key/$key.js"
    touch "../$key/$key.loc.js"
    touch "../$key/$key.loc.min.js"
done;