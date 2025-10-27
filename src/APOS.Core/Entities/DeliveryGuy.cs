using System.Collections.Generic;

namespace APOS.Core.Entities
{
    /// <summary>
    /// Represents a delivery person who delivers orders.
    /// In many systems this would be tied to an Employee record, but it is
    /// separated here to allow non-employee delivery providers or simplified demos.
    /// </summary>
    public class DeliveryGuy
    {
        public int Id { get; set; }

        /// <summary>
        /// The name of the delivery person.
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Contact phone number for the delivery person.
        /// </summary>
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// Collection of delivery orders assigned to this delivery person.
        /// </summary>
        public ICollection<DeliveryOrder> DeliveryOrders { get; set; } = new List<DeliveryOrder>();
    }
}