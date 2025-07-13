import  { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
    const { axios, isOwner, currency } = useAppContext();
    const [data, setData] = useState({
        totalCars: 0,
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        recentBookings: [], // ✅ Initialize as empty array
        monthlyRevenue: 0
    });

    const dashCards = [
        { title: 'Total Cars', value: data.totalCars, icon: assets.carIconColored },
        { title: 'Total Bookings', value: data.totalBookings, icon: assets.listIconColored },
        { title: 'Pending', value: data.pendingBookings, icon: assets.cautionIconColored },
        { title: 'Confirmed', value: data.completedBookings, icon: assets.listIconColored }
    ];

    const fetchDashboardData = async () => {
        try {
            const { data } = await axios('/api/owner/dashboard');
            if (data.success) setData(data.dashboardData);
            else toast.error(data.message);
        } catch (error) {
            toast.error(error.message); // Fixed: `toast.message` → `toast.error`
        }
    };

    useEffect(() => {
        if (isOwner) fetchDashboardData();
    }, [isOwner]);

    return (
        <div className='px-4 pt-10 md:px-10 flex-1'>
            <Title title="Admin Dashboard" subtitle="Overview of your car rental business" />
            <div className='grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8 max-w-3xl'>
                {dashCards.map((card, index) => (
                    <div key={index} className='flex items-center gap-2 justify-between p-4 rounded-md border border-borderColor'>
                        <div>
                            <h1 className='text-xs font-gray-500'>{card.title}</h1>
                            <p className='text-lg font-semibold'>{card.value}</p>
                        </div>
                        <div className='flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full'>
                            <img src={card.icon} alt={card.title} className='w-8 h-8' />
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex flex-wrap items-start gap-6 mb-8 w-full'>
                <div className='p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full'>
                    <h1 className='text-lg font-medium'>Recent Bookings</h1>
                    <p className='text-gray-500'>Latest customers bookings</p>
                    {data.recentBookings?.length > 0 ? ( // ✅ Safe check
                        data.recentBookings.map((booking, index) => (
                            <div key={index} className='mt-4 flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
                                        <img src={assets.listIconColored} alt="" className='w-5 h-5' />
                                    </div>
                                    <div>
                                        <h2 className='text-sm font-medium'>{booking.car.brand} | {booking.car.model}</h2>
                                        <p className='text-xs text-gray-500'>Booked on {booking.createdAt.split("T")[0]}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 font-medium'>
                                    <p className='text-sm text-gray-500'>{currency} {booking.price} | </p>
                                    <span className={`px-3 py-0.5 text-xs border border-borderColor rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='mt-4 text-gray-500'>No recent bookings</p> // Fallback UI
                    )}
                </div>
                <div>
                    <div className='p-4 md:p-6 border border-borderColor rounded-md max-w-sm w-full'>
                        <h1 className='text-lg font-medium'>Monthly Revenue</h1>
                        <p className='text-gray-500 text-sm'>Total revenue of this month</p>
                        <p className='text-primary text-3xl mt-4'>{currency} {data.monthlyRevenue}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;