using System.Collections.Generic;

namespace APOS.Core.Entities
{
    /// <summary>
    /// Represents a customer who places orders or delivery orders.
    /// </summary>
    public class Customer
    {
        public int Id { get; set; }

        /// <summary>
        /// The full name of the customer.
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// The primary phone number for the customer.
        /// This can be used for caller identification when taking orders.
        /// </summary>
        public string PhoneNumber { get; set; } = string.Empty;

        /// <summary>
        /// Optional email address for the customer.
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Collection of delivery addresses associated with the customer.
        /// A customer may have multiple saved addresses (home, work, etc.).
        /// </summary>
        public ICollection<DeliveryAddress> DeliveryAddresses { get; set; } = new List<DeliveryAddress>();

        /// <summary>
        /// Collection of delivery orders placed by the customer.
        /// </summary>
        public ICollection<DeliveryOrder> DeliveryOrders { get; set; } = new List<DeliveryOrder>();
    }
}