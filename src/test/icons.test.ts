import {describe, expect, test} from "vitest";
import {mount} from "@vue/test-utils";

import GitHubLink from "../app/components/icons/GitHubLink.vue";
import RefreshIcon from "../app/components/icons/RefreshIcon.vue";
import SpeakerIcon from "../app/components/icons/SpeakerIcon.vue";
import SpeakerOffIcon from "../app/components/icons/SpeakerOffIcon.vue";

describe('mount icons', () => {
    test('mount GitHubLink component', async () => {
        expect(GitHubLink).toBeTruthy();

        const wrapper = mount(GitHubLink);

        expect(wrapper.exists());
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('mount RefreshIcon component', async () => {
        expect(RefreshIcon).toBeTruthy();

        const wrapper = mount(RefreshIcon);

        expect(wrapper.exists());
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('mount SpeakerIcon component', async () => {
        expect(SpeakerIcon).toBeTruthy();

        const wrapper = mount(SpeakerIcon);

        expect(wrapper.exists());
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('mount SpeakerOffIcon component', async () => {
        expect(SpeakerOffIcon).toBeTruthy();

        const wrapper = mount(SpeakerOffIcon);

        expect(wrapper.exists());
        expect(wrapper.html()).toMatchSnapshot();
    });
})
