# app-cocottes

## Getting started

1. Install cordova

```
npm install -g ionic cordova
```

2. Install all node modules

```
npm install
```

3. Create ```www``` and ```build``` folder using this command :

```
ionic serve
```

4. Install ```platforms``` and ```plugins```

```
ionic cordova prepare
```


## Use ionic

1. Add devices (do it once)

```
ionic cordova platform add android
ionic cordova platform add ios
ionic build android
ionic build ios
ionic run android
ionic run ios
```

2. Launch server

```
ionic serve --lab
```

