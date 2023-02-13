describe('VsCoq 2', () => {
    it('should be able to load VS Code', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] basic.v - Visual Studio Code')
    })

    it('should get error feedback from language server', async () => {
        const workbench = await browser.getWorkbench()
        const bottomBar = workbench.getBottomBar()
        const problemsView = await bottomBar.openProblemsView()
        await browser.waitUntil(async () => {
            const countBadge = await problemsView.getCountBadge()
            return (await countBadge.isExisting())
        }, { timeout: 30000 })
        expect(await (await problemsView.getCountBadge()).getText()).toBe('1')
    })
})