const _ = require('lodash');
const Table = require('../model/table');

exports.Listall =(req,res)=>{
    const postedBy = req.user._id
    Table.find({postedBy}).select('_id name address pincode city country').exec((err,data)=>{
        if(err){
            return res.status(400).json({error:'Failed to get Table data'})
        }
        res.json(data);
    })
}
exports.CreateRow =(req,res)=>{
    const {name,address,pincode,city,country}=req.body;
    const postedBy = req.user._id
    const RowData = {
        name,
        address,
        pincode,
        city,
        country,
        postedBy
    }   
    let newRowData = new Table(RowData);
    newRowData.save((err,row)=>{
        if(err)
        {
            res.status(400).json({error:"Failed to Add new Row"});
        }
        const {_id,name,address,pincode,city,country}=row
        res.json({_id,name,address,pincode,city,country});
    })
}
exports.DeleteRow =(req,res)=>{
    const {_id}=req.body;
    Table.findOneAndRemove({_id}).exec((err,data)=>{
        if(err){
            return res.status(400).json(err)
        }
        res.json({message:'successfully delete'})
    })
}
exports.UpdateRow = (req,res)=>{
    const {_id}=req.body;
    Table.findOne({_id}).exec((err,result)=>{
        if(err){
            return res.status(400).json({
                error:'failed to update'
            })
        }
        result = _.merge(result,req.body)
        result.save((err,data)=>{
            if(err){
                return res.status(400).json({
                    error:'failed to update'
                })
            }
            res.json(data)
        })
    })
}