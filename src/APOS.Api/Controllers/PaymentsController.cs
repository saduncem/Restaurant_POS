using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using APOS.Application.Interfaces;
using APOS.Core.Entities;

namespace APOS.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        /// <summary>
        /// Processes a payment.  In a full implementation this would call external payment gateways
        /// and handle different payment types.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Payment>> Post([FromBody] Payment payment)
        {
            var created = await _paymentService.ProcessPaymentAsync(payment);
            return CreatedAtAction(nameof(Post), new { id = created.Id }, created);
        }
    }
}