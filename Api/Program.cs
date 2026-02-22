var builder = WebApplication.CreateBuilder(args);

// 1. Enable CORS for the frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy => 
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddOpenApi();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");

// 2. Original Weather Endpoint
var summaries = new[] { "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching" };
app.MapGet("/weatherforecast", () =>
{
    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
    (
        DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
        Random.Shared.Next(-20, 55),
        summaries[Random.Shared.Next(summaries.Length)]
    )).ToArray();
});

// 3. NEW Mock Data Endpoint (Zenvixor Team)
app.MapGet("/api/team", () =>
{
    var teamMembers = new[]
    {
        new { Id = 1, Name = "Deera", Role = "Co-Founder & Lead Developer" },
        new { Id = 2, Name = "Alex", Role = "UI/UX Designer" },
        new { Id = 3, Name = "Sam", Role = "Project Manager" },
        new { Id = 4, Name = "Jordan", Role = "DevOps Engineer" }
    };
    
    return teamMembers;
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}