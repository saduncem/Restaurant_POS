using System;

namespace APOS.Core.Entities.Base
{
    /// <summary>
    /// Tüm Entity sýnýflarýnýn kalýtým aldýðý temel sýnýf.
    /// Ortak alanlar burada tutulur.
    /// </summary>
    public abstract class BaseEntity
    {
        /// <summary>
        /// Primary Key — her entity için benzersiz kimlik.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Oluþturulma zamaný (UTC).
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Son güncellenme zamaný (UTC).
        /// </summary>
        public DateTime? UpdatedAt { get; set; }

        /// <summary>
        /// Silinmiþ mi (soft delete)?
        /// </summary>
        public bool IsDeleted { get; set; } = false;
    }
}
