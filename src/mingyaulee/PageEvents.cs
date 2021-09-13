using Microsoft.JSInterop;

namespace mingyaulee
{
    public class PageEvents
    {
        private readonly IJSInProcessRuntime jSRuntime;

        public static PageEvents Instance { get; set; }

        public PageEvents(IJSRuntime jSRuntime)
        {
            this.jSRuntime = (IJSInProcessRuntime)jSRuntime;
        }

        public static void OnComponentRender() => Instance.jSRuntime.InvokeVoid("initializeIntersectionOberver");
    }
}
