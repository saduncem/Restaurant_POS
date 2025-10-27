namespace APOS.Core.Entities
{
    /// <summary>
    /// Represents an address used for delivery orders.
    /// A customer can have multiple delivery addresses.
    /// </summary>
    public class DeliveryAddress
    {
        public int Id { get; set; }

        /// <summary>
        /// The identifier of the customer to whom this address belongs.
        /// </summary>
        public int CustomerId { get; set; }

        /// <summary>
        /// Navigation property for the owning customer.
        /// </summary>
        public Customer? Customer { get; set; }

        /// <summary>
        /// Street address line.
        /// </summary>
        public string Street { get; set; } = string.Empty;

        /// <summary>
        /// City or town name.
        /// </summary>
        public string City { get; set; } = string.Empty;

        /// <summary>
        /// State or province.
        /// </summary>
        public string State { get; set; } = string.Empty;

        /// <summary>
        /// Postal or zip code.
        /// </summary>
        public string ZipCode { get; set; } = string.Empty;

        /// <summary>
        /// Additional notes or delivery instructions.
        /// </summary>
        public string? Notes { get; set; }
    }
}