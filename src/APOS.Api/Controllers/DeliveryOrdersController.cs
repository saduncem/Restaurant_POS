using Microsoft.AspNetCore.Mvc;
using APOS.Application.Interfaces;
using APOS.Core.Entities;
using System.Threading.Tasks;

namespace APOS.Api.Controllers
{
    /// <summary>
    /// Provides CRUD operations for delivery orders.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class DeliveryOrdersController : ControllerBase
    {
        private readonly IDeliveryService _deliveryService;

        public DeliveryOrdersController(IDeliveryService deliveryService)
        {
            _deliveryService = deliveryService;
        }

        /// <summary>
        /// Gets all delivery orders.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var orders = await _deliveryService.GetAllAsync();
            return Ok(orders);
        }

        /// <summary>
        /// Gets a specific delivery order by ID.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var order = await _deliveryService.GetByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        /// <summary>
        /// Creates a new delivery order.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DeliveryOrder order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var created = await _deliveryService.CreateAsync(order);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        /// <summary>
        /// Updates an existing delivery order.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] DeliveryOrder order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }
            await _deliveryService.UpdateAsync(order);
            return NoContent();
        }

        /// <summary>
        /// Deletes a delivery order by ID.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _deliveryService.DeleteAsync(id);
            return NoContent();
        }
    }
}