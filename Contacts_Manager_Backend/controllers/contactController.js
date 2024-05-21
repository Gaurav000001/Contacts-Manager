const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact");
const mongoose = require("mongoose");
const contact = require("../models/contact");

const isIdValid = asyncHandler(
    async (id) => {
        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error(`The provided ID: "${id}" is not a valid ID.`);
        }

        return true;
    }
)

/*
    @desc get all contacts
    @route GET api/contacts/
    @access Public
*/
// [important] : whenever we interact with the mondodb using mongoose it returns an promise inorder to deal with
// an promise we need to make use of anync functions but when we make use of async we need to use try-catch block
// to catch the exceptions for this we can use simple try-catch block or we can use express-async-handler
// when exception occurs express-async-handler just simply gonna pass those exceptions to our errorHandler
const getContacts = asyncHandler(
    async (request, response) => {
        const contacts = await Contact.find();
        response.status(200).json(contacts);
    }
);

/*
    @desc get contact
    @route GET api/contacts/{id}
    @access Public
*/
const getContact = asyncHandler(
    async (request, response) => {
        const { id } = request.params;

        // Validate the ID
        isIdValid(id);

        const contact = await Contact.findById(id);
        if(!contact){
            response.status(404);
            throw new Error("Contact not found");
        }

        response.status(200).json(contact);
    }
);

/*
    @desc create contact
    @route POST api/contacts/
    @access Public
*/
const createContact = asyncHandler(
    async (request, response) => {
        const {name, email} = request.body;
        if(!name || !email){
            response.status(400);
            throw new Error('All fields are mandatory!');
        }

        const contact = await Contact.create({
            name, 
            email,
        })
        response.status(201).json(contact);
    }
);

/*
    @desc update contact
    @route PUT api/contacts/{id}
    @access Public
*/
const updateContact = asyncHandler(
    async (request, response) => {
        const { id } = request.params;

        // validate id
        isIdValid(id);

        const contact = await Contact.findById(id);
        if(!contact){
            response.status(404);
            throw new Error("Contact not found");
        }
        
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            request.body,
            { new: true }
        );
        
        response.status(200).json(updatedContact);
    }
    
);
/*
    @desc delete contact
    @route DELETE api/contacts/{id}
    @access Public
*/
const deleteContact = asyncHandler(
    async (request, response) => {
        const { id } = request.params;

        // validate id
        isIdValid(id);
        const contact = await Contact.findById(id);
        if(!contact){
            response.status(404);
            throw new Error("Contact not found");
        }

        const deletedContact = await Contact.findByIdAndDelete(id);
        response.status(200).json(deletedContact);
    }
);

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}