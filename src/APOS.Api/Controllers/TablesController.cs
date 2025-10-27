using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using APOS.Application.Interfaces;
using APOS.Core.Entities;

namespace APOS.Api.Controllers
{
    /// <summary>
    /// API controller exposing endpoints for accessing table information.  This controller uses
    /// dependency injection to obtain an ITableService implementation.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class TablesController : ControllerBase
    {
        private readonly ITableService _tableService;

        public TablesController(ITableService tableService)
        {
            _tableService = tableService;
        }

        /// <summary>
        /// Returns the list of all restaurant tables.
        /// </summary>
        [HttpGet]
        public async Task<IEnumerable<Table>> Get()
        {
            return await _tableService.GetTablesAsync();
        }

        /// <summary>
        /// Returns a single table by id.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Table>> Get(int id)
        {
            try
            {
                return await _tableService.GetTableByIdAsync(id);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Creates a new table.  In a real system this might be restricted to manager roles.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Table>> Post([FromBody] Table table)
        {
            var created = await _tableService.CreateTableAsync(table);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }
    }
}