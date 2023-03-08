import express from "express";
const router = express.Router();
import contactController from "../controllers/contactController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

// Route Level Middleware - To Protect Route
router.use("/addcontact", checkUserAuth);
router.use("/editcontact/:id", checkUserAuth);
router.use("/deletecontact/:id", checkUserAuth);
router.use("/getcontact", checkUserAuth);
router.use("/getcontact/:id", checkUserAuth);

// Public Routes

// Protected Routes

router.post("/addcontact", contactController.addContact);
router.put("/editcontact/:id", contactController.editContact);
router.delete("/deletecontact/:id", contactController.deleteContact);
router.get("/getcontact", contactController.getContact);
router.get("/getcontact/:id", contactController.getContactById);

export default router;
