import { NextcloudLinkFixerSettingTab } from 'NextcloudLinkFixerSettingTab';
import { Editor, MarkdownView, Plugin, TFile, Vault } from 'obsidian';

interface NextcloudLinkFixerSettings {
	autofixOnFileOpen: boolean;
}

const DEFAULT_SETTINGS: NextcloudLinkFixerSettings = {
	autofixOnFileOpen: false
}

export default class NextcloudLinkFixer extends Plugin {
	settings: NextcloudLinkFixerSettings

	async onload() {
		await this.loadSettings();

		this.registerEvent(this.app.workspace.on('file-open', (file) => {
			return this.fixObsidianLinksThatNextcloudBreaks(this.app.vault, file, true)
		}))

		this.addCommand({
			id: 'fix-obsidian-links',
			name: 'Fix links broken by Nextcloud',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				return this.fixObsidianLinksThatNextcloudBreaks(this.app.vault, view.file, false)
			}
		})

		this.addSettingTab(new NextcloudLinkFixerSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async fixObsidianLinksThatNextcloudBreaks(vault: Vault, file: TFile | null, isFileOpening: boolean): Promise<string> {
		if (!file) return '';

		const isFixingAllowed = !isFileOpening || this.settings.autofixOnFileOpen;
		const isMarkdown = file.extension.toLowerCase() === 'md';

		if (!isFixingAllowed || !isMarkdown) return '';

		// Replace links properly
		return vault.process(file, (data) => {
			return data.replaceAll("\\[\\[", "[[").replaceAll('\\]\\]', "]]");
		})
	}
}

