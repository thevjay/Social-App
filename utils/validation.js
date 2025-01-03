const validator=require('validator')

const validateSignUpData = (req) => {

    const { firstName, lastName, emailId, password } = req.body;
    if ( !firstName || !lastName || !emailId || !password) {
        throw new Error("All fields are required")
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid!")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please Enter StrongPassword")
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    ];

    const isEditAllowed = Object.keys(req.body).every((field) => 
        allowedEditFields.includes(field)
    );

    return isEditAllowed;
}

module.exports={
    validateSignUpData,
    validateEditProfileData
}