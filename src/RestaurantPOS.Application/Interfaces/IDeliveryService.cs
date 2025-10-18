using System.Collections.Generic;
using System.Threading.Tasks;
using RestaurantPOS.Core.Entities;

namespace RestaurantPOS.Application.Interfaces
{
    /// <summary>
    /// Provides an abstraction over delivery order operations.
    /// </summary>
    public interface IDeliveryService
    {
        /// <summary>
        /// Retrieves all delivery orders in the system.
        /// </summary>
        Task<IEnumerable<DeliveryOrder>> GetAllAsync();

        /// <summary>
        /// Retrieves a specific delivery order by its identifier.
        /// </summary>
        Task<DeliveryOrder?> GetByIdAsync(int id);

        /// <summary>
        /// Creates a new delivery order.
        /// </summary>
        Task<DeliveryOrder> CreateAsync(DeliveryOrder deliveryOrder);

        /// <summary>
        /// Updates an existing delivery order.
        /// </summary>
        Task UpdateAsync(DeliveryOrder deliveryOrder);

        /// <summary>
        /// Deletes a delivery order.
        /// </summary>
        Task DeleteAsync(int id);
    }
}