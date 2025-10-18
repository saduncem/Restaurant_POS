using System.Threading.Tasks;
using RestaurantPOS.Core.Entities;

namespace RestaurantPOS.Application.Interfaces
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