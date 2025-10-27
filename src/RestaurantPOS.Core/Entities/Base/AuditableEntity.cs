using System;

namespace RestaurantPOS.Core.Entities.Base
{
    /// <summary>
    /// Oluþturan ve güncelleyen kullanýcý bilgisini takip eden entity tipi.
    /// </summary>
    public abstract class AuditableEntity : BaseEntity
    {
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
    }
}
