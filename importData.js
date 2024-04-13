// Script to add a document to a collection

const filePath = '/path/to/file.json';


fetch('http://localhost:3002/api/addDocument', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        collection: 'storeAnalytics', 
        filePath: filePath
    })
})
.then(response => { /* handle response */ })
.catch(error => { /* handle error */ }); 
