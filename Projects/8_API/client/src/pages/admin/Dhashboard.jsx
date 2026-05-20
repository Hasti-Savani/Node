import API from "../../api/axios";

function Dashboard() {
    const createProduct = async () => {
        await API.post(
            "/products",
            { name: "Test", price: 100 },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        );
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={createProduct}>Add Product</button>
        </div>
    );
}

export default Dashboard;