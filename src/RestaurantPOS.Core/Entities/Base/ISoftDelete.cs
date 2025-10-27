namespace RestaurantPOS.Core.Entities.Base
{
    /// <summary>
    /// Soft delete destekleyen entity’ler için iþaretçi arayüz.
    /// </summary>
    public interface ISoftDelete
    {
        bool IsDeleted { get; set; }
    }
}
