namespace RestaurantPOS.Core.Entities
{
    /// <summary>
    /// Represents a menu item.  Products belong to a category and have a base price.  Options and
    /// modifiers are not represented here but can be added via separate entities in later sprints.
    /// </summary>
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
    }
}