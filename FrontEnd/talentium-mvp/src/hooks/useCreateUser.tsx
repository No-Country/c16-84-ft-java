import { UserProps } from "../interfaces/RegisterFormTypes";import { useAuth } from "../context/AuthContext";

const useCreateUser = () => {
    const auth = useAuth();

    const createUser = async (userData: UserProps): Promise<boolean> => {
        const url = "http://localhost:8080/usuarios";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                return true; // La respuesta de la API fue exitosa
            } else {
                return false; // Hubo un error al introducir los datos
            }
        } catch (error) {
            console.error("Ocurrió un error:", error);
            return false; // Hubo un error al realizar la solicitud
        }
    };

    const loginUser = async (credentials: {
        email: string;
        password: string;
    }): Promise<boolean> => {
        const loginUrl = "http://localhost:8080/login";

        try {
            const response = await fetch(loginUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const user = await response.json();
                auth.login(user);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return false;
        }
    };

    return { createUser, loginUser };
};

export default useCreateUser;
