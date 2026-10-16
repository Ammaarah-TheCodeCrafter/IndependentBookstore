export function Hero(){
    return(
        <section id="hero" className="mx-auto max-w-[1100] px-5 pt-5 sm:pt-20 sm:bp-15">
            <p >Welcome to our independent bookstore!</p>
            <h1 className="text-9xl">Escape your Life. <span className="text-ember">Read someone else's</span></h1>
            <p> We offer a wide selection of books from various genres and authors.</p>
            <p>Explore our collection and find your next great read.</p>
            <a href="#books"className="mt-8 inline-block rounded-full bg-ember px-5 py-2.5 transition hover:-translate-y-px hover:bg-clay " >Browse Books</a>
        </section>
    );
}