const fs = require('fs');
fs.readFile('db.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  const productsData = JSON.parse(data);
  productsData.products.forEach(product => {
    console.log('--------------------------------');
    console.log('Product ID: ' + product.id);
    console.log('Name: ' + product.name);
    console.log('Description: ' + product.description);
    console.log('Price: $' + product.price);
    console.log('Category: ' + product.category);
    console.log('Stock: ' + product.stock);
  });
});
