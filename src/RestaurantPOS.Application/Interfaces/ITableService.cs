using System.Collections.Generic;
using System.Threading.Tasks;
using RestaurantPOS.Core.Entities;

namespace RestaurantPOS.Application.Interfaces
{
    /// <summary>
    /// Defines the service contract for performing operations on restaurant tables.  This is
    /// intentionally minimal for the initial sprint; extend with additional methods as needed.
    /// </summary>
    public interface ITableService
    {
        Task<IEnumerable<Table>> GetTablesAsync();
        Task<Table> GetTableByIdAsync(int id);
        Task<Table> CreateTableAsync(Table table);
        Task UpdateTableAsync(Table table);
    }
}