// this middleware varify user exist or not

import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _ /*as res parameter is unused */, next) => {
    try {
        // user may be on mobile app, etc so sends access token in header instude of cookie
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "").trim();

        /*  api header :
           ______________________________
           key            | value
           _______________|______________
           Authorization  | Bearer token 
           _______________|______________  */
    
        if (!token) {
            throw new ApiError(401, "Unauthorized User")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) // some times jwt also needs to await
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})