const mongodb = require("../db/connection");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("contacts").find();
    const lists = await result.toArray();

    // Add virtual 'id' field for react frontend compatibility
    const transformed = lists.map((contact) => ({
      ...contact,
      id: contact._id,
    }));

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts", error });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .find({ _id: userId });
    const lists = await result.toArray();

    if (!lists[0]) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Add virtual 'id' field for react frontend compatibility
    const contact = {
      ...lists[0],
      id: lists[0]._id,
    };

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contact", error });
  }
};

const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: "Failed to create contact" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating contact", error });
  }
};

const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .replaceOne({ _id: userId }, contact);

    if (response.modifiedCount > 0) {
      return res.status(200).json({
        message: "Contact updated successfully",
        id: req.params.id,
      });
    } else if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    } else {
      return res.status(500).json({ message: "Contact update failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating contact", error });
  }
};

const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      return res.status(200).json({
        message: "Contact deleted",
        id: req.params.id,
      });
    } else {
      return res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
