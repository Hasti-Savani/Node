import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        stock: ""
    });

    console.log(localStorage.getItem("token"));

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post(
                "/products",
                {
                    ...form,
                    price: Number(form.price),
                    stock: Number(form.stock)
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            alert("Product Added ✅");

            navigate("/"); // ✅ go to home AFTER success

        } catch (err) {
            console.log(err.response?.data);
            alert(err.response?.data?.msg || "Error ❌");
        }
    };

    return (
        <div className="border">

            <form onSubmit={handleSubmit} className="flex flex-col p-10 items-center h-full">
                <h2 className="text-2xl my-5">Add Product</h2>
                <input
                    name="name"
                    placeholder="Product Name"
                    className="border px-4 py-2 rounded"
                    value={form.name}
                    onChange={handleChange}
                    required
                /><br /><br />

                <input
                    name="price"
                    placeholder="Price"
                    className="border px-4 py-2 rounded"
                    value={form.price}
                    onChange={handleChange}
                    required
                /><br /><br />

                <input
                    name="description"
                    placeholder="Description"
                    className="border px-4 py-2 rounded"
                    value={form.description}
                    onChange={handleChange}
                    required
                /><br /><br />

                <input
                    name="stock"
                    placeholder="Stock"
                    className="border px-4 py-2 rounded"
                    value={form.stock}
                    onChange={handleChange}
                    required
                /><br /><br />

                <button type="submit" className="bg-green-600 px-5 py-2 rounded">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;