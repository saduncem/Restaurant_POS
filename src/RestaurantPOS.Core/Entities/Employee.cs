namespace RestaurantPOS.Core.Entities
{
    /// <summary>
    /// Basic employee model containing only the fields needed for the initial skeleton.  You can
    /// extend this class with additional properties such as login credentials, phone number and
    /// permission settings in later sprints.
    /// </summary>
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
    }
}