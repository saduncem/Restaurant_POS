using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using APOS.Application.Interfaces;
using APOS.Core.Entities;

namespace APOS.Infrastructure.Services
{
    /// <summary>
    /// Concrete implementation of the ITableService interface using EF Core for data access.
    /// This service provides basic CRUD operations for tables.  Additional methods for
    /// reservation, merging or splitting tables can be added later.
    /// </summary>
    public class TableService : ITableService
    {
        private readonly ApplicationDbContext _context;

        public TableService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Table>> GetTablesAsync()
        {
            return await _context.Tables.AsNoTracking().ToListAsync();
        }

        public async Task<Table> GetTableByIdAsync(int id)
        {
            var table = await _context.Tables.FindAsync(id);
            if (table == null)
            {
                throw new KeyNotFoundException($"Table with id {id} not found.");
            }
            return table;
        }

        public async Task<Table> CreateTableAsync(Table table)
        {
            _context.Tables.Add(table);
            await _context.SaveChangesAsync();
            return table;
        }

        public async Task UpdateTableAsync(Table table)
        {
            _context.Tables.Update(table);
            await _context.SaveChangesAsync();
        }
    }
}