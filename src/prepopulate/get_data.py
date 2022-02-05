import praw, requests, json
from config import *
from googleapiclient.discovery import build

reddit = praw.Reddit(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    user_agent=USER_AGENT,
)

posts = reddit.subreddit("ifyoulikeblank").search('books', limit=10)

data = {}
data['playlists'] = []

def get_book_id_from_comment(body):
    #call google api
    url = 'https://www.googleapis.com/books/v1/volumes?q='
    url = url + "'" + body + "'"
    url = url + "&key=" + GOOGLE_API_KEY
    #import pdb
    #pdb.set_trace()
    try:
        return requests.get(url).json()['items'][0]['id']
    except:
        return None

for post in posts:
    playlist = {}
    playlist['title'] = post.title
    playlist['books'] = []
    print(post.title)
    numbooks = 0
    for comment in post.comments:
        book_id = get_book_id_from_comment(comment.body)
        playlist['books'].append(book_id)
        numbooks+=1
        #import pdb
        #pdb.set_trace()
    print (numbooks)
    data['playlists'].append(playlist)

f = open('playlists', 'w')
f.write(json.dumps(data))
f.close()        
