using System.Collections.Generic;

namespace APOS.Core.Entities
{
    /// <summary>
    /// Represents a menu category (e.g. Appetizers, Mains, Desserts).
    /// </summary>
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}