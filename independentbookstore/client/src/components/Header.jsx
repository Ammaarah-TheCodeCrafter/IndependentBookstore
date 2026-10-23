import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Header(){
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('https://independentbookstore-api.onrender.com/api/me',
            {
                credentials: "include",
            }
        ).then((response) => {
            if (!response.ok) return null;
            return response.json();
        }).then((data) => {
            if (data) setUser(data.user);
            else setUser(null);
        })
        .catch(() => {});
    },[]);

     async function handleLogout(){
        try{
            const response = await fetch('https://independentbookstore-api.onrender.com/api/logout',{
                method: 'POST',
                credentials: 'include',
            });
             if (response.ok){
                setUser(null);
                window.location.href = '/login';
            }
            else{
                 alert('Logout failed. Please try again.')
            }
        }catch (error){
            alert('Could not connect to the server.');
        }  
    }

    return(
        <header className="sticky top-0 z-10 border-b border-clay bg-clay">
            <a href="#hero" >Independent <span className="text-green-950">Bookstore</span></a>
             <nav className="mx-auto flex max-w-[1100] flex-col items-end gap-5 sm:flex-row sm:justify-between sm:gap-0 sm:px-5">
                <ul className="flex flex-wrap justify center gap-5" > 
                    <li><a href="/#hero">Home</a></li>
                    <li><a href="/#books">Books</a></li>
                    <li><a href="/#events">Events</a></li>
                    <li><a href="/#about">About</a></li>

                    {user ? (
                        <li>
                            <button type="button" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li><Link to ="/login">Login</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}