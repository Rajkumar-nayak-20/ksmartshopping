import multer from 'multer'

const storage = multer.memoryStorage()//what is multer memory ? Multer memory storage is a storage engine for multer that stores the uploaded files in memory as Buffer objects. This means that the files are not saved to disk, but are instead kept in memory until they are processed. This can be useful for small files or when you want to process the files immediately without saving them to disk.
//ka mtlb agar hum multer memory storage ka use karte hai to uploaded files ko memory me store kiya jata hai as Buffer objects. Iska matlab hai ki files disk par save nahi hoti hai, balki memory me rakhi jati hai jab tak ki unhe process nahi kiya jata hai. Ye chhoti files ke liye ya jab aap files ko turant process karna chahte hai bina unhe disk par save kiye, tab useful ho sakta hai.

const upload = multer({ storage : storage })

export default upload
//multer ka mtlb multer ek middleware hai jo ki multipart/form-data ko handle karta hai, jo ki file uploads ke liye use hota hai. Is code me hum multer ko import kar rahe hai aur uske storage option ko memoryStorage set kar rahe hai, jiska matlab hai ki uploaded files memory me store hongi. Phir hum multer ke instance ko upload variable me store kar rahe hai aur usse export kar rahe hai taaki hum ise apne routes me use kar sake.