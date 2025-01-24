import Admin from '../schema/Admin.js';

 export const addAdmin = async (req, res) => {
    const { admin,email,number } = req.body;
    try {
        const newAdmin = await Admin.create({ admin,email,number });
        res.send({status:"200", message:"Add Admin Successfull AND Your Password Is: "+number});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all appointments
export const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.find() 
            return res.status(200).json({status:"200", message:"Get Admin Successfull",admin});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const loginAdmin = async (req, res) => {
    const { email,number,role} = req.body;

    try {
        // Find the user by email,number
        const admin = await Admin.findOne({ email,number });
        if (!admin) {
            return res.status(404).json({ message: 'Admin Not Found, Kindly Provide correct Details' });
        }
        else{
            return res.status(200).json({status:"200", message:"Login Successfull",admin});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAdmin =async (req, res) => {
        try {
            const { admin,email,number } = req.body;

            // Step 1: Find the admin by email
            const foundAdmin = await Admin.findOne({ admin,email,number });
            if (!foundAdmin) {
                return res.status(404).json({ status: 404, message: 'Admin not found, Kindly Provide Right Details' });
            }
            // Step 2: Delete the admin
            const deleteResult = await Admin.deleteOne({ admin,email,number });
            if (deleteResult.deletedCount > 0) {
                return res.status(200).json({ status: 200, message: 'Delete Successful' });
            } else {
                return res.status(500).json({ status: 500, message: 'Delete Failed' });
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ status: 500, message: 'Server Error' });
        }
    }


