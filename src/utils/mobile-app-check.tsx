export const isMobileWeb = () => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';

    // Detect if running in Flutter WebView (by checking for "Flutter" in userAgent)
    const isFlutterApp = /Flutter/.test(userAgent);

    // Detect WebViews (in-app browsers)
    const isInWebView = (window as any).webkit?.messageHandlers || /(wv|.0.0.0)/.test(userAgent);

    // If it's Flutter WebView or any other in-app WebView, return false
    if (isFlutterApp || isInWebView) {
        return false;
    }

    // Check for Android mobile browser
    if (/android/i.test(userAgent) && !isInWebView) {
        return true; // True for Android mobile browser
    }

    // Check for iOS mobile browser (Safari, Chrome, etc.)
    if (/iPhone|iPad|iPod/.test(userAgent) && !(window as any).MSStream) {
        return true; // True for iOS mobile browser
    }

    // Fallback for desktop browsers
    return true;
};