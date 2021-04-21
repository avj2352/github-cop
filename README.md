# Github Actions

## What are Github Actions

Actions are a relatively new feature to Github that allow you to set up CI/CD workflows using a configuration file right in your Github repo.

- Released early 2019.
- Out of shelf - Github ^3.x
- Alternative to Jenkins, Travis, Cicle CI
- Runs Asynchronous Tasks by default
- Perfect for automating your own automation scripts
- Good documentation & (growing) Community support



## _Don't we already have Jenkins ?_ 🤔

| Jenkins                                                      | Github Actions                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 3rd party, Open source                                       | Out of shelf provision by Github                             |
| Needs its own server, setup independently                    | Provisioned by Github, Free for both Public & Private repositories. Currently available only on 3.x and above. |
| Tasks or Jobs, are synchronous, takes time to deploy a product to market | Asynchronous jobs by default, can run multiple actions at once. Can also run synchronously with the **needs** attribute |
| Based on accounts & triggers                                 | Provides actions to every Github events & supports multiple languages & environments (provided by Github) |
| Needs Docker for environment compatibility                   | Compatible with any environment                              |
| Plugins for Caching                                          | Write your own caching script                                |
| Your workflows cannot be shared !                            | Workflows & Actions can be shared & used across Github       |

> NOTE: The aim here is to show how Github Action, can still be used in everyday workflow and how easy it is to set it up

**You can use Github to solve your everyday work !**

### Case 1: Use Github to manage your testing  🧪

```yaml
# Simple workflow to demonstrate unit testing
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Node JS Unit Testing

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm test
```

### Case 2: Use Github to manage your Builds 🏗️

```yaml
# This work flow runs unit testing and on success, creates a build
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Node JS Unit Testing

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm test
    
  build:
  	needs: [test]
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm run build
```

### Case 3: Using Secrets 🤐

And this is a feature that I personally ❤️  about Github Actions !!

```yaml
# Create a default.json environment file under config/ folder
# Add Environment Variables from Repository Secrets
name: Create env file
on: 
  push:
    branches:
      - master
   
jobs:
  run:
    name: Create env file
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v2

      - name: Create default.json file
        run: |
          echo -n "" > config/default.json
          cat <<EOT >> config/default.json
          {
            "server": {
              "secret": ${{secrets.A_SECRET}}
            }
          }
          EOT
      - name: Commit changes
        uses: EndBug/add-and-commit@v7
        with:
          author_name: Pramod AJ
          author_email: avj2352@gmail.com
          message: 'Adding Environment file'
          add: '*.json'
```

## Actions can listen to ANY GIT EVENTS !! 👂🏻

Github Actions can be triggered for any particular Event - Pull requests, Push, Merge, Other build outputs..etc.,

```yaml
# Remove default.json environment file under backend/config/ folder
# Remove Environment files - default.json & development.json
name: Remove env file
on: 
  push:
    branches:
      - master
      - main
   
jobs:
  run:
    name: Remove env file
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v2

      - name: Remove files
        run: |
          rm -rf config/default.json
          rm -rf config/development.json
      - name: Commit changes
        uses: EndBug/add-and-commit@v7
        with:
          author_name: Pramod AJ
          author_email: avj2352@gmail.com
          message: 'Removing Environment files'
          add: '*.json'
```

This particular Workflow is independent of Technology can be used for any of the below scenarios

- TOKEN Authentication when deploying to Cloud (eg.. AWS)
- Node JS environments
- Java Properties / Yaml (Server Configuration)

You can also configure environments and use different versions of Secrets which make it all the more powerful !!

## Conclusion

Github Actions are really Cool ! But we need to wait until they arrive in Topdanmark Github repo 😬


## Important Links
- [Github Actions versus Jenkins](https://blog.bitsrc.io/github-actions-or-jenkins-making-the-right-choice-for-you-9ac774684c8)
- [Github Node JS Actions](https://docs.github.com/en/actions/guides/building-and-testing-nodejs)
- [Setup Node JS CI/CD pipeline using Github Actions](https://blog.bitsrc.io/https-medium-com-adhasmana-how-to-do-ci-and-cd-of-node-js-application-using-github-actions-860007bebae6)
- [Github Actions Essential Training](https://www.linkedin.com/learning/learning-github-actions-2/additional-resources-for-more-github-actions-2)
- [Github Actions - Freecodecamp](https://www.freecodecamp.org/news/what-are-github-actions-and-how-can-you-automate-tests-and-slack-notifications/)
- [Github Marketplace - Lint Action](https://github.com/marketplace/actions/lint-action)


