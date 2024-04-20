# Nextcloud Link Fixer  
Opening Markdown files in Nextcloud Text breaks the Wiki-links that Obsidian uses.  
i.e. `[[my link]]` becomes `\[\[my link\]\]` even though it's kinda rendered ok.  

This plugin can automatically fix them on file open (off by default, can be enabled in Settings).  
There is also a command `fix-wiki-links`.  