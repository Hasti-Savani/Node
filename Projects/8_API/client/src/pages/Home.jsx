import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);

    const getProducts = () => {
        API.get("/products").then(res => setProducts(res.data));
    };

    useEffect(() => {
        getProducts();
    }, []);

    // ❌ DELETE FUNCTION
    const deleteProduct = async (id) => {
        try {
            await API.delete(`/products/${id}`);
            alert("Deleted ✅");
            getProducts(); // refresh
        } catch (err) {
            console.log(err);
            alert("Delete failed ❌");
        }
    };

    return (
        <div>
            <h1 className="text-5xl my-8">Products</h1>

            {products.map(p => (
                <div key={p._id} className="border border-gray-500 px-10 py-5 m-5 w-98 rounded-xl">
                    <h2 className="text-2xl">{p.name}</h2>
                    <p className=" text-gray-400 my-3">₹ {p.price}</p>

                    <div className="flex justify-center my-5 gap-5">
                        {/* DELETE BUTTON */}
                        <button onClick={() => deleteProduct(p._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                            Delete
                        </button>

                        {/* EDIT BUTTON */}
                        <Link to={`/edit/${p._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                            <button>
                                Edit
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;