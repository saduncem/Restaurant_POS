using System;

namespace RestaurantPOS.Core.Entities
{
    /// <summary>
    /// Represents a delivery order placed by a customer for food to be delivered off‑site.
    /// </summary>
    public class DeliveryOrder
    {
        public int Id { get; set; }

        /// <summary>
        /// The identifier of the original order (if the delivery is derived from a dine‑in or takeout order).
        /// This can be null for standalone delivery orders.
        /// </summary>
        public int? OrderId { get; set; }

        /// <summary>
        /// Navigation property to the related Order (optional).
        /// </summary>
        public Order? Order { get; set; }

        /// <summary>
        /// The identifier of the customer placing the delivery order.
        /// </summary>
        public int CustomerId { get; set; }

        /// <summary>
        /// Navigation property for the customer.
        /// </summary>
        public Customer? Customer { get; set; }

        /// <summary>
        /// The identifier of the delivery address for this order.
        /// </summary>
        public int DeliveryAddressId { get; set; }

        /// <summary>
        /// Navigation property to the delivery address.
        /// </summary>
        public DeliveryAddress? DeliveryAddress { get; set; }

        /// <summary>
        /// The delivery person assigned to deliver this order.
        /// </summary>
        public int? DeliveryGuyId { get; set; }

        /// <summary>
        /// Navigation property to the delivery person.
        /// </summary>
        public DeliveryGuy? DeliveryGuy { get; set; }

        /// <summary>
        /// The date and time that the delivery is scheduled or requested.
        /// </summary>
        public DateTime DeliveryDateTime { get; set; }

        /// <summary>
        /// The current status of the delivery (e.g., Pending, OutForDelivery, Delivered, Cancelled).
        /// For simplicity this is stored as a string; in a real system, use an enum.
        /// </summary>
        public string Status { get; set; } = "Pending";

        /// <summary>
        /// Optional notes or instructions for the delivery (e.g., "Ring the bell twice").
        /// </summary>
        public string? Notes { get; set; }

        /// <summary>
        /// Related payment information for this delivery order.
        /// </summary>
        public int? PaymentId { get; set; }

        /// <summary>
        /// Navigation property for the payment.
        /// </summary>
        public Payment? Payment { get; set; }
    }
}