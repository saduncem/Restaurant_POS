using Microsoft.AspNetCore.SignalR;

namespace RestaurantPOS.Api.Hubs
{
    /// <summary>
    /// SignalR hub for broadcasting order updates.  Clients can use this hub to receive
    /// notifications when orders are created, updated or closed.  Further methods can be
    /// defined to allow clients to send messages back to the server.
    /// </summary>
    public class OrderHub : Hub
    {
    }
}