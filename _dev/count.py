# count all locations
import os, json

noLocations = 0

for root, dirs, files in os.walk('../'):
    fpath = ''
    for f in files:
        if 'loc.min.json' in f:
            fpath = os.path.join(root, f)
            break
    if fpath:
        f = open(fpath)
        data = json.load(f)
        noLocations += len(data)
        print(fpath,len(data))

print("#######")
print("#no_of_Locations:",noLocations)
