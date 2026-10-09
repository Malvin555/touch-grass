package com.malfyra.tochgrass.nativeui;

import android.app.Activity;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.webkit.JavascriptInterface;

import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.Bridge;

public final class NativeTheme {

    private static final int SUNLIGHT = Color.parseColor("#F4EDE4");
    private static final int DUSK = Color.parseColor("#17291F");

    private NativeTheme() {}

    public static void initialize(Activity activity) {
        apply(activity, SUNLIGHT);

        Bridge bridge = ((com.getcapacitor.BridgeActivity) activity).getBridge();

        bridge.getWebView().addJavascriptInterface(
            new ThemeBridge(activity),
            "TouchGrassNative"
        );
    }

    private static void apply(Activity activity, int color) {
        activity.runOnUiThread(() -> {
            activity.getWindow().setBackgroundDrawable(
                new ColorDrawable(color)
            );

            activity.getWindow().setStatusBarColor(color);
            activity.getWindow().setNavigationBarColor(color);

            WindowInsetsControllerCompat controller =
                WindowCompat.getInsetsController(
                    activity.getWindow(),
                    activity.getWindow().getDecorView()
                );

            boolean lightBackground = color == SUNLIGHT;
            controller.setAppearanceLightStatusBars(lightBackground);
            controller.setAppearanceLightNavigationBars(lightBackground);
        });
    }

    private static final class ThemeBridge {

        private final Activity activity;

        ThemeBridge(Activity activity) {
            this.activity = activity;
        }

        @JavascriptInterface
        public void setTheme(String theme) {
            int color = "dusk".equals(theme) ? DUSK : SUNLIGHT;
            apply(activity, color);
        }
    }
}
