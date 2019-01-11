from austinpos import app
from austinpos import socketio

if __name__ == '__main__':
    socketio.run(app, debug=True, host='192.168.11.140')
