import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  }

  return (
    <header className="bg-royal-blue-500 text-white body-font flex flex-row items-center justify-between">
      <div className="pl-5 pt-2">
        <Link to="/">
          <img src="/Logo2.png" alt="" className="w-36 h-auto" />
        </Link>
      </div>

      <div className="">
        <nav className="">
          <Link
            to=""
            className="px-2 hover:bg-gradient-to-t from-royal-blue-800 rounded-md"
          >
            Cliente
          </Link>
          <Link
            to=""
            className="px-2 hover:bg-gradient-to-t from-royal-blue-800 rounded-md"
          >
            Profesional
          </Link>
        </nav>
      </div>

      <div className="pr-3">
        {auth.user ? (
          <>
            <span className="py-1 px-3">{auth.user.name}</span>
            <img src={auth.user.photoUrl} alt="Perfil" className="w-10 h-10 rounded-full" />
            <button type="button" onClick={handleLogout}>Cerrar sesion</button>
          </>
        ) : (
          <>
            <NavLink
          to="/Login"
          className="py-1 px-3 focus:outline-none hover:bg-gradient-to-t from-royal-blue-800 rounded-md"
        >
          Ingresar
        </NavLink>
        <NavLink
          to="/Register"
          className="py-1 px-3 focus:outline-none hover:bg-gradient-to-t from-royal-blue-800 rounded-md"
        >
          Registrate
        </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
