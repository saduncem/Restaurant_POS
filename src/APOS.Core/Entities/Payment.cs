using System;

namespace APOS.Core.Entities
{
    /// <summary>
    /// Represents a payment transaction for an order.  This is a simplified model; in a complete
    /// system you would include more details such as currency, status, external reference codes,
    /// captured amounts, etc.
    /// </summary>
    public class Payment
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;
        public decimal Amount { get; set; }
        public PaymentMethod Method { get; set; }
        public DateTime PaidAt { get; set; } = DateTime.UtcNow;
    }

    /// <summary>
    /// Enumerates the possible payment methods supported by the system.
    /// </summary>
    public enum PaymentMethod
    {
        Cash,
        Card,
        Voucher,
        GiftCard
    }
}