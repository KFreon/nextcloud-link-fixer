import { App, PluginSettingTab, Setting } from 'obsidian';
import NextcloudLinkFixer from 'main';

export class NextcloudLinkFixerSettingTab extends PluginSettingTab {
	plugin: NextcloudLinkFixer;

	constructor(app: App, plugin: NextcloudLinkFixer) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Enable autofix on file open')
			.setDesc('Automatically fixes the links when opening file')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.autofixOnFileOpen)
				.onChange(async (value) => {
					this.plugin.settings.autofixOnFileOpen = value;
					await this.plugin.saveSettings();
				})
			);
	}
}
