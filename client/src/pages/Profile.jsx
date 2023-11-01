import { useSelector } from "react-redux"
import { app } from '../firebase'
import { useRef, useState, useEffect } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

export default function Profile() {
    const fileRef = useRef(null)
    const { currentUser } = useSelector((state) => state.user)
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0)
    const [fileUploadError, setFileUploadError] = useState(false)
    const [formData, setFormData] = useState({})
    console.log(formData)

    useEffect(() => {
        if (file) {
            handleFileUpload(file)
        }
    }, [file])

    const handleFileUpload = (file) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress))
            },

            //Callback function when we have errors
            (error) => {
                setFileUploadError(true)
            },
            //Callback function when the uploading is successful
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then
                    ((downloadURL) =>
                        setFormData({
                            ...formData, avatar: downloadURL
                        })
                    )
            }
        );
    }
    return (
        <div className="max-w-lg mx-auto">
            <h1 className='text-3xl font-bold text-center my-7'>User Profile</h1>
            <form className="flex flex-col gap-4">
                <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
                <img
                    onClick={() => fileRef.current.click()}
                    src={formData.avatar || currentUser.avatar}
                    alt="profile picture"
                    className="rounded-full w-24 h-24 object-cover self-center mt-2"
                />
                <p className="text-sm self-center">
                    {fileUploadError ?
                        (
                            <span className="text-red-700"> Error image upload! (Image must be less then 2 MB!)</span>
                        ) : filePerc > 0 && filePerc < 100 ?
                            (
                                <span className="text-slate-700"> {`Uploading ${filePerc}%`}</span>
                            ) : filePerc === 100 ?
                                (
                                    <span className="text-green-700">Image successfully uploaded!</span>
                                ) :
                                ("")
                    }
                </p>
                <input
                    type="text"
                    placeholder='username...'
                    className='border p-3 rounded-lg'
                    id='username'

                />
                <input
                    type="email"
                    placeholder='email...'
                    className='border p-3 rounded-lg'
                    id='email'

                />
                <input
                    type="password"
                    placeholder='password...'
                    className='border p-3 rounded-lg'
                    id='password'

                />
                <button

                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:shadow-lg hover:bg-slate-800 disabled:opacity-70'>
                    Update

                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">Delete account</span>
                <span className="text-red-700 cursor-pointer">Sign Out</span>
            </div>
        </div>
    )
}
