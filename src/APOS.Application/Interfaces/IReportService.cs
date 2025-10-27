using System.Collections.Generic;
using System.Threading.Tasks;
using APOS.Core.Entities;

namespace APOS.Application.Interfaces
{
    /// <summary>
    /// Defines operations for generating and retrieving reports.  The actual implementation
    /// can write data in various formats (PDF, Excel) and perform aggregations.
    /// </summary>
    public interface IReportService
    {
        Task<Report> GenerateReportAsync(ReportType type);
        Task<IEnumerable<Report>> GetReportsAsync();
        Task<Report> GetReportByIdAsync(int id);
    }
}