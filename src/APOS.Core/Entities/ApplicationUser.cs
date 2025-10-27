using Microsoft.AspNetCore.Identity;

namespace APOS.Core.Entities
{
    /// <summary>
    /// Represents an application user for authentication and authorisation.  Inherits from
    /// IdentityUser with an integer key.  Additional properties (e.g. FirstName, LastName) can
    /// be added here as needed.
    /// </summary>
    public class ApplicationUser : IdentityUser<int>
    {
    }
}