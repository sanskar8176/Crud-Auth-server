import ContactModel from "../models/Contact.js";

class UserController {
  static addContact = async (req, res) => {
    const { name, email, phone } = req.body;
    // console.log("req", req);
    const { _id } = req.user;

    if (name && email && phone && _id) {
      try {
        const doc = new ContactModel({
          name,
          email,
          phone,
          userID: _id,
        });
        await doc.save();

        res.status(201).json({
          status: "success",
          message: "Contact Added Successfully",
        });
      } catch (error) {
        console.log(error);
        res.json({ status: "failed", message: "Unable to Add Contact" });
      }
    } else {
      res.json({ status: "failed", message: "All fields are required" });
    }
  };

  static editContact = async (req, res) => {
    const { name, email, phone } = req.body;
    const { _id } = req.user;
    const { id } = req.params;

    if (name && email && phone && _id && id) {
      try {
        await ContactModel.findByIdAndUpdate(
          { _id: id },
          { $set: { name: name, email: email, phone: phone } }
        );

        res.status(201).json({
          status: "success",
          message: "Contact Edited Successfully",
        });
      } catch (error) {
        console.log(error);
        res.json({ status: "failed", message: "Unable to Edit Contact" });
      }
    } else {
      res.json({ status: "failed", message: "All fields are required" });
    }
  };

  static deleteContact = async (req, res) => {
    const { id } = req.params;

    if (id) {
      try {
        await ContactModel.findByIdAndDelete({ _id: id });

        res.status(201).json({
          status: "success",
          message: "Contact Deleted Successfully",
        });
      } catch (error) {
        console.log(error);
        res.json({ status: "failed", message: "Unable to Delete Contact" });
      }
    } else {
      res.json({ status: "failed", message: "id is required" });
    }
  };

  static getContact = async (req, res) => {
    const { _id } = req.user;

    if (_id) {
      try {
        const contact = await ContactModel.find({ userID: _id });

        res.status(201).json({
          status: "success",
          message: "Contact fetched Successfully",
          data: contact,
        });
      } catch (error) {
        console.log(error);
        res.json({ status: "failed", message: "Unable to get Contact" });
      }
    } else {
      res.json({ status: "failed", message: "userID is required" });
    }
  };

  static getContactById = async (req, res) => {
    const { id } = req.params;

    if (id) {
      try {
        const contact = await ContactModel.findById({ _id: id });

        res.status(201).json({
          status: "success",
          message: "Contact fetched Successfully",
          data: contact,
        });
      } catch (error) {
        console.log(error);
        res.json({ status: "failed", message: "Unable to get Contact" });
      }
    } else {
      res.json({ status: "failed", message: "_id is required" });
    }
  };
}

export default UserController;
