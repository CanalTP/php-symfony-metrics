# php-symfony-metrics

This project allows you to generate status and coverage of your Github projects.
The metrics are based upon Phpunit

## Pre-requisites



## Utilisation
```
cp projects.json.dist projects.json
```

Fill your organization name and add your projects according to template

```
COMPOSER_PATH=your/path/to/composer ./analyse.sh
```

This will generate results.json file containing the name, status and coverage of your bundles
To display graphical results, you just need to run a Php web server in the directory and access index

Example:

```
php -S localhost:1234
```
And navigate to http://localhost:1234