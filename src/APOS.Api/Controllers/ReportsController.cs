using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using APOS.Application.Interfaces;
using APOS.Core.Entities;

namespace APOS.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;
        public ReportsController(IReportService reportService)
        {
            _reportService = reportService;
        }

        /// <summary>
        /// Returns all reports.
        /// </summary>
        [HttpGet]
        public async Task<IEnumerable<Report>> Get()
        {
            return await _reportService.GetReportsAsync();
        }

        /// <summary>
        /// Returns a report by id.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Report>> Get(int id)
        {
            try
            {
                return await _reportService.GetReportByIdAsync(id);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Generates a new report of the given type.  The report type should be provided as a
        /// query parameter (e.g. ?type=SalesSummary).
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Report>> Post([FromQuery] ReportType type)
        {
            var report = await _reportService.GenerateReportAsync(type);
            return CreatedAtAction(nameof(Get), new { id = report.Id }, report);
        }
    }
}