using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using RestaurantPOS.Application.Interfaces;
using RestaurantPOS.Core.Entities;
using System.Linq;

namespace RestaurantPOS.Infrastructure.Services
{
    /// <summary>
    /// Provides basic report generation.  In this initial version it simply creates a report entry
    /// with no aggregated data.  Future iterations should include logic to aggregate data from
    /// orders, payments and other entities, and output the report in various formats.
    /// </summary>
    public class ReportService : IReportService
    {
        private readonly ApplicationDbContext _context;

        public ReportService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Report> GenerateReportAsync(ReportType type)
        {
            var report = new Report
            {
                Type = type,
                CreatedAt = DateTime.UtcNow,
                Data = null // placeholder for serialized report data
            };
            _context.Reports.Add(report);
            await _context.SaveChangesAsync();
            return report;
        }

        public async Task<IEnumerable<Report>> GetReportsAsync()
        {
            // In-memory conversion to list is fine here because the underlying provider is EF Core.
            return await Task.FromResult(_context.Reports.AsNoTracking().ToList());
        }

        public async Task<Report> GetReportByIdAsync(int id)
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null)
            {
                throw new KeyNotFoundException($"Report with id {id} not found.");
            }
            return report;
        }
    }
}