// import React from 'react'
// import { useSelector } from 'react-redux'
// import NoData from '../components/NoData'

// const MyOrders = () => {
//   const orders = useSelector(state => state.orders.order)

//   console.log("order Items",orders)
//   return (
//     <div>
//       <div className='bg-white shadow-md p-3 font-semibold'>
//         <h1>Order</h1>
//       </div>
//         {
//           !orders[0] && (
//             <NoData/>
//           )
//         }
//         {
//           orders.map((order,index)=>{
//             return(
//               <div key={order._id+index+"order"} className='order rounded p-4 text-sm'>
//                   <p>Order No : {order?.orderId}</p>
//                   <div className='flex gap-3'>
//                     <img
//                       src={order.product_details.image[0]} 
//                       className='w-14 h-14'
//                     />  
//                     <p className='font-medium'>{order.product_details.name}</p>
//                   </div>
//               </div>
//             )
//           })
//         }
//     </div>
//   )
// }

// export default MyOrders




import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'
import { format } from 'date-fns' // Optional: for date formatting

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  console.log("order Items", orders)

  // Status color mapping
  const getStatusColor = (status) => {
    const statusMap = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    }
    return statusMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-800'
  }

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                My Orders
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Track and manage your orders
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-gray-100 rounded-full px-4 py-2">
                <span className="text-sm font-medium text-gray-700">
                  Total Orders: {orders?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!orders?.[0] ? (
          <div className="transform transition-all duration-500 animate-fadeIn">
            <NoData />
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order._id + index + "order"}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Order Number</p>
                        <p className="font-semibold text-gray-900">{order?.orderId}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Date */}
                      {order?.createdAt && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span>{format(new Date(order.createdAt), 'dd MMM yyyy')}</span>
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order?.status)}`}>
                        {order?.status || ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        <img
                          src={order.product_details?.image?.[0]}
                          alt={order.product_details?.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">
                        {order.product_details?.name}
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Quantity</p>
                          <p className="font-medium text-gray-900">{order?.quantity || 1} item(s)</p>
                        </div>
                        
                     
                        
                      
                      </div>

                      {/* Additional Details */}
                      {order?.shippingAddress && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <p className="text-sm text-gray-600">
                              {order.shippingAddress}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Actions */}
               
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders