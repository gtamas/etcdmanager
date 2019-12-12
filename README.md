# ETCD Manager

[![etcd-manager](https://snapcraft.io//etcd-manager/badge.svg)](https://snapcraft.io/etcd-manager)

- [ETCD Manager](#etcd-manager)
  * [Features](#features)
    + [Available now](#available-now)
    + [Planned](#planned)
  * [Installation](#installation)
    + [End users..](#end-users)
    + [Contributors..](#contributors)
    + [Running the dev build](#running-the-dev-build)
  * [Usage and support](#usage-and-support)
  * [Upgrading](#upgrading)
  * [Bugs and feature requests](#bugs-and-feature-requests)


![Alt text](/screenshots/screen1.png?raw=true "ETCD Manager settings")

![Alt text](/screenshots/screen2.png?raw=true "ETCD Manager - keys & values")

![Alt text](/screenshots/screen3.png?raw=true "ETCD Manager - watchers")


This is a free, cross-platform [ETCD](http://www.etcd.io) v3 client and GUI. The goal of the project is twofold:

- Provide an efficient, modern GUI for desktop (Windows, Linux, Mac), mobile (iOS and Android) and web.
- Cover all ETCD functionality. Anything you can do with ***etcdctl***, you should be able to do with this tool. This should be useful for simple and power users alike.

Please note that this app currenlty **does not** support the ETCD V2 API! At the moment, it's for **V3** only.

## Features

### Available now

Currently, the following features are implemented:

- Manage (create, edit, delete) keys
- Manage users
- Manage roles
- Manage watchers. Supported event responders: app or desktop notification, app console logger.
- Assign or revoke roles
- ETCD Authentication
- Display basic info about ETCD cluster and its nodes.

### Planned

We plan to add tons of cool features in the future. The most important ones are listed below.:

**Features**

- Watchers: more responders, such as Email, Log to file, Log to REST API, Slack, Whatsapp, Google Chat, Viber intergarion.
- Cluster: maintenance features and more detailed cluster info
- Rapid config: export / import
- ETCD Dashboard: live dashboard with graphs.
- Report generation in different formats (HTML, PDF, XML etc)

**Future platforms**

- Android and iOS 
- Web (browser version)

A better organized overview of these plans will be available soon. Stay tuned :) 

## Installation

### End users..

The current stable (prod) version is 1.0. It's available for **Mac OS X (Mojave+)**, **MS Windows (7, 8, 10+)** and some major **Linux distros (Ubuntu 10.04+, Arch etc)**. The following are pre-built binaries and this is the recommended way to install. 

If you have relatively recent major Linux distro (Ubuntu, Redhat, Suse etc), or Ubuntu LTS or an up-to-date rolling release distro like Arch, everything should work fine. However, **very old** Linux versions might not work as expected. If you have difficulties installing the app, please report the problem in our issue tracker. 

Grab one now:

- [Windows](https://github.com/icellmobilsoft/etcdmanager/releases/download/v1.0.0/etcd-manager-1.0.0-win64.exe)
- [MacOS](https://github.com/icellmobilsoft/etcdmanager/releases/download/v1.0.0/etcd-manager-1.0.0-osx.dmg)
- [Linux](https://github.com/icellmobilsoft/etcdmanager/releases/download/v1.0.0/etcd-manager-1.0.0-linux.AppImage)

Other packages are available for download as well, please see the [releases](https://github.com/icellmobilsoft/etcdmanager/releases) page.

### We are on SnapCraft!

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-white.svg)](https://snapcraft.io/etcd-manager)

Install [snap](https://snapcraft.io/docs/installing-snap-on-ubuntu) and run the following command:
```
snap install etcd-manager
```

### Contributors..

You may install the dev version by cloning this repository.

```
git clone https://github.com/icellmobilsoft/etcdmanager.git
```

Or you may also install the NPM package, although this is not recommended, since the package might not contain the latest code.

```
yarn add etcd-manager
cd node_modules/etcd-manager
```

Please also check out the [contribution guide](./CONTRIBUTING.md) before writing any code.

### Running the dev build

Once you have the code, simply execute the following commands.:

```
yarn install
```

The next step is to compile the GRPC Node extension. This requires the usual build tools (gcc, make etc) to be installed. Make sure you have these, then run:

```
npm rebuild --target=ELECTRON_VERSION --runtime=electron --dist-url=https://atom.io/download/electron
```

... where ELECTRON_VERSION is the **exact** version number of the Electron framework the app uses. You can determnine this by running:

```
yarn list electron
```

Finally, start the dev server like this:

```
yarn electron:serve
```

This will start a dev build, and the app sholuld appear shortly.

## Usage and support

First of all, in order to work properly, ETCD Manager must be configured. 

You need to provide only two mandatory settings: the **host** and the **port** ETCD is running at. You'll find these on the **settings** screen, under the **ETCD tab**. 
If your ETCD host requires authentication, you will also need to provide a password / username pair, which you can do under the **auth tab**.
There are several additional configuration options, but those are all optional.

Detailed documentation is not available (yet), but you may want to activate **quick help**, which is available everywhere. Press **CTRL / CMD + H** to open the help pane. Here you'll find some basic info as well as all the **keyborad shortcuts**. This should be enough to get you started.

If you still need help, please feel free to contact us. Open an [issue](https://github.com/icellmobilsoft/etcdmanager/issues) (question / support request).

Once the documentation is ready, it'll be available in the wiki.

## Upgrading

If you've installed the app using the Windows or Mac installer or the Linux AppImage, you'll be notified automatically whenever a new release is available. Simply restart the app, and it'll check for updates. 

Otherwiese, you have to download and install the new version manually.

As for the dev version, you may update that by the usual means (Yarn or Git). In any case, please read our [changelog](./CHANGELOG.md) for an overview of the most recent changes.

## Bugs and feature requests

If you find a bug, please report it using our [issue tracker](https://github.com/icellmobilsoft/etcdmanager/issues).

This is also the place for requesting new features or asking questions. Please label your issue appropriately, use the "bug", "enchantment" and "question" labels, respectively.

