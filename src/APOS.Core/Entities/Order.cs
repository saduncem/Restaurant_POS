using System;
using System.Collections.Generic;

namespace APOS.Core.Entities
{
    /// <summary>
    /// Represents a customer order.  An order belongs to a table and consists of multiple order items.
    /// </summary>
    public class Order
    {
        public int Id { get; set; }

        public int TableId { get; set; }
        public Table Table { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    }

    /// <summary>
    /// Represents a single item in an order.  In a more complete implementation this would include
    /// references to a MenuItem entity and any modifiers or options selected.
    /// </summary>
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}