<p align="center">
  <a href="">
    <img width="150px" style="border-radius:20px;" src="android/app/src/main/res/mipmap-hdpi/ic_launcher.png">
  </a>
  <h1 align="center">EasyClub</h1>
</p>


<p align="center">
<a href="">
    <img width="160px" style="margin: 10px 10px;" src="https://proximity-mobile.firebaseapp.com/images/download/download-app-store.png">
</a>
<a href="">
    <img width="160px" style="margin: 10px 10px;" src="https://proximity-mobile.firebaseapp.com/images/download/download-google-play.png">
</a>
</p>


# Project building guide



1. Instalar Xcode vía App Store
   - Instalar XCode con la siguiente linea de comando
     Run ```xcode-select --install``` in terminal
   - Instalar Cocoapods
     Run ```sudo gem install cocoapods``` in terminal
2. Instalar Android Studio
   https://developer.android.com/studio
   - Crear un "virtual device"
    Status bar->Toolds/Avd Manager/Create Virtual Device...
   - Instalar el SDK/Tools
    Status bar->Toolds/SDK Manager
    1) SDK Platforms
     Seleccioná Android 8.0~Android S Preview and Click "Ok"
    2) SDK Tools
     Seleccioná e instalá las siguientes herramientas:
     - Android SDK Build-Tools
     - NDK
     - Android SDK Command-line Tools
     - Android Emulator
     - Android SDK Platform-Tools
     - Google Play services
     - Intel x86 Emulator Accelerator (HAXM installer)


3. Instalar Homebrew:
   ```
   ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
   ```

4. Instalar Android dev tools usando Homebrew
  ```
   brew install --cask android-sdk
   brew install --cask homebrew/cask-versions/adoptopenjdk8
   brew doctor
   brew install ant
   brew install maven
   brew install gradle
   brew install android-sdk
   brew install android-ndk
   ```

5. Instalar React Native CLI

   Reference: https://reactnative.dev/docs/environment-setup

   ```brew install node```

   ```brew install watchman```

   ```npx react-native init Example```


6. Abrir el proyecto en visual studio code
   - Para correr en iOS, seleccioná el emulador en Xcode y hacé click en el botón "Run"
    También se puede compilar usando la siguiente linea de comando:```react-native run-ios```
   - Para correr en Android, primero se debe abrir el emilador (virtual device)
    y luego usar la siguiente linea ```react-native run-android``` en la terminal.




Importante!
- Verificá en tu pc la carpeta de instalación del SDK y cambiar la ruta en el archivo android/local.properties:


```sdk.dir = /Users/.../Library/Android/sdk```





## Support

## Bugs



