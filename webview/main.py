import webview

if __name__ == "__main__":
    webview.create_window(
        "hello",
        url="http://localhost:5000",
        resizable=False,
        fullscreen=True,
        frameless=True,
        on_top=True,
        background_color="#000000",
        x=0,
        y=0
        # maximized=True,
    )
    webview.start()
