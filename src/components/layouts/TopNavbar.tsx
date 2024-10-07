'use client'
import { useAuthFormContext } from '@/context/AuthFormContext';
import { useAuthContext } from '@/Providers/AuthProvider';
import { Film, Loader, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const TopNavbar: React.FC<{ isAuth: boolean }> = ({ isAuth }) => {

    const { openModelAuth, setAuthFormField } = useAuthFormContext();
    const { loading, logout } = useAuthContext()


    // pen login form always
    function openAuth() {
        setAuthFormField('login')
        openModelAuth()
    }

    return (

        <header className="flex justify-between items-center p-4 bg-gray-800">

            <Link
                href={'/'}
                className="flex items-center space-x-2">
                <Film className="w-8 h-8" />
                <span className="text-xl font-bold">Film Reels</span>
            </Link>


            <div className="flex items-center space-x-4">
                {isAuth ? (
                    <div className='flex gap-x-4 items-center pr-8'>

                        <Link href={'/profile'}

                            className="w-8 h-8 bg-gray-600 rounded-full justify-center items-center flex cursor-pointer">
                            <User size={24} className="text-gray-400" />
                        </Link>
                        <button
                            disabled={loading}
                            onClick={async () => await logout()}
                            className="w-8 h-8 bg-gray-600 rounded-full justify-center items-center flex cursor-pointer">
                            {loading ? <Loader className="animate-spin h-5 w-5 " /> : <LogOut size={24} className=" text-gray-400" />}
                        </button>
                    </div>

                ) : <button
                    onClick={() => openAuth()}
                    className="w-8 h-8 text-xs px-3 bg-gray-600 rounded-full justify-center items-center flex cursor-pointer">
                    Login
                </button>}

            </div>
        </header>
    );
};

export default TopNavbar;