# ETCD Manager

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

Currently only the **beta** desktop version is available.

**Attention!**
This is still a work in progress, it's **NOT** production ready yet! Use it at your own risk!

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

**Platforms**

- Android and iOS 
- Web (browser version)

A better organized overview of these plans will be available soon. Stay tuned :) 

## Installation

### End users..

We have pre-built binaries for OSX (Yosemite+), Windows (7+) as well as the major Linux distributions (Debian, Ubuntu etc). Download one of these packages from the [releases](https://github.com/icellmobilsoft/etcdmanager/releases) page.

### Contributors..

You may install the dev version by cloning this repository.

```
git clone https://github.com/icellmobilsoft/etcdmanager.git
```

Or you may also install the Yarn / NPM package, although this is not recommended, since the package might not contain the latest code.

```
yarn add etcd-manager

or

npm install etcd-manager
```

Please also check out the [contribution guide](./CONTRIBUTING.md) before writing any code.

### Running the dev build

Once you have the code, simply execute the following commands. 

Run this only if you've installed the package via Yarn / NPM:

```
cd node_modules/etcd-manager
```

And then..

```
yarn install
yarn electron:serve
```

or

```
npm install
npm run electron:serve
```

## Usage and support

First of all, in order to work properly, ETCD Manager must be configured. 

You need to provide only two mandatory settings: the **host** and the **port** ETCD is running at. You'll find these on the **settings** screen, under the **ETCD tab**. 
If your ETCD host requires authentication, you'll also need to provide a password / username pair, which you can do under the **auth tab**.
There are several additional configuration options, but these are all optional.

Detailed documentation is not available (yet), but you may want to activate **quick help**, which is available everywhere. Press **CTRL / CMD + H** to open the help pane. Here you'll find some basic info as well as all the **keyborad shortcuts**. This should be enough to get you started.

If you still need help, please feel free to contact us. Open an [issue](https://github.com/icellmobilsoft/etcdmanager/issues) using the **help** label.

Once the documentation is ready, it'll be available in the wiki.

## Upgrading

We don't have automatic updates yet. If you've already installed this product and would like to upgrade, you have to download and install the the new release manually. Please see our [releases](https://github.com/icellmobilsoft/etcdmanager/releases) page. 

As for the dev version, you may update that by the usual means (Yarn or Git). In any case, please read our [changelog](./CHANGELOG.md) for an overview of the most recent changes.

## Bugs and feature requests

This is the beta version, so probably there are bugs. If you find one of them, please report it using our [issue tracker](https://github.com/icellmobilsoft/etcdmanager/issues).

This is also the place to request new features or ask questions. Please label your your issue appropriately, use the "bug", "enchantment" and "question" labels, respectively.

