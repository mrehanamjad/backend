import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file /* Give from multer */, cb /*Call Back */) {
    cb(null, './public/temp') // Save to ./public/temp folder
  },
  filename: function (req, file, cb) {
    // For now we keep it basic 
    // But later you can add a unique id or nano id or timestamp or unique identifier to avoid conflicts(e.g., if two users upload a file with the same name)
    // code e.g.:
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)

    cb(null, file.originalname) // Save with original file name
  }
})

const upload = multer({ storage })


/* NOTES:

multer.diskStorage() vs multer.memoryStorage()

🔸 memoryStorage
    💾 Stores files in RAM as Buffers (not saved to disk).
       Useful for:
        * Uploading directly to cloud (e.g., Cloudinary, S3)
        * Short-lived files (processed immediately and discarded)
    ⚠️ Limitation: Large files can crash your server (RAM overflow)

🔸 diskStorage
    💾 Saves files directly to your local filesystem.
       Useful for:
        * Keeping uploaded files
        * Delaying processing (e.g., saving image for later)
    🔒 Safer for large files than memory.
*/