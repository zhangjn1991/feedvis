import json

from datetime import datetime, timedelta
import random


def getTimeStamp(date):
	return int((date - datetime.fromtimestamp(0)).total_seconds() / (3600 * 24)) * (3600 * 24);
	# return str(date)

all_data=[];
graph_series = {'Sentiment':['negative', 'neutral', 'positive'], 'Post types': ['photo', 'video', 'text', 'shared link', 'HPB', 'comment', 'like'],'Closeness': ['close friends', 'acquaintances']}

for i in range(0,5):
	start_date = datetime.now()+timedelta(days=i*7)
	end_date = start_date+timedelta(days=6);

	day = {'date_range':{'start':getTimeStamp(start_date), 'end': getTimeStamp(end_date)}}
	day['graphs']=[];
	for graph_name in graph_series.keys():
		graph = {'graph_name':graph_name}
		graph['series'] = []
		for series_name in graph_series[graph_name]:
			serie = {'series_name':series_name}
			serie['data'] = []
			cur_value = random.uniform(0.2,0.8)
			for l in range(0,7):
				cur_value += random.uniform(-0.15,0.15)
				serie['data'].append({'value':cur_value, 'date':getTimeStamp(start_date+timedelta(days=l))})
			graph['series'].append(serie)
		day['graphs'].append(graph)
	day['feeds']=[];
	for j in range(0,7):
		feed = {'time':getTimeStamp(start_date+timedelta(hours=j)), 'author':'author'+str(j), 'content':'content'+str(j), 'icon':'resources/user-icon.png'}
		day['feeds'].append(feed)
	all_data.append(day)
f=open('test.json','w')
json.dump(all_data, f)
f.close()
