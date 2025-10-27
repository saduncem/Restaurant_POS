using System.Collections.Generic;

namespace APOS.Core.Entities
{
    /// <summary>
    /// Represents a table in the restaurant.  Each table can have multiple orders over time but only
    /// one open order at a time.
    /// </summary>
    public class Table
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Capacity { get; set; }
        public TableStatus Status { get; set; } = TableStatus.Empty;

        // Navigation property for the current and past orders associated with this table
        public ICollection<Order>? Orders { get; set; }
    }

    /// <summary>
    /// Enum describing the status of a restaurant table.  This is a simplified version; additional
    /// states (e.g. Reserved) can be added as needed.
    /// </summary>
    public enum TableStatus
    {
        Empty,
        Occupied,
        Split,
        Hold
    }
}