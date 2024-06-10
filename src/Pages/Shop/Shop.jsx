
import { useState, useMemo } from 'react';
import UseMedicineCart from "../../Hooks/UseMedicineCart";
import SectionTitle from "../Shared/Section/SectionTitle";
import { GoEye } from 'react-icons/go';
import Swal from 'sweetalert2';
import UseAuth from '../../Hooks/UseAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import UseAxios from '../../Hooks/UseAxios';
import { Helmet } from 'react-helmet-async';

const Shop = () => {
    const [carts, refetch] = UseMedicineCart();
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = UseAxios();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handelCard = (item) => {
        if (user && user.email) {
            const cartItem = {
                cartId: item._id,
                email: user.email,
                name: item.itemName,
                price: item.price,
                image: item.image,
                company: item.company
            };
            axiosSecure.post('/addCart', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${item.itemName} added to your Cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                });
        } else {
            Swal.fire({
                title: "You are not Login",
                text: "Please Log in!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes Log In"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    const medicineItemDetails = async (id) => {
        try {
            const response = await axiosSecure.get(`/carts/${id}`);
            setSelectedItem(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching item details:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const filteredItems = useMemo(() => {
        return carts.filter(item =>
            item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.company.toLowerCase().includes(searchTerm.toLowerCase())
        ).sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
    }, [carts, searchTerm, sortOrder]);

    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredItems.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredItems, currentPage]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    return (
        <div className="my-20 mx-16">
              <Helmet>
                <title>MediMagic | Shop</title>
            </Helmet>
            <SectionTitle subHeading="Please buy here!!" heading="Shop Medicine" />
            
            <div className="mb-4 flex justify-between">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered"
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="asc">Sort by Price: Low to High</option>
                    <option value="desc">Sort by Price: High to Low</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>SERIAL</th>
                            <th>IMAGE</th>
                            <th>Medicine NAME</th>
                            <th>Category</th>
                            <th>Company NAME</th>
                            <th>Item Mass Unit</th>
                            <th>PRICE</th>
                            <th>Buy</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedItems.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Medicine" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.itemName}</td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                <td>{item.massUnit}</td>
                                <td>${item.price}</td>
                                <td><button onClick={() => handelCard(item)} className="btn btn-primary">Add Cart</button></td>
                                <td>
                                    <button className="btn btn-secondary" onClick={() => medicineItemDetails(item._id)}><GoEye className='text-xl' /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`btn ${currentPage === index + 1 ? 'btn-primary' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {isModalOpen && selectedItem && (
                <dialog open className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <div className="bg-base-200">
                            <div className="hero-content flex-col lg:flex-row">
                                <div className="h-full">
                                    <img src={selectedItem.image} className="max-w-sm md:h-[500px] rounded-lg shadow-2xl" alt="Selected Medicine" />
                                </div>
                                <div className="pl-10 space-y-4">
                                    <h1 className="text-2xl font-bold"><span className="text-3xl">Medicine Name:</span> {selectedItem.itemName}</h1>
                                    <div className="flex space-x-3">
                                        <p className="text-lg font-bold"><span className="text-xl font-bold">Medicine Generic Name:</span> {selectedItem.genericName}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <p className="w-full text-lg"><span className="font-bold text-xl">Medicine Category: </span> {selectedItem.category}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <p className="w-full text-lg"><span className="font-bold text-xl">Medicine Company: </span> {selectedItem.company}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <p className="w-full text-lg"><span className="font-bold text-xl">Medicine Mass Unit: </span> {selectedItem.massUnit}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <p className="w-full text-lg"><span className="font-bold text-xl">Per Unit Price: </span> ${selectedItem.price}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <p className="w-full text-lg"><span className="font-bold text-xl">Discount Percentage: </span> {selectedItem.disCountPrice}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <p className="w-full text-lg"><span className="font-bold text-xl">Short description: </span> {selectedItem.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button className="btn" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default Shop;
