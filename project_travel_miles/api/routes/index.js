const express = require("express");
const router = express.Router();
const travellerController = require("../controllers/travellerControllers");
const loyaltyProgramsController = require("../controllers/loyaltyProgramsControllers");


router.route("/travellers")
.get(travellerController.getAll)
.post(travellerController.addOne);

router.route("/travellers/:travellerId")
.get(travellerController.getOne)
.delete(travellerController.deleteOne)
.patch(travellerController.partialUpdateOne)
.put(travellerController.fullUpdateOne);

router.route("/travellers/:travellerId/loyaltyprograms")
.get(loyaltyProgramsController.getAll)
.post(loyaltyProgramsController.addOne);

router.route("/travellers/:travellerId/loyaltyprograms/:loyaltyProgramId")
.get(loyaltyProgramsController.getOne)
.delete(loyaltyProgramsController.deleteOne)
.put(loyaltyProgramsController.updateFull)
.patch(loyaltyProgramsController.updatePartial);




module.exports=router;



