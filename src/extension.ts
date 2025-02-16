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
            <div id="root" style="
            width: -webkit-fill-available;
        "></div>
            <script type="module" src="${scriptSrc}"></script>
          </body>
        </html>
        `

		const extractThinkingProcess = (text: string) => {
			const match = text.match(/<think>(.*?)<\/think>(.*)/s)
			if (match) {
				const thinkingProcess = match[1].trim() // Text inside <think> </think>
				const assistantResponse = match[2].trim() // Text after </think>, including emojis
				return { thinkingProcess, assistantResponse }
			}
			return { thinkingProcess: '', assistantResponse: '' }
		}

		panel.webview.onDidReceiveMessage(async (message: any) => {
			console.log('message received: ', message)
			const { messages, command } = message

			if (command === 'sendMessage') {
				let response = ''
				let thinkContent = '' // Store the <think> part separately
				let captureThoughts = false
				let captureModelResponse = false

				try {
					const streamResponse = await ollama.chat({
						model: 'deepseek-r1:1.5b',
						messages,
						stream: true,
					})

					// const justResponse = await ollama.chat({
					// 	model: 'deepseek-r1:1.5b',
					// 	messages,
					// 	stream: false,
					// })

					// console.log('great response: ', justResponse.message.content)

					// const { thinkingProcess, assistantResponse } = extractThinkingProcess(
					// 	justResponse.message.content
					// )
					// console.log('💭 Full Thinking Log: ', thinkingProcess) // Log full thinking content when chat ends
					// console.log('💭 Response: ', assistantResponse) // Log full thinking content when chat ends

					// panel.webview.postMessage({
					// 	command: 'chatResponse',
					// 	text: assistantResponse,
					// })

					// console.log('message ended: ', response)
					for await (const chunk of streamResponse) {
						let chunkText = chunk.message.content
						// Extract <think> content and store it separately
						if (chunkText.includes('<think>')) {
							console.log('💭 Started thinking: ')
							captureThoughts = true
						} else if (chunkText.includes('</think>')) {
							console.log('💭 Stopped thinking: ')
							captureThoughts = false
							captureModelResponse = true
						} else {
							if (captureThoughts) {
								thinkContent += chunkText
							} else if (captureModelResponse) {
								response += chunkText
								panel.webview.postMessage({
									command: 'chatResponse',
									text: response,
								})
							}
						}
					}

					console.log('message ended: ', response)
					console.log('💭 Full Thinking Log: ', thinkContent) // Log full thinking content when chat ends

					// end of chat
					panel.webview.postMessage({
						command: 'chatEnd',
						text: response,
					})
				} catch (error) {
					panel.webview.postMessage({
						command: 'chatResponse',
						text: 'Error: ' + error,
					})
				}
				// vscode.window.showInformationMessage(message.text)
			}
		})
	})

	context.subscriptions.push(webview)
}

export function deactivate() {}
