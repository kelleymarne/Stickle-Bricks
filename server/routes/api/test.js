const router = require('express').Router();
const OAuth =require('oauth');
const items = require('../../utils/items.json');
const fs = require('fs');

let itemsArray = items;
let i = 0;

router.get('/images', (req, res) => {
    const oauth = new OAuth.OAuth(
        '',
        '',
        '99F9560B878F49A1BB4AAF15122002EE',
        '36B44150878145CE99B7A15CA8A65BA0',
        '1.0',
        null,
        'HMAC-SHA1'
    );
    let obj;
    let itemType;
    console.log(i)
    switch (items.items[i].ITEMTYPE) {
        case 'P':
            itemType = "PART";
            break;
        case 'M':
            itemType = "MINIFIG";
            break;
        case 'S':
            itemType = "SET";
            break;
        case 'B':
            itemType = "BOOK";
            break;
        case 'G':
            itemType = 'GEAR';
            break;
        case 'C':
            itemType = "CATALOG";
            break;
        case 'I':
            itemType = "INSTRUCTION";
            break;
        case 'U':
            itemType = "UNSORTED_LOT";
            break;
        case 'O':
            itemType = "ORIGINAL_BOX";
            break;
    }
    //aka fetch but with oath
    oauth.get(`https://api.bricklink.com/api/store/v1/items/${itemType}/${items.items[i].ITEMID}`,
        'E027EE7A5E224096881DB12161248CB5',
        'ED294BAB69D44A83A3EAB65287D12B73',
        (error, data) => {
            if (error) console.log(error);
            obj = JSON.parse(data);
            itemsArray.items[i].IMAGE = obj.data.image_url
            i++;
            let json = JSON.stringify(itemsArray);
            fs.writeFile('./utils/items.json', json, (err) => {
                if (err) throw err;
                console.log('Update successful for index ' + i + '.')
            });
        });
        res.send(obj);
        
});


module.exports = router;