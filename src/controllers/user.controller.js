import {asyncHandler} from '../utils/asyncHandler.js';
import User from '../models/user.model.js';
import {ApiError} from '../utils/ApiError.js';
import {uploadToCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;
    console.log("body", req.body);

    if(fullName===""){
        throw new ApiError(400, "Full name is required");
    }
    if(email===""){
        throw new ApiError(400, "Email is required");
    }
    if(username===""){
        throw new ApiError(400, "Username is required");
    }
    if(password===""){
        throw new ApiError(400, "Password is required");
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new ApiError(409, "Email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar image is required");
    }
    if(!coverImageLocalPath){
        throw new ApiError(400, "Cover image is required");
    }

    const avatar = await uploadToCloudinary(avatarLocalPath);
    const coverImage = await uploadToCloudinary(coverImageLocalPath);

    if(!avatar) {
        throw new ApiError(500, "Failed to upload avatar image");
    }
    if(!coverImage) {
        throw new ApiError(500, "Failed to upload cover image");
    }

    let user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username : username.toLowerCase(),
        password
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(new ApiResponse(200,createdUser,"User registered successfully"));
}
);
export {registerUser};