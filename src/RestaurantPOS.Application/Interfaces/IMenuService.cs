using System.Collections.Generic;
using System.Threading.Tasks;
using RestaurantPOS.Core.Entities;

namespace RestaurantPOS.Application.Interfaces
{
    /// <summary>
    /// Defines operations for reading and manipulating menu categories and products.
    /// </summary>
    public interface IMenuService
    {
        Task<IEnumerable<Category>> GetCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int id);
        Task<Category> CreateCategoryAsync(Category category);
        Task<IEnumerable<Product>> GetProductsByCategoryIdAsync(int categoryId);
        Task<Product> GetProductByIdAsync(int id);
        Task<Product> CreateProductAsync(Product product);
    }
}