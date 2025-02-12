```md
# test af login med sha256 og sql injection
% node server.js
Server running on http://localhost:3000
Received request: { userid: 'John', password: 'jerryblahblahblah', comment: '' }
Login successful! User: John
Received request: { userid: 'Alice ', password: 'catcatcheckfido34', comment: '' }
Login failed
Received request: { userid: 'Alice', password: 'catcatcheckfido', comment: '' }
Login successful! User: Alice
Received request: { userid: 'Admin', password: 'VSQ@AlfaVictor', comment: '' }
Login successful! User: Admin
Received request: {
  userid: "' or 1=1; -- '",
  password: 'kdfjhgfsjkhgskuyfyt',
  comment: ''
}
Login failed
Received request: { userid: 'Admin', password: "' or 1=1; -- '", comment: '' }
Login failed
```