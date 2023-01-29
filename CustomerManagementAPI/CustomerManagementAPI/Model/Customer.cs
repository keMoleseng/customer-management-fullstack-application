// Model for the Customer
using System;

public class Customer
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string UserName => FirstName + LastName;
    public string EmailAddress { get; set; }
    public string DateOfBirth { get; set; }
    public int Age => (int)((DateTime.Now - Convert.ToDateTime(DateOfBirth)).TotalDays / 365.25);
    public DateTime DateCreated { get; set; }
    public DateTime DateEdited { get; set; }
    public bool IsDeleted { get; set; }
}