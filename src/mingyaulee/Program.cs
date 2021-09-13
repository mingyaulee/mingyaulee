using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

namespace mingyaulee
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
            builder.Services.AddSingleton<PageEvents>();

            var host = builder.Build();
            PageEvents.Instance = host.Services.GetRequiredService<PageEvents>();

            await host.RunAsync();
        }
    }
}
