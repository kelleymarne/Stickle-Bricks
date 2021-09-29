const router = require('express').Router();
const { verifyTokenAdmin } = require('../../utils/auth');
const {
    getAllItems,
    searchItems,
    itemTypes,
    itemsByType,
    itemsByCategory,
    itemColors,
    itemsByColor,
    featuredItems,
    addItem, 
    updateItemInfo  
} = require('../../controllers/itemControllers');

router.route('/')
.get(getAllItems); // ✓

router.route('/search')
.post(searchItems); // ✓ - searches by productName and or colorName, and or lego product id. Body: {search: '<terms>'}

router.route('/type')
.get(itemTypes); // ✓

router.route('/type/:type')
.get(itemsByType); // ✓ - searches by type name aka part, minifig, set, etc

router.route('/category/:id')
.get(itemsByCategory); // ✓ - searches based off of categoryId

router.route('/color') //secondary
.get(itemColors); // ✓ - gets a list of all colors available / that lego makes, including color_id, color_name, color_code (hex code)

router.route('/color/:id') //secondary
.get(itemsByColor); // ✓ - searches based off of categoryId. Should be used with itemColors

router.route('/featured')
    .get(featuredItems); // ✓

router.route('/admin')
.post(verifyTokenAdmin, addItem); // ✓ - body should look like the following:
// {
//     "type": "part",
//     "productId": "122c01",
//     "colorId": 99,
//     "price": 0.75,
//     "quantity": 5,
//     "active": true - this one is optional, will default to false
// }

router.route('/admin/:id')
.put(verifyTokenAdmin, updateItemInfo); // ✓ - this will only change what is passed through to the 
//body and nothing else also this can only edit certain fields which include: price, quantity, 
//image(url or path), imageAdd(boolean if false will remove the image selected) condition, active (true or false),
// featured (true or false). you can include any number of these fields but image must have imageAdd 
//in the body as well or it will always remove the image selected

module.exports = router;

//