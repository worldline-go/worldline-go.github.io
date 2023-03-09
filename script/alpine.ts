document.addEventListener('alpine:init', () => {
    (window as any).Alpine.store('selection', {
        active: "repos",
        select(v: string) {
            this.active = v;
        }
    })
});
