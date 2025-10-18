using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RestaurantPOS.Application.Interfaces;
using RestaurantPOS.Core.Entities;

namespace RestaurantPOS.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly IMenuService _menuService;
        public CategoriesController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        [HttpGet]
        public async Task<IEnumerable<Category>> Get()
        {
            return await _menuService.GetCategoriesAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> Get(int id)
        {
            try
            {
                return await _menuService.GetCategoryByIdAsync(id);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<Category>> Post([FromBody] Category category)
        {
            var created = await _menuService.CreateCategoryAsync(category);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }
    }
}