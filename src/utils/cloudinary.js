import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const resposne = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log("File uploaded to Cloudinary:", resposne.url);

        return resposne;
    } catch (error) {

        console.error("Error uploading file to Cloudinary:", error);
        return null;
    } finally {
        // remove the locally saved temporary file 
        /*
        Using fs.promises.unlink() is better than fs.unlinkSync()
        fs.promises.unlink() is asynchronous (non-blocking) -> It doesn't pause the entire event loop while deleting the file.

        | Feature              | `fs.promises.unlink()`  | `fs.unlinkSync()`  |
        | -------------------- | ----------------------- | ------------------ |
        | Non-blocking         | ✅ Yes                  | ❌ No (blocking)   |
        | Async/await support  | ✅ Yes                  | ❌ No              |
        | Use in APIs/services | ✅ Recommended          | ❌ Not recommended |
        | Crashes app on error | ❌ No (with try/catch)  | ✅ Can crash app   |

        🧠 When to prefer fs.unlinkSync()?
            Only in very small scripts or startup scripts where:
                * Blocking doesn't matter (e.g., CLI tools)
                * Simplicity > performance
        */
       
        // fs.unlinkSync(localFilePath);
        try {
            await fs.promises.unlink(localFilePath)
        } catch (error) {
            console.error("Error deleting local file:", error)
        }
    }
}

export { uploadOnCloudinary };