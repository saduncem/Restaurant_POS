using System.Threading.Tasks;
using APOS.Application.Interfaces;
using APOS.Core.Entities;

namespace APOS.Infrastructure.Services
{
    /// <summary>
    /// Handles processing of payment records.  This implementation simply saves the payment
    /// entity to the database.  Integration with external payment gateways should be added
    /// in a separate layer or via an adapter pattern.
    /// </summary>
    public class PaymentService : IPaymentService
    {
        private readonly ApplicationDbContext _context;
        public PaymentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Payment> ProcessPaymentAsync(Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return payment;
        }
    }
}