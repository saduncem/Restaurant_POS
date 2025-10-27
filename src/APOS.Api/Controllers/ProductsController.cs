using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using APOS.Application.Interfaces;
using APOS.Core.Entities;

namespace APOS.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IMenuService _menuService;
        public ProductsController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        /// <summary>
        /// Returns a list of products for a given category.
        /// </summary>
        [HttpGet("category/{categoryId}")]
        public async Task<IEnumerable<Product>> GetByCategory(int categoryId)
        {
            return await _menuService.GetProductsByCategoryIdAsync(categoryId);
        }

        /// <summary>
        /// Returns a single product by id.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            try
            {
                return await _menuService.GetProductByIdAsync(id);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Creates a new product.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Product>> Post([FromBody] Product product)
        {
            var created = await _menuService.CreateProductAsync(product);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }
    }
}