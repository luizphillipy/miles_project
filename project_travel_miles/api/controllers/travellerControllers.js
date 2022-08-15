require("../data/travellers-model")
const mongoose = require("mongoose");

const Traveller = mongoose.model(process.env.TRAVELLER_MODEL);


const getAll = function(req,res){
    console.log("GET Traveller Controller");
    let count =10;
    let offset =0;
    if(req.query && req.query.count){
        offset = parseInt(req.query.count,10);
    }
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    Traveller.find().skip(offset).limit(count).exec(function(err,travellers){
        if(err){
            console.log("No traveller was found: ",err);
        }
        console.log("Travellers found: ",travellers.length);
        res.status(200).json(travellers);
    });
}
const getOne = function(req,res){
    const travellerId = req.params.travellerId;
    Traveller.findById(travellerId).exec(function(err,traveller){
        if(err){
            console.log("TravellerId not found");
            res.status(404).send("TravellerId not found")
        }
        res.status(200).json(traveller);
    });

};

const deleteOne = function(req,res){
    const travellerId = req.params.travellerId;
    console.log("DELETE controller Request");
    Traveller.findByIdAndDelete(travellerId).exec(function(err, traveller){
        if(err){
            console.log("travellerId not found");
            res.status(404).send("TravellerId not found");
        };
        console.log("Traveller was sucessfully removed: ",traveller);
        const response = {status:204,message:traveller};
        res.status(response.status).json(response.message)



    })
}

const addOne = function(req,res){
    console.log("Traveller AddOne Requested");
    console.log(req.body);
   


    const newTraveller = {
        name:req.body.name, 
        passport:req.body.passport, 
        nationality:req.body.nationality,
        loyaltyPrograms:[{
            name:req.body.lname,
            memberId:req.body.memberId,
            milesAmount:req.body.milesAmount
        }]
    };
    Traveller.create(newTraveller, function(err,traveller){
        const response = {status:201,message:traveller};
        if(err){
            console.log("Error creating Traveller");
            response.status=500;
            response.message=err;

        }
        res.status(response.status).json(response.message);
    })
}

const _updateOne = function(req,res, updatedTravelerCallback){
    const travellerId = req.params.travellerId;
    
    console.log("_updateOne controller Requested");
    const response={
        status:204,
        message:{}
    }
    
    if(!mongoose.isValidObjectId(travellerId)){
        response.status=400;
        response.message="Invalid traveller Id format ",travellerId;
    } else {
        if(!travellerId){
        response.status=400;
        response.message="Not found a traveller with travellerId: ",travellerId
        }
    }
    Traveller.findById(travellerId).exec(function(err,traveller){
        if(err){
            response.status=500;
            response.message=err;
        }else{
            response.staus=204;
            response.message=traveller;
        }
        if(response.status!=204){
            _sendResponse(res,response);
        }else{
            updatedTravelerCallback(req,res,traveller,response);
        }

    });
}
const _sendResponse = function(res,response){
    res.status(response.status).json(response.message);
}



const fullUpdateOne = function(req,res){
console.log("full updateOne controller requested");
console.log(req.body);
travellerUpdate=function(req,res,traveller,response){
    traveller.name =req.body.name;
    traveller.passport = req.body.passport;
    traveller.nationality = req.body.nationality;
    // traveller.loyaltyPrograms=[{
    //     name:req.body.loyaltyProgramName,
    //     memberId:req.body.memberId,
    //     milesAmount:req.body.milesAmount
    // }];
    
    traveller.save(function(err,updatedTraveller){
        response.status=204;
        response.message=updatedTraveller;
        console.log(updatedTraveller);
        if(err){
            response.status=500;
            response.message=err;
        }
        
        _sendResponse(res, response);
    });
}
_updateOne(req,res,travellerUpdate);
}
const partialUpdateOne = function(req,res){
    travellerUpdate=function(req,res,traveller,response){
        if(req.body.name){traveller.name =req.body.name;}
        if(req.body.passport){traveller.passport = req.body.passport;}
        if(req.body.nationality){traveller.nationality = req.body.nationality;}
        // if(req.body.loyaltyProgramName){traveller.loyaltyPrograms=[{name:req.body.loyaltyProgramName}]}
        // if(req.body.memberId){traveller.loyaltyPrograms=[{memberId:req.body.memberId}]}
        // if(req.body.milesAmount){traveller.loyaltyPrograms=[{milesAmount:req.body.milesAmount}]}
        console.log(traveller);
        traveller.save(function(err,updatedTraveller){
            response.status=204;
            response.message=updatedTraveller;
            if(err){
                response.status=500;
                response.message=err;
            }
            
            _sendResponse(res, response);
        });
    }
    _updateOne(req,res,travellerUpdate);
}
module.exports={getAll, getOne, addOne, deleteOne,fullUpdateOne,partialUpdateOne}