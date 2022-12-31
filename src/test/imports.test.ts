import {describe, expect, test} from "vitest";

describe('import vue components', () => {
    test('normal imports as expected', async () => {
        const cmp = await import('../components/icons/GitHubLink.vue')
        expect(cmp).toBeDefined()
    })

    test('template string imports as expected', async () => {
        // eslint-disable-next-line @typescript-eslint/quotes
        const cmp = await import(`../components/icons/GitHubLink.vue`)
        expect(cmp).toBeDefined()
    })

    test('dynamic imports as expected', async () => {
        const name = 'GitHubLink'
        const cmp = await import(`../components/icons/${name}.vue`)
        expect(cmp).toBeDefined()
    })
})
