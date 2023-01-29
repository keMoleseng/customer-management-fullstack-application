using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CustomerManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerDbContext _context;

        public CustomerController(CustomerDbContext context)
        {
            _context = context;
        }

        // GET: api/Todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers.Where(x => x.IsDeleted == false).ToListAsync();
        }

        // GET: api/Customer/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(Guid id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customer/1
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(Guid id, Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            customer.DateEdited = DateTime.Now;
            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        
        public static bool IsValidEmail(string email)
        {
            var regex = new Regex(@"^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*" + "@" + @"((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$");
            return regex.IsMatch(email);
        }

        // POST: api/Customer
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            customer.DateCreated = DateTime.Now;
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
        }

        // DELETE: api/Customer/1
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(Guid id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            customer.IsDeleted = true;
            _context.Customers.Update(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        private bool CustomerExists(Guid id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }
    }

}
