using System.Threading.Tasks;
using APOS.Core.Entities;

namespace APOS.Application.Interfaces
{
    /// <summary>
    /// Defines operations for handling payments.  This is a simplified interface; additional
    /// methods can be added for refunds, partial payments and tips.
    /// </summary>
    public interface IPaymentService
    {
        Task<Payment> ProcessPaymentAsync(Payment payment);
    }
}