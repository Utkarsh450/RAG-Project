import { useAuth } from "../hooks/useAuth";

export default function Navbar() {

    const { user } = useAuth();

    return (

        <div
            className="
            h-16
            bg-white
            px-6
            flex
            items-center
            justify-between
        "
        >

            <h1
                className="
                text-xl
                font-bold
            "
            >
                PDF Chat
            </h1>

            <p
                className="
                text-sm
                text-gray-500
            "
            >
                {user?.email}
            </p>

        </div>

    );
}