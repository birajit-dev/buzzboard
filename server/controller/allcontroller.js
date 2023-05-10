const { request } = require('express');
var express = require('express');
require('../model/database');
const { all } = require('express/lib/application');
const { resolve } = require('path');

const OrderModel = require('../model/order');
const { json } = require('body-parser');



    
    exports.InsertOrder = async(req, res) =>{
        try{    
                //Validation of order_id
                const {order_id, item_name, cost, order_date, delivery_date} = req.body;
                let order_idx = order_id;
                const get_order_id = await OrderModel.find({order_id:order_idx}).lean();
                let put_order_id = [];
                
                for(var i=0 ;i<get_order_id.length;i++) {
                      put_order_id.push(put_order_id[i].order_id);   
                }
                const validationOrderId = put_order_id.toString();
                if(validationOrderId == order_idx){
                    res.status(200).json("Same Order ID Exist");
                }else{
                    //Insert Order List
                    let insertOrder = new OrderModel({
                        order_id: order_idx,
                        item_name: item_name,
                        cost: cost,
                        order_date:order_date,
                        delivery_date:delivery_date,
                    });
                    insertOrder.save();
                    res.status(200).json("Success");
                }
        }catch(error){
                res.status(400).json({message: error.message})
        }
    }

    exports.UpdateOrder = async(req, res, next)=>{
        try{
            const id = req.query.order_id;
            const delivery_date = req.query.delivery_date;
            const updateOrder  = await OrderModel.findOneAndUpdate({order_id:id}, 
            {
                delivery_date: delivery_date,
            },{
                 new: true
            });
            if(!updateOrder){
                res.status(200).json("No Orders Found");
            }
            else{
                res.status(200).json("Delivery Date Update" + updateOrder);                
            }
        }catch(error){
            res.status(400).json({message: error.message})
        }
        
    }

    exports.SearchOrder = async(req, res)=>{
        
            const squery = req.query.order_id;    
            const searchQuery = await OrderModel.findOne({order_id: squery }).lean();
            if(!searchQuery){
                res.status(200).json("No Order Id Found");
            }else{
                res.status(200).json(searchQuery);
            }
    } 
    

    exports.DeleteOrder = async(req, res, next)=>{
        try{
            const id = req.query.order_id;
            const delete_order  = await OrderModel.findOneAndDelete({order_id:id});
            if(!delete_order){
                res.status(200).json("No Orders Found");
            }
            else{
                res.status(200).json("Order Id Deleted");
            }
            
        }catch(error){
            res.status(400).json({message: error.message})
        }
        
    }

    exports.OrderList = async(req, res) =>{
        const listOrder = await OrderModel.find({}).lean();
        res.json(listOrder);
    }



