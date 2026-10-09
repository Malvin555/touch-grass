
package com.malfyra.tochgrass.nativeui;

import android.app.Activity;
import android.graphics.Color;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public final class WebViewSetup {

    private WebViewSetup() {}

    public static void configure(Activity activity) {
        WebView webView =
            ((BridgeActivity) activity).getBridge().getWebView();

        webView.setBackgroundColor(Color.TRANSPARENT);
        webView.setBackgroundResource(android.R.color.transparent);
    }
}
