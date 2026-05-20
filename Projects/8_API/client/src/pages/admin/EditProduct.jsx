import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        stock: ""
    });

    useEffect(() => {
        API.get("/products").then(res => {
            const product = res.data.find(p => p._id === id);
            setForm(product);
        });
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await API.put(
                `/products/${id}`,
                {
                    ...form,
                    price: Number(form.price),
                    stock: Number(form.stock)
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}` // ✅ FIX
                    }
                }
            );

            alert("Updated ✅");
        } catch (err) {
            console.log(err.response?.data);
            alert(err.response?.data?.msg || "Update failed ❌");
        }
    };

    return (
        <div>
            <h2>Edit Product</h2>

            <form onSubmit={handleUpdate}>
                <input name="name" value={form.name} onChange={handleChange} /><br /><br />
                <input name="price" value={form.price} onChange={handleChange} /><br /><br />
                <input name="description" value={form.description} onChange={handleChange} /><br /><br />
                <input name="stock" value={form.stock} onChange={handleChange} /><br /><br />

                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditProduct;