import json
import os

with open('./test.json', 'r') as f:
    data = json.load(f)

tags={}

for tag in data:
    try:
        tags[tag['name'].lower()]={
            'name':tag['name'],
            'slug':tag['slug'],
            'id': tag['objectID']
        }
    except Exception as e:
        pass

with open('update.json','w') as f:
    json.dump(tags,f)