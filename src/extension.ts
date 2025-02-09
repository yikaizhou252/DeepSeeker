import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
	let webview = vscode.commands.registerCommand('deepseeker.helloWorld', () => {
		let panel = vscode.window.createWebviewPanel('webview', 'React window', vscode.ViewColumn.One, {
			enableScripts: true,
		})

		const scriptSrc = panel.webview.asWebviewUri(
			vscode.Uri.joinPath(context.extensionUri, 'webview', 'dist', 'assets', 'index.js')
		)

		const cssSrc = panel.webview.asWebviewUri(
			vscode.Uri.joinPath(context.extensionUri, 'webview', 'dist', 'assets', 'main.css')
		)

		panel.webview.html =
			/*html*/
			`<!DOCTYPE html>
        <html lang="en">
        <head>
            <link rel="stylesheet" href="${cssSrc}" />
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <script src="${scriptSrc}"></script>
          </body>
        </html>
        `
	})

	context.subscriptions.push(webview)
}

export function deactivate() {}
