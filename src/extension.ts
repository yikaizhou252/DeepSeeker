import * as vscode from 'vscode'
import ollama from 'ollama'

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

    console.log('loaded all styles and scripts')

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

        panel.webview.onDidReceiveMessage(async (message: any) => {
          console.log('message received: ', message)
          if (message.command === 'sendMessage') {
            const userPrompt = message.text
            let response = ''
  
            try {
              const streamResponse = await ollama.chat({
                model: 'deepseek-r1:1.5b',
                messages: [
                  {
                    role: 'user',
                    content: userPrompt,
                  },
                ],
                stream: true,
              })
  
              for await (const chunk of streamResponse) {
                response += chunk.message.content
                panel.webview.postMessage({
                  command: 'chatResponse',
                  text: response,
                })
              }
  
            } catch (error) {
              panel.webview.postMessage({
                command: 'chatResponse',
                text: 'Error: ' + error,
              })
            }
  
            
            vscode.window.showInformationMessage(message.text)
          }
        })
	})

	context.subscriptions.push(webview)
}

export function deactivate() {}
