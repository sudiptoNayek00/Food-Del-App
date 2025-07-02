import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';


//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message: "Please provide email and password", success: false});
        }
        const existingUser = await userModel.findOne({email: email});
        if(!existingUser){
            return res.status(404).json({message: "User not found", success: false});
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid password", success: false});
        }
        //generate a token
        const token = createToken(existingUser._id);
        res.status(200).json({message: "User logged in successfully", success: true, token});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Server error", success: false, error: err.message});

    }
}

//create token
const createToken =(id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET,  {expiresIn: process.env.JWT_EXPIRATION} );
}

//register user

const registerUser = async (req,res)=>{
    const {name, email, password, confirmpassword} = req.body;
    console.log(typeof (name), typeof (email), typeof (password));
    try{
        //check if the email is valid
        const existingUser = await userModel.findOne({email: email});
        if(existingUser){
            return res.status(400).json({message: "User already exists", success: false});
        }

       //validating email format and password strength
       if(!validator.isEmail(email)){
        return res.status(400).json({message: "Invalid email format", success: false});
       }
       if(password.length < 8){
        return res.status(400).json({message: "Password must be Strong", success: false});
       }
       if(password !== confirmpassword){
        return res.status(400).json({message: "Passwords do not match", success: false});
       }

        //hash the password
        const slat = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, slat);

        //create a new user
        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword,
        });

        //save the user to the database
       const user = await newUser.save();

        //generate a token
        const token = createToken(user._id);

        res.status(201).json({message: "User registered successfully", success: true, token});
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false, error:error.message});
    }
}
export { loginUser ,registerUser };