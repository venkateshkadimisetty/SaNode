var express = require('express');
var router = express.Router();
var config = require('../Config/config.js');


var userController = require('../controllers/usercontroller.js');
var offersController = require('../controllers/offerscontroller');
var ratingController =  require('../controllers/ratingscontroller');
var hotelcontroller = require('../controllers/hotelcontroller');
var serviceController = require('../controllers/servicecontroller');
var staffcontroller = require('../controllers/staffcontroller');
var escalationcontroller = require('../controllers/escalationcontroller');
var departmentcontroller = require('../controllers/departmentcontroller');

/* user */
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/all/list', userController.listUsers);
router.post('/user/forgotpassword',userController.forgotPassword);
router.post('/user/changePassword',userController.changePassword);
router.post('/user/updateUserProfile',userController.updateUserProfile);
router.post('/user/sendnotification',userController.sendNotifications);
router.post('/user/checkin',userController.checkin);
router.post('/user/bookaroom',userController.bookaroom);
router.post('/user/registeraroom',userController.registeraroom);
router.post('/user/checkout',userController.checkout);
router.post('/user/extendcheckout',userController.extendcheckout);

//hotel
router.post('/hotel/createhotel',hotelcontroller.createhotel);
router.get('/hotel/gethotel',hotelcontroller.gethotel);
router.post('/hotel/updatehotel',hotelcontroller.updatehotel);

//file upload
var fileUpload  = require('../controllers/fileUpload.js');
router.post('/upload/homeImages',fileUpload.uploadFile);

//image save
var imagesave =  require('../controllers/saveimage.js');
router.post('/image/save',imagesave.save);
router.get('/image/fetch',imagesave.fetch);
router.post('/image/delete',imagesave.deleteimage);


//device
router.post('/user/registerdevicetoken', userController.registerdevicetoken);

//offers
router.post('/user/offers/createoffers',offersController.createoffers);
router.post('/user/offers/fetchoffers',offersController.fetchOffers);
router.post('/user/offers/updateoffers',offersController.updateOffer);
router.post('/user/offers/deleteoffers',offersController.deleteOffer);

//rating
router.post('/user/rating/rateservice',ratingController.rateuser);
router.get('/user/getratingsandreviews', ratingController.ratingsandreviews);

//services
router.post('/service/createservicelist',serviceController.createservicelist);
router.get('/service/getservicelist',serviceController.getservicelist);
router.post('/service/updateservicelist',serviceController.updateserviceslist);
router.post('/service/createservicerequest',serviceController.createservicerequest);
router.post('/service/raiseanissue',serviceController.raiseanissue);
router.post('/service/getservicestatus', serviceController.getservicestatus);
router.get('/service/issues',serviceController.getservicerequests);
router.post('/service/changeassignee',serviceController.changeAssignee);

//menu api's
var foodmenu =  require('../controllers/foodmenu.js');
router.post('/foodmenu/save', foodmenu.save);
router.get('/foodmenu/fetch', foodmenu.fetch);
router.post('/foodmenu/update', foodmenu.update);
router.post('/foodmenu/delete',foodmenu.delete);
router.post('/foodmenu/order',foodmenu.placeorder);

//staff login
router.post('/staff/create', staffcontroller.createstafflogin);
router.get('/staff/fetch', staffcontroller.fetchstafflogins);
router.post('/staff/delete', staffcontroller.deletestafflogin);
router.post('/staff/login', staffcontroller.login);

//escalation
router.post('/escalation/create', escalationcontroller.createescalation);
router.get('/escalation/fetch', escalationcontroller.fetchescalations);
router.post('/escalation/delete', escalationcontroller.deleteescalation);

//department
router.post('/department/create', departmentcontroller.createdepartment);
router.get('/department/fetch', departmentcontroller.fetchdepartment);
router.post('/department/delete', departmentcontroller.deletedepartment);

module.exports = router;
