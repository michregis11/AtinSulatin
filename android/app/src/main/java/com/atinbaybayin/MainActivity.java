package com.atinbaybayin;

import android.os.Bundle;
import com.facebook.react.ReactFragmentActivity;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends ReactFragmentActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
     
     @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
    }

     @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            hideNavigationBar();
        }
    }

    private void hideNavigationBar() {
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);

    }

    @Override
    protected String getMainComponentName() {
        return "AtinBaybayin";
    }
}
