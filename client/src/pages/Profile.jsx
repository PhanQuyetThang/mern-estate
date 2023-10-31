import { useSelector } from "react-redux"

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user)
    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-7'>Profile</h1>
            <form className="flex flex-col gap-4">
                <img
                    src={currentUser.avatar}
                    alt="profile picture"
                    className="rounded-full w-24 h-24 object-cover self-center mt-2"
                />
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
