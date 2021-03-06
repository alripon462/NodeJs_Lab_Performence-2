var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result){
		res.render('home/index', {user: result});
	});
});

router.get('/view_users', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/view_users', {userlist: results});
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/view_medicines', function(req, res){
	
		userModel.getAllMedicine(function(results){
			if(results.length > 0){
				res.render('home/view_medicines', {medicinelist: results});
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/edit/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
});

router.post('/edit/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/login');
			}else{
				res.redirect('/home/edit/'+req.params.id);
			}
		});
});

router.get('/delete/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.delete(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/view_users');
			}
		});
});

router.get('/addMedicine', function(req, res){
	
		res.render('home/addMedicine');
	
});


router.post('/addMedicine', function(req, res){
	
		var medicine = {
			id: req.body.id,
			medicinename: req.body.medicinename,
			price: req.body.price,
			type: req.body.type,
			vendor: req.body.vendor,
			description: req.body.description
		};

		userModel.insertMedicine(medicine, function(status){
			if(status){
				res.redirect('/home/view_medicines');
			}else{
				res.redirect('/home/view_medicines');
			}
		});
});


module.exports = router;