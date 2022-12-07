# EU.locations

This package contains 30858 locations from around the EU, crawled from wikipedia, in a .json format.

Every country should contain the following:
* xx.loc.json - raw data crawled from wiki.
* xx.loc.min.json - location in a minified version
* some countries may contain regions/districts/couties

The `_regions` dir contains counties/regions ( NUTS-2 / NUTS-3 ), it depends. Not all countries have a well defined wikipedia regions list.
