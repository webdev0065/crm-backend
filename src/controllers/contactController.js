const Contact = require('../models/contact');

exports.createContact = async (req, res) => {
    try {
      const { lead, name, email, phone, position, notes } = req.body;
  
      const newContact = new Contact({
        lead,
        name,
        email,
        phone,
        position,
        notes,
      });
  
      await newContact.save();
      res.status(201).json({ message: "Contact created successfully", newContact });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

exports.getContacts = async (req,res)=>{
    try {
        const contacts = await Contact.find({ lead: req.params.leadId });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
};

exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteContact = async (req,res)=>{
    try {
        const Contact = await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Contact deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
};