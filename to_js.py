import json

with open('map.json', 'r') as f:
    data = json.load(f)
    data = json.dumps(data)
    data = 'export const map = ' + data

with open('map.js', 'w') as out:
    out.write(data)
    out.close()

