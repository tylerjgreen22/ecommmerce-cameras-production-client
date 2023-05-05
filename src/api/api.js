import axios from "axios";

const url = "http://localhost:3001/api/v1";
export const imgUrl = "http://localhost:3001/assets"

export async function getProducts() {
    try {
        const res = await axios.get(`${url}/products`);
        return res.data
    } catch (error) {
        throw error
    }
}

export async function getProduct(id) {
    try {
        const res = await axios.get(`${url}/products/${id}`);

        return res.data
    } catch (error) {
        throw error
    }
}

export async function addProduct(formData) {
    try {
        const res = await axios.post(`${url}/products`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data.msg;
    } catch (error) {
        throw error
    }
}

export async function updateProduct(id, formData) {
    try {
        await axios.put(
            `${url}/products/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    } catch (error) {
        throw error
    }
}

export async function deleteProduct(id) {
    try {
        await axios.delete(`${url}/products/${id}`);
    } catch (error) {
        throw error
    }
}

export async function registerUser(formData) {
    try {
        if (formData.password === formData.confPassword) {
            const res = await axios.post(`${url}/users/register`, {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: formData.password,
                street: formData.street,
                city: formData.city,
                zip: formData.zip,
                state: formData.state,
            });

            return res
        } else {
            return { status: 200, data: { msg: "Passwords do not match" } }
        }

    } catch (error) {
        throw error
    }
}

export async function loginUser(formData) {
    try {
        const res = await axios
            .post(`${url}/users/login`, {
                email: formData.email,
                password: formData.password,
            })

        return res.data;
    } catch (error) {
        throw error
    }
}

export async function getUser(userData) {
    try {
        const res = await axios.get(`${url}/users/user`, {
            headers: {
                Authorization: `Bearer ${userData}`,
            },
        });
        return res;
    } catch (error) {
        throw error
    }
}

export async function isModerator(userData) {
    try {
        await axios.get(`${url}/users/mod`, {
            headers: {
                Authorization: `Bearer ${userData}`,
            },
        });
    } catch (error) {
        throw error
    }
}

export async function editUser(id, formData) {
    try {
        if (formData.password) {
            if (formData.password === formData.confPassword) {
                const res = await axios.put(`${url}/users/user/${id}`, {
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    email: formData.email,
                    password: formData.password,
                    street: formData.street,
                    city: formData.city,
                    zip: formData.zip,
                    state: formData.state,
                });
                return res;
            } else {
                return { status: 200, data: { msg: "Passwords do not match" } }
            }
        } else {
            const res = await axios.put(`${url}/users/user/${id}`, formData);
            return res;
        }

    } catch (error) {
        throw error
    }
}

export async function getOrder(id) {
    try {
        const res = await axios.get(`${url}/orders/${id}`);
        return res.data;
    } catch (error) {
        throw error
    }
}

export async function addOrder(order) {
    try {
        const res = await axios.post(`${url}/orders`, order);
        return res;
    } catch (error) {
        throw error
    }
}

export async function sendEmail(formData) {
    try {
        const res = await axios.post(`${url}/email`, formData);
        return res;
    } catch (error) {
        throw error
    }
}