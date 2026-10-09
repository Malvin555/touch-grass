package com.malfyra.tochgrass;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.malfyra.tochgrass.nativeui.NativeTheme;
import com.malfyra.tochgrass.nativeui.WebViewSetup;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        NativeTheme.initialize(this);
        WebViewSetup.configure(this);
    }
}
