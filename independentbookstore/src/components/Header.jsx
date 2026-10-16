export function Header(){
    return(
        <header className="sticky top-0 z-10 border-b border-clay bg-clay">
            <a href="#hero" >Independent <span className="text-green-950">Bookstore</span></a>
             <nav className="mx-auto flex max-w-[1100] flex-col items-end gap-5 sm:flex-row sm:justify-between sm:gap-0 sm:px-5">
                <ul className="flex flex-wrap justify center gap-5" > 
                    <li><a href="#hero">Home</a></li>
                    <li><a href="#books">Books</a></li>
                    <li><a href="#events">Events</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </nav>
        </header>
    );
}