import json

from datetime import datetime, timedelta
import random


def getTimeStamp(date):
	return int((date - datetime.fromtimestamp(0)).total_seconds() / (3600 * 24)) * (3600 * 24);
	# return str(date)

all_data=[];
for i in range(0,4):
	start_date = datetime.now()+timedelta(days=i)
	end_date = start_date+timedelta(days=7);

	day = {'date_range':{'start':getTimeStamp(start_date), 'end': getTimeStamp(start_date+timedelta(days=7))}}
	day['graphs']=[];
	for j in range(0,5	):
		graph = {'graph_name':'graph'+str(j)}
		graph['series'] = []
		for k in range(0,5):
			serie = {'series_name':'series'+str(k)}
			serie['data'] = []
			for l in range(0,7):
				serie['data'].append({'value':random.randint(1,10), 'date':getTimeStamp(start_date+timedelta(days=l))})
			graph['series'].append(serie)
		day['graphs'].append(graph)
	all_data.append(day)
f=open('test.json','w')
json.dump(all_data, f)
f.close()
