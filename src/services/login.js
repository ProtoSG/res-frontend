const login = async ( username, password) => {
    try {
        const response = await fetch('http://localhost:3000/login/administrador', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if(!response.ok){
            throw new Error("Hubo un problema al enviar la  solicitud " + response.status );
        }else {
            const userData = await response.json(); // Parse response as JSON
            if (userData.token) { // Check if token exists in response
                localStorage.setItem('user', JSON.stringify(userData));
                return userData; // Return userData if token exists
            } else {
                throw new Error("No se encontró un token en la respuesta del servidor.");
            }
        }
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to handle it in the caller function
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export { getCurrentUser, login, logout };
