const multer = require('multer');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './public/uploads/');
	},
	filename: (req, file, callback) => {
		console.log("Storage1 " + file.originalname);
		callback(null, Date.now() + path.extname(file.originalname));
	}
});

//doesn't go thru
// const storage2 = multer.diskStorage({
// 	destination2: (req, file, callback) => {
// 		console.log('destination2 people')
// 		callback(null, './public/uploads2/');
// 	},
// 	filename2: (req, file, callback) => {
// 		console.log("Storage2 " + file.originalname);
// 		callback(null, Date.now() + path.extname(file.originalname));
// 	}
// });



// Init Upload
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 3000000
	},
	fileFilter: (req, file, callback) => {
		checkFileType(file, callback);
	}
}).single('posterUpload');

// change posterURL from string to array

// Init Upload
// never went thru this too
const upload2 = multer({
	storage: storage,
	limits: {
		fileSize: 1000000
	},
	fileFilter: (req, file, callback) => {
		checkFileType(file, callback);
	}
}).single('posterUpload2');

// Check File Type
function checkFileType(file, callback) {
	// Allowed file extensions
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return callback(null, true);
	} else {
		callback({message: 'Images Only'});
	}
}

module.exports = upload, upload2;