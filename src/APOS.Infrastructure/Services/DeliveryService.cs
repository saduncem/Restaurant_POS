using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using APOS.Application.Interfaces;
using APOS.Core.Entities;

namespace APOS.Infrastructure.Services
{
    /// <summary>
    /// Implementation of the IDeliveryService using Entity Framework Core.
    /// </summary>
    public class DeliveryService : IDeliveryService
    {
        private readonly ApplicationDbContext _context;

        public DeliveryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DeliveryOrder>> GetAllAsync()
        {
            return await _context.DeliveryOrders
                .Include(d => d.Customer)
                .Include(d => d.DeliveryAddress)
                .Include(d => d.DeliveryGuy)
                .Include(d => d.Order)
                .Include(d => d.Payment)
                .ToListAsync();
        }

        public async Task<DeliveryOrder?> GetByIdAsync(int id)
        {
            return await _context.DeliveryOrders
                .Include(d => d.Customer)
                .Include(d => d.DeliveryAddress)
                .Include(d => d.DeliveryGuy)
                .Include(d => d.Order)
                .Include(d => d.Payment)
                .FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<DeliveryOrder> CreateAsync(DeliveryOrder deliveryOrder)
        {
            _context.DeliveryOrders.Add(deliveryOrder);
            await _context.SaveChangesAsync();
            return deliveryOrder;
        }

        public async Task UpdateAsync(DeliveryOrder deliveryOrder)
        {
            _context.Entry(deliveryOrder).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.DeliveryOrders.FindAsync(id);
            if (entity != null)
            {
                _context.DeliveryOrders.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}