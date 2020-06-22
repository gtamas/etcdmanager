# ETCD Manager

[![etcd-manager](https://snapcraft.io//etcd-manager/badge.svg)](https://snapcraft.io/etcd-manager)

- [ETCD Manager](#etcd-manager)
  * [Features](#features)
    + [Coming: v1.3](#coming-up-v13)
    + [Available now](#available-now-v12)
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
- Cover all ETCD functionality. Anything you can do with ***etcdctl***, you should be able to do with this tool as well. This app should be useful for simple and power users alike.

Please note that currently ETCD V2 API **is not** supported! At the moment, we support **V3** only.

## Features

### Available now (v1.2)

Currently, the following features are implemented:

- Key management: 
    - Manage (browse, create, edit, delete) keys.
    - Create keys with TTL
    - Key browser has multiple views: tree or list with paging.
    - Key list live updates: refresh list when the value of any key changes. 
    - Manage revisions: list revisions of any key and revert to any previous value.
- Settings and config: 
    - Able to use multiple config profiles, allowing you to manage any number of ETCD clusters with dedicated settings.
    - Import / export settings: save settings to or load from file.
- Authentication and security:
    - Basic authentication: (username / password)
    - HTTPS client certificate authentication
    - Supports both HTTP and HTTPS (secure) connections
    - Supports no auth (ETCD with authentication disabled)
- Other functions:
    - Display basic info about ETCD cluster and its nodes, perform health checks.
    - Manage leases: list and revoke leases, view details.
    - Manage users: create, update or delete users.
    - Manage roles and permissions: create, update delete roles, assign / revoke permissions.
    - Manage watchers. Supported event responders: app or desktop notification, app console logger.
    - Intranet mode: works without internet connection.

### Coming up (v1.3)

This release is mainly for contributors. There will be no new features in this one. Instead, we gonna focus solely on making it easier to understand how the code works and how to get started with contributing. In order to achieve this, we'll refactor many parts of the code and we'll also try to provide better documentation for contributors and a project dashboard. 

As for refactoring, some of the things we gonna change are:

- Better typing (we gonna add missing types, no "any", "unknown" and crap like that)
- Better tests (we are planning to replace Spectron with Cypress)
- Smaller, more focused, easy to maintain components. We are going to to use the Vue 3 Composition API here.
- Better folder structure for source files.
- Proper Dependency Injection support (for services, filters etc).
- Missing something? Please open a [feature request](https://github.com/icellmobilsoft/etcdmanager/issues)!

### Planned

We plan to add tons of cool features in the future. The most important ones are listed below.:

**Features**

- Watchers: more responders, such as Email, Log to file, Log to REST API as well as app integrations like Slack, Google Chat, Viber  etc.
- Cluster: maintenance / admin features and more detailed cluster info
- ETCD Dashboard: live dashboard with graphs.
- Complex queries using transactions.
- Diff tool: compare the revisions of any two keys (much like Total Commander). 
- Report generation in different formats (HTML, PDF, XML etc)
- Better in-app console
- ... and much more!

**Future platforms**

- Android and iOS 
- Web (browser version)

A better organized overview of these plans will be available soon. Stay tuned :) 

## Installation

### End users..

The current stable (prod) version is 1.2. It's available for **Mac OS X (10.15.5 Catalina+)**, **MS Windows (7, 8, 10+)** and some major **Linux distros (Ubuntu 10.04+, Arch etc)**. The following are pre-built binaries and this is the recommended way to install. 

If you are using a more or less recent major Linux distro (Ubuntu, Redhat, Suse etc), or Ubuntu LTS or some up-to-date rolling release distro like Arch, everything should work fine. Most older Linux systems should be supported as well. However, **very old** Linux versions might not work as expected. If you have difficulties installing the app, please report the problem using our issue tracker. 

Grab one now:

- [Windows](https://github.com/icellmobilsoft/etcdmanager/releases/download/v1.2.0/etcd-manager-1.2.0-win64.exe)
- [MacOS](https://github.com/icellmobilsoft/etcdmanager/releases/download/v1.2.0/etcd-manager-1.2.0-osx.dmg)
- [Linux](https://github.com/icellmobilsoft/etcdmanager/releases/download/v1.2.0/etcd-manager-1.2.0-linux.AppImage)

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
git clone https://github.com/i-Cell-Mobilsoft-Open-Source/etcdmanager.git
```

Or you may also install the NPM package (although this is ***not recommended***, since the package might not contain the latest code).

First of all, you must install Yarn. Please see [this page](https://classic.yarnpkg.com/en/docs/install) for details.


```
yarn add etcd-manager
cd node_modules/etcd-manager
```

Please also check out the [contribution guide](./CONTRIBUTING.md) before writing any code.

### Running the dev build

Once you have the code, simply execute the following commands:

```
yarn install
```

The next step is to compile the GRPC Node extension. This requires the usual build tools (gcc, make etc) to be installed. Make sure you have these, then run:

```
npm rebuild --target=ELECTRON_VERSION --runtime=electron --dist-url=https://atom.io/download/electron
```

... where ELECTRON_VERSION is the **exact** version number of the Electron framework the app uses. You can determine this by running:

```
yarn list electron
```

Finally, start the dev server in the following way:

```
yarn electron:serve
```

This will start a dev build and the app should appear shortly.

## Usage and support

First of all, in order to work properly, ETCD Manager must be configured. 

You need to provide only two mandatory settings: the **host** and the **port** ETCD is running at. You'll find these on the **settings** screen, under the **ETCD tab**. 
If your ETCD host requires authentication, you will also need to provide a password / username pair or certificates / keys, which you can do under the **auth tab**. 
There are several additional configuration options, but those are all optional.

Detailed documentation is not available (yet), but you may want to activate **quick help**, which is available everywhere. Press **CTRL / CMD + H** to open the help pane. Here you'll find some basic info as well as all the **keyboard shortcuts**. This should be enough to get you started.

If you still need help, please feel free to contact us. Create a [issue](https://github.com/icellmobilsoft/etcdmanager/issues) (question / support request).

Once the documentation is ready, we'll upload it to the website.

## Upgrading

If you've installed the app using the Windows or Mac installer or the Linux AppImage, you'll be notified automatically whenever a new release is available. Simply restart the app, and it'll check for updates. 

Otherwise, you have to download and install the new version manually.

As for the dev version, you may update that by the usual means (Yarn or Git). In any case, please read our [changelog](./CHANGELOG.md) for an overview of the most recent changes.

## Bugs and feature requests

If you find a bug, please report it using our [issue tracker](https://github.com/icellmobilsoft/etcdmanager/issues).

This is also the place for requesting new features or asking questions. Please label your issue appropriately, use the "bug", "enchantment" and "question" labels, respectively.

