using Microsoft.AspNetCore.SignalR;

namespace RestaurantPOS.Api.Hubs
{
    /// <summary>
    /// SignalR hub for broadcasting table status updates.  Clients can subscribe to this hub
    /// to receive real‑time notifications when tables change state (e.g. occupied, split, hold).
    /// </summary>
    public class TableHub : Hub
    {
    }
}