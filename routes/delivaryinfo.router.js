var express = require("express");
var router = express.Router();
var connection = require("../public/db/db.connection");
var moment = require("moment");

router.get("/bill_details_form", function(req, res, next) {
    connection.query("select * from tbl_customer", function(err, customer_data) {
        res.render("bill_details", { customer_data: customer_data });
    });
});

router.post("/bill_details_form", function(req, res, next) {
    var mydata = {
        cd_id: req.body.cd_id,
        c_id: req.body.c_id,
        bill_no: req.body.bill_no,
        present_date: req.body.present_date,
        delivery_date: req.body.delivery_date,
        total_pant: req.body.total_pant,
        total_shirt: req.body.total_shirt,
        bill_amount: req.body.bill_amount
    }
    connection.query("insert into tbl_customer_del set ?", [mydata], function(err) {
        if (err) throw err;
        console.log(req.body);
        res.redirect("/bill_details_form");
    });
});

router.get("/bill_details_display", function(req, res, next) {
    var q = "SELECT`tbl_customer_del`.`cd_id`, `tbl_customer`.`full_name`, `tbl_customer_del`.`bill_no`, `tbl_customer_del`.`present_date`, `tbl_customer_del`.`delivery_date`, `tbl_customer_del`.`total_pant`, `tbl_customer_del`.`total_shirt`, `tbl_customer_del`.`bill_amount`FROM`tbl_customer_del`INNER JOIN `tbl_customer` ON (`tbl_customer_del`.`c_id` = `tbl_customer`.`c_id`);";
    connection.query(q, function(err, bill_data) {
        if (err) throw err;
        console.log(bill_data);
        bill_data.forEach(mydate => {
            mydate.present_date = moment(mydate.present_date).format("DD-MM-YYYY");
            mydate.delivery_date = moment(mydate.delivery_date).format("DD-MM-YYYY");
        });
        res.render('bill_details_display', { bill_data: bill_data });
    });
});

module.exports = router;