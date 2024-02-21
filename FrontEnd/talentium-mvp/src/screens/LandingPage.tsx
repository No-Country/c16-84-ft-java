import { useEffect, useState } from "react";import DashboardCliente from "./DashboardCliente";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Article from "../components/Article";

import { LoginForm } from "../interfaces/LoginForm";

const LandingPage: React.FC<LoginForm> = () => {
    const [email, setEmail] = useState();

    useEffect(() => {
        const storageEmail = localStorage.getItem("user");
        if (storageEmail) {
            setEmail(JSON.parse(storageEmail));
        }
    }, []);

    return (
        <div
            className=' bg-gradient-to-b from-royal-blue-500  to-white
    flex flex-col min-h-screen'
        >
            <Header />
            <main className='flex-grow'>
                {!email ? (
                    <section className='body-font flex-grow'>
                        <Hero />
                        <Article />
                    </section>
                ) : (
                    <>
                        <DashboardCliente />
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
