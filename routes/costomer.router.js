var express = require('express');
var router = express.Router();
var connection = require('../public/db/db.connection');
var moment = require('moment');

router.get('/customer_form', function(req, res, next) {
    res.render('customer');
});

router.post('/customer_form', function(req, res, next) {
    console.log(req.body);
    var mydata = {
        full_name: req.body.full_name,
        gender: req.body.gender,
        category: req.body.category,
        address: req.body.address,
        city: req.body.city,
        pincode: req.body.pincode,
        p_length: req.body.p_length,
        p_waist: req.body.p_waist,
        p_knee: req.body.p_knee,
        p_loincloth: req.body.p_loincloth,
        p_thigh: req.body.p_thigh,
        p_ankel: req.body.p_ankel,
        p_sheet: req.body.p_sheet,
        s_length: req.body.s_length,
        s_chest: req.body.s_chest,
        s_stomach: req.body.s_stomach,
        s_solder: req.body.s_solder,
        s_sleeves: req.body.s_sleeves,
        s_collar: req.body.s_collar,
        s_wrist: req.body.s_wrist,
        s_frant: req.body.s_frant,
        mobile_no: req.body.mobile_no,
        description: req.body.description
    }
    connection.query("insert into tbl_customer set ?", [mydata], (err) => {
        if (err) throw err;
        console.log("data inserted");
        res.redirect("/customer_form")
    });
});

router.get('/customer_display', function(req, res, next) {
    connection.query("select * from tbl_customer", function(err, customer_data) {
        if (err) throw err;
        customer_data.forEach(cst_data => {
            cst_data.date_of_birth = moment(cst_data.date_of_birth).format('DD-MM-YYYY');
        });
        console.log(customer_data);
        res.render('customer_display', { customer_data: customer_data });
    });
});

router.get('/customer_delete/:id', function(req, res, next) {
    del_id = req.params.id;
    connection.query("delete from tbl_customer where c_id = ?", [del_id], function(err, customer_data) {
        if (err) throw err;
        console.log(customer_data);
        res.redirect("/customer_display");
    });
});

router.get("/customer_details/:id", function(req, res, next) {
    show_id = req.params.id;
    connection.query("select * from tbl_customer where c_id = ?", [show_id], function(err, customer_data) {
        if (err) throw err;
        customer_data.forEach(cst_data => {
            cst_data.date_of_birth = moment(cst_data.date_of_birth).format('DD-MM-YYYY');
        });
        console.log(customer_data);
        res.render("customer_details", { customer_data: customer_data });
    });
});

router.get("/customer_edit/:id", function(req, res, next) {
    edit_id = req.params.id;
    connection.query("select * from tbl_customer where c_id = ?", [edit_id], function(err, customer_data) {
        if (err) throw err;
        console.log(customer_data);
        res.render("customer_edit", { customer_data: customer_data });
    });
});

router.post("/customer_edit/:id", function(req, res, next) {
    var edit_id = req.params.id;
    var mydata = {
        full_name: req.body.full_name,
        gender: req.body.gender,
        category: req.body.category,
        address: req.body.address,
        city: req.body.city,
        pincode: req.body.pincode,
        p_length: req.body.p_length,
        p_waist: req.body.p_waist,
        p_knee: req.body.p_knee,
        p_loincloth: req.body.p_loincloth,
        p_thigh: req.body.p_thigh,
        p_ankel: req.body.p_ankel,
        p_sheet: req.body.p_sheet,
        s_length: req.body.s_length,
        s_chest: req.body.s_chest,
        s_stomach: req.body.s_stomach,
        s_solder: req.body.s_solder,
        s_sleeves: req.body.s_sleeves,
        s_collar: req.body.s_collar,
        s_wrist: req.body.s_wrist,
        s_frant: req.body.s_frant,
        mobile_no: req.body.mobile_no,
        description: req.body.description
    }
    connection.query("update tbl_customer set ? where c_id = ?", [mydata, edit_id], function(err) {
        if (err) throw err;
        console.log("Update data succesfully");
        res.redirect("/customer_display")
    });
});

module.exports = router;