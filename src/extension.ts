import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let webview = vscode.commands.registerCommand('deepseeker.helloWorld', () => {

        let panel = vscode.window.createWebviewPanel("webview", "React window", vscode.ViewColumn.One, {
            enableScripts: true
        })

        

        const scriptSrc = panel.webview.asWebviewUri(
          vscode.Uri.joinPath(context.extensionUri, 'webview', 'dist', 'assets', 'index.js')
        );

        // const cssSrc = panel.webview.asWebviewUri(
        //   vscode.Uri.joinPath(context.extensionUri, 'webview', 'dist', 'assets', 'index-kQJbKSsj.css')
        // );


        panel.webview.html = `<!DOCTYPE html>
        <html lang="en">
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <script src="${scriptSrc}"></script>
          </body>
        </html>
        `

        // const indexHtmlPath = panel.webview.asWebviewUri(
        //   vscode.Uri.joinPath(context.extensionUri, 'webview', 'dist', 'index.html')
        // );
        
        // panel.webview.html = `<iframe src="${indexHtmlPath}" style="width:100%; height:100vh; border:none;"></iframe>`;
    });

    context.subscriptions.push(webview);
}

export function deactivate() { }