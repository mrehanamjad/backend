import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const generateAcessAndRefreshTokens = async (userId) => {
    try {
        const user = User.findById(userId)
        const accessToken = user.generateAccessTokem()
        const refreshToken = user.generateRefreshTokem()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        // mongoose check validations like pasowrd field is required, etc but we are just changing refreshTokens
        // also herewe don't need validation 
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // get user data from frontend (req.body)
    // validation - not emplty, valid email, password length, etc.
    // check if user already exists: username , email
    // check for images , check for avatar image
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token from response
    // chech for user craetion
    // return response with user data

    const { fullName, email, username, password } = req.body;

    if (
        [fullName, email, username, password].some(field => typeof field !== "string" || field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existingUser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(500, "Failed to upload avatar image");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken"); // Exclude password and refreshToken from the response

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res.status(201).json(
        new ApiResponse(200, "User registered successfully", createdUser)
    );

})

const loginUser = asyncHandler(async (req, res) => {
    // get  data from frontend (req.body)
    // validation - not emplty, valid email, password length, etc.
    // find user
    // password check
    // access and refresh token
    // send cookies

    const { email, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    // in above line  👆 user is variable which hold db response
    // Not User(capitalized) : mongoose user i.e used only for mongoose pre defined methods,

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAcessAndRefreshTokens()

    // user (in this block scope) has no refresh and access token
    // we can modefy the user or hit an api call
    // here you have to deecide wheather the api call is too expensive for your case or not
    // then do according to the need

    const loggedinUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedinUser, accessToken, refreshToken
                }
            )
        )

    // 🤔 As we set the access and efresh Token in cookies then why send then in json response ?
    // 🙋 Maybe the user has a use case, so he wants to store them separately(may be in lock storagem etc),
    // like when developing a mobile app, etc.

})

const logoutUser = asyncHandler(async (req,res) => {

})


export { registerUser };