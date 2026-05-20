const AdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    return user?.role === "admin"
        ? children
        : <Navigate to="/" />;
};

export default AdminRoute;