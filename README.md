## Dev Environment

	OS Windows 10
	JDK 17.0.8
	Android Build Tools 33.0.2

## Build

> Official reference: https://ionicframework.com/docs/cli/commands/capacitor-build

```shell 
ionic cap build android --prod
```

```shell
cd android
gradlew bundleRelease
```

## Deploy on device

```shell
ionic capacitor run android -l
```